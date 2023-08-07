import os
import sqlite3


class AttributeDict(dict):
    def __getattr__(self, attr):
        return self[attr]

    def __setattr__(self, attr, value):
        self[attr] = value


def exec_query(sql: str, file_path=":memory:", custom_functions: dict = None, separate_columns=False,
               placeholder_params: list = None) -> list[dict]:
    conn = sqlite3.connect(file_path)

    if custom_functions:
        for k, v in custom_functions.items():
            conn.create_function(k, -1, v)

    cursor = conn.cursor()

    # print("数据库打开成功")

    sql = sql.strip()

    if is_show_sql():
        print(sql)

    try:
        if placeholder_params:
            cursor.execute(sql, placeholder_params)
        else:
            cursor.execute(sql)

        columns = list(map(lambda x: x[0], cursor.description)) if cursor.description else []
        result = []

        if not separate_columns:
            for row in cursor:
                d = AttributeDict({})
                for i in range(len(columns)):
                    d[columns[i]] = row[i]
                result.append(d)
        else:
            val_arr = []
            tmp_obj = {"columns": columns, "values": val_arr}
            result.append(tmp_obj)
            for row in cursor:
                val_arr.append(row)
    except Exception as e:
        raise Exception(e, "sql :" + sql)
    finally:
        # print("数据操作成功")
        conn.close()

    return result


def is_show_sql():
    return os.getenv("SHOW_SQL", "1") == "1"

__table_exist_cache = {}
def is_table_exist(db_path, table_name)->bool:
    k = db_path+table_name
    if not k in __table_exist_cache:
        __table_exist_cache[k] = len(exec_query(f"select name from sqlite_master where type='table' and name='{table_name}'", file_path=db_path))>0

    return __table_exist_cache[k]

def clear_table_exist_cache():
    __table_exist_cache.clear()

def exec_write(sql: str, file_path=":memory:", custom_functions: dict = None, placeholder_params: list = None) -> int:
    conn = sqlite3.connect(file_path, isolation_level=None)

    if custom_functions:
        for k, v in custom_functions.items():
            conn.create_function(k, -1, v)

    cursor = conn.cursor()

    # print("数据库打开成功")

    sql = sql.strip()

    if is_show_sql():
        print(sql)

    try:
        conn.execute("PRAGMA synchronous=OFF")  # 关闭同步

        if placeholder_params:
            cursor.execute(sql, placeholder_params)
        else:
            if ';' in sql:
                cursor.executescript(sql)
            else:
                cursor.execute(sql)

        result = conn.total_changes

        # send a hook.
        # http_conn = http.client.HTTPConnection("127.0.0.1", 9999)
        # params = parse.urlencode({'sql': sql,'params': placeholder_params})
        # http_conn.request("POST", "/api/async-call-func",parse.urlencode({'func_name': 'SYS_HOOK_AFTER_SQL_WRITE','params': params}) , {"Content-type": "application/x-www-form-urlencoded;charset=utf-8"})
        # func_util.async_functions('SYS_HOOK_AFTER_SQL_WRITE', sql= sql, params =placeholder_params)
    except Exception as e:
        raise Exception(e, "sql :" + sql)
    finally:
        # print("数据操作成功")
        conn.close()

    return result


DB_PARENT_PATH = os.getenv("BASE_DIR", "")
DEFAULT_DB_PATH = os.path.join(DB_PARENT_PATH, "gogo.db")

print("db path : ", DEFAULT_DB_PATH)


def set_db_parent_path(db_parent_path):
    global DB_PARENT_PATH
    global DEFAULT_DB_PATH
    os.environ["BASE_DIR"] = db_parent_path
    DB_PARENT_PATH = db_parent_path
    DEFAULT_DB_PATH = os.path.join(DB_PARENT_PATH, "gogo.db")


def _join_key(table_name, operation):
    return table_name + "." + operation


_tables_query_cache = {}

def clear_all_table_query_cache():
    _tables_query_cache.clear()

def set_table_query_cache(table):
    _tables_query_cache[_join_key(table.table_name, table.operation)] = table
    _tables_query_cache[table.uri] = table


def get_table_query_cache(table_name, operation):
    key = _join_key(table_name, operation)
    if key in _tables_query_cache:
        table = _tables_query_cache[key]
        return table
    return None


def get_table_query_cache_by_uri(uri):
    if uri in _tables_query_cache:
        table = _tables_query_cache[uri]
        return table
    return None


def clear_table_query_cache(table_name, operation):
    key = _join_key(table_name, operation)
    if key in _tables_query_cache:
        table = _tables_query_cache[key]
        del _tables_query_cache[key]
        del _tables_query_cache[table.uri]
        print("clear_table_query_cache key : ", key)


def clear_table_query_cache_by_uri(uri):
    if uri in _tables_query_cache:
        table = _tables_query_cache[uri]
        key = _join_key(table.table_name, table.operation)
        del _tables_query_cache[key]
        del _tables_query_cache[uri]
        print("clear_table_query_cache_by_uri key : ", key)


from bottle import SimpleTemplate


def render_tpl(__name__, __str__, **kwargs):
    kwargs['p'] = kwargs['pages'] = pages
    kwargs['f'] = kwargs['functions'] = functions
    kwargs['t'] = kwargs['tables'] = tables
    if not __str__:
        return __str__
    t = SimpleTemplate(__str__, noescape=True)
    t.filename = __name__
    s = t.render(**kwargs)
    return s


def get_table_row(keyword):
    root_tmpl = exec_query('select * from tables where id=0', file_path=DEFAULT_DB_PATH)[0]
    sql = render_tpl(_join_key(root_tmpl.table_name, root_tmpl.operation), root_tmpl.sql_tmpl, keyword=keyword)
    data = []

    for db_name in root_tmpl.db.split("|"):

        r = exec_query(sql=sql, file_path=os.path.join(DB_PARENT_PATH, db_name.strip()))
        if r:
            data = r
            break

    print("get_table_row >>", data)
    row = data[0] if data else None
    _tables_query_cache[keyword] = row
    return row


def tables(__table_name_or_uri, __operation=None, **kwargs):
    # templ = Tables.get(__table_name, __operation)
    keyword = _join_key(__table_name_or_uri, __operation) if __operation else __table_name_or_uri

    templ = _tables_query_cache[keyword] if keyword in _tables_query_cache else get_table_row(keyword)
    if templ is None:
        return []
    kwargs['_'] = AttributeDict(kwargs)
    sql = render_tpl(templ.table_name + "." + templ.operation, templ.sql_tmpl, **kwargs)

    result_data = None
    if templ.is_query:

        result_data = []
        if "|" in templ.db:
            for db_name in templ.db.split("|"):
                # if the table is not exist ,skip.
                the_db = os.path.join(DB_PARENT_PATH, db_name.strip())
                if not is_table_exist(the_db,templ.table_name ):
                    print(f"tables query warning >>>  table : {templ.table_name} not exist in db : {the_db}")
                    continue

                r = exec_query(sql=sql, file_path=the_db)
                if r:
                    result_data = r
                    break
        elif "+" in templ.db:
            for db_name in templ.db.split("+"):
                the_db = os.path.join(DB_PARENT_PATH, db_name.strip())
                if not is_table_exist(the_db,templ.table_name ):
                    print(f"tables query warning >>> table : {templ.table_name} not exist in db : {the_db}")
                    continue
                result_data.extend(exec_query(sql=sql, file_path=the_db))
        else:
            result_data = exec_query(sql=sql, file_path=os.path.join(DB_PARENT_PATH, templ.db.strip()))

    else:

        result_data = 0
        if "|" in templ.db:
            for db_name in templ.db.split("|"):
                # if the table is not exist ,skip.
                the_db = os.path.join(DB_PARENT_PATH, db_name.strip())
                if not is_table_exist(the_db,templ.table_name ):
                    print(f"tables query warning >>>  table : {templ.table_name} not exist in db : {the_db}")
                    continue
                r = exec_write(sql=sql, file_path=the_db)
                if r:
                    result_data = r
                    break

        elif "+" in templ.db:
            for db_name in templ.db.split("+"):
                # if the table is not exist ,skip.
                the_db = os.path.join(DB_PARENT_PATH, db_name.strip())
                if not is_table_exist(the_db,templ.table_name ):
                    print(f"tables query warning >>>  table : {templ.table_name} not exist in db : {the_db}")
                    continue

                result_data += exec_write(sql=sql, file_path=the_db)
        else:
            result_data = exec_write(sql=sql, file_path=os.path.join(DB_PARENT_PATH, templ.db.strip()))

    return result_data


_function_cache = {}


def clear_function_cache(name):
    if name in _function_cache:
        fun_obj = tables('functions', 'get_by_name_or_uri', name=name)[0]
        del _function_cache[fun_obj.name]
        del _function_cache[fun_obj.uri]
        print("clear_function_cache name : ", name)


def functions(_f_name, **kwargs):
    # print("function params: ", kwargs)
    return function_ref(_f_name)(**kwargs)


def pages(_p_name_or_uri, **kwargs):
    print("pages call in : ", _p_name_or_uri)
    page = tables('pages', 'get_by_name_or_uri', keyword=_p_name_or_uri)[0]
    final_content = page['html']
    if page['use_template']:
        final_content = render_tpl(page['name'], page['html'], **kwargs)

    return final_content


def function_ref(name):
    if name in _function_cache:
        return _function_cache[name]
    else:
        # func_code = exec_query(template(Tables.get('functions', 'get_by_name').sql_tmpl, name = name) , file_path=DEFAULT_DB_PATH)[0]['code']
        fun_obj = tables('functions', 'get_by_name_or_uri', name=name)[0]

        func_code = fun_obj['code']

        compiled_code = compile(func_code + f"\nglobal __ret__;__ret__=" + name, name, 'exec')
        g = {'functions': functions, 'f': functions, 'tables': tables, 't': tables, 'p': pages, "pages": pages}
        eval(compiled_code, g)
        f = g['__ret__']
        _function_cache[fun_obj.name] = _function_cache[fun_obj.uri] = f
        return f


def is_query_sql(sql: str) -> bool:
    t = sql.strip().lower()
    return t.startswith("select") or t.startswith("pragma")


def raw_sql(sql: str, separate_columns=False, placeholder_params: list = None, db="gogo.db"):
    if is_query_sql(sql):
        return exec_query(sql=sql, file_path=os.path.join(DB_PARENT_PATH, db), separate_columns=separate_columns,
                          placeholder_params=placeholder_params)
    else:
        return exec_write(sql=sql, file_path=os.path.join(DB_PARENT_PATH, db), placeholder_params=placeholder_params)


def should_use_compress(filename: str) -> bool:
    IGNORE_COMPRESS = tables("settings", "get", name='sys.ignore_compress')[0]['value'].split(",")
    # print("IGNORE_COMPRESS >> ", IGNORE_COMPRESS)
    use_compress = True
    if any([filename.endswith(x) for x in IGNORE_COMPRESS]):
        use_compress = False
    return use_compress


# cache module
_custom_cache = {}


def set_custom_cache(key, val):
    _custom_cache[key] = val


def get_custom_cache(key):
    if key in _custom_cache:
        return _custom_cache[key]
    else:
        return None


def del_custom_cache(key):
    if key in _custom_cache:
        del _custom_cache[key]
