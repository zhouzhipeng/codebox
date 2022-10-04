import os
import sqlite3
from dataclasses import dataclass
from datetime import datetime


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
    return os.getenv("SHOW_SQL", "True") == "True"


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


@dataclass
class Tables:
    id: int = None
    table_name: str = None
    operation: str = None
    is_query: bool = True
    sql_tmpl: str = None
    custom_functions: str = None
    uri: str = None
    db: str = 'gogo.db'
    updated: datetime = datetime.now()

    @staticmethod
    def get(table_name, operation):
        cached_table = get_table_query_cache(table_name, operation)
        if not cached_table:
            cached_table = [Tables(**dict) for dict in exec_query(sql=render_tpl(_join_key(table_name, operation), '''
            select * from tables
            where table_name  = '{{table_name}}' 
            and operation  = '{{operation}}'
        ''', table_name=table_name, operation=operation), file_path=DEFAULT_DB_PATH)][0]
            set_table_query_cache(cached_table)
        return cached_table

    @staticmethod
    def get_by_uri(uri):
        cached_table = get_table_query_cache_by_uri(uri)
        if not cached_table:

            cached_table = [Tables(**dict) for dict in exec_query(sql=render_tpl(uri, '''
            select * from tables
            where uri  = '{{uri}}' 
        ''', uri=uri), file_path=DEFAULT_DB_PATH)]
            if len(cached_table) > 0:
                cached_table = cached_table[0]
                set_table_query_cache(cached_table)
            else:
                return []
        return [cached_table]


def _join_key(table_name, operation):
    return table_name + "." + operation


_tables_query_cache = {}


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


def tables(__table_name, __operation, **kwargs):
    # print(f"tables request for operating tables : table_name :{__table_name}, operation : {__operation}")
    # key = _join_key(table_name, operation)
    # if  key in _tables_query_cache:
    #     return _tables_query_cache[key]

    templ = Tables.get(__table_name, __operation)

    custom_functions = None
    if templ.custom_functions:
        custom_functions = {}
        # query  function codes
        for fname in templ.custom_functions.strip().split(","):
            fname = fname.strip()
            custom_functions[fname] = function_ref(fname)

    sql = render_tpl(templ.table_name + "." + templ.operation, templ.sql_tmpl, **kwargs)

    result_data = None
    if templ.is_query:
        result_data = exec_query(sql=sql, file_path=os.path.join(DB_PARENT_PATH, templ.db),
                                 custom_functions=custom_functions)
    else:
        result_data = exec_write(sql=sql, file_path=os.path.join(DB_PARENT_PATH, templ.db),
                                 custom_functions=custom_functions)

    return result_data


_function_cache = {}


def clear_function_cache(name):
    if name in _function_cache:
        del _function_cache[name]
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
        func_code = tables('functions', 'get_by_name', name=name)[0]['code']

        compiled_code = compile(func_code + f"\nglobal __ret__;__ret__=" + name, name, 'exec')
        g = {'functions': functions, 'f': functions, 'tables': tables, 't': tables, 'p': pages, "pages": pages}
        eval(compiled_code, g)
        f = g['__ret__']
        _function_cache[name] = f
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
