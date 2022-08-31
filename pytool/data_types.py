import os
from dataclasses import dataclass
from datetime import datetime

from bottle import template

import lib.sqlite_db as _db


DB_PARENT_PATH = os.getenv("FILE_UPLOAD_PATH")
DEFAULT_DB_PATH = os.path.join(DB_PARENT_PATH, "gogo.db")

print("db path : ", DEFAULT_DB_PATH)

def set_db_parent_path(db_parent_path):
    global DB_PARENT_PATH
    global DEFAULT_DB_PATH
    os.environ["FILE_UPLOAD_PATH"]= db_parent_path
    DB_PARENT_PATH = db_parent_path
    DEFAULT_DB_PATH = os.path.join(DB_PARENT_PATH, "gogo.db")

@dataclass
class Tables:
    id: int = None
    table_name: str = None
    operation: str = None
    is_query : bool= True
    sql_tmpl : str = None
    custom_functions: str = None
    callback_func: str = None
    uri : str = None
    db  : str = 'gogo.db'
    updated: datetime = datetime.now()



    @staticmethod
    def get(table_name, operation):
        cached_table = get_table_query_cache(table_name, operation)
        if not cached_table:
            cached_table = [Tables(**dict) for dict in _db.exec_query(sql=render_tpl(_join_key(table_name,operation), '''
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

            cached_table = [Tables(**dict) for dict in _db.exec_query(sql=render_tpl(uri, '''
            select * from tables
            where uri  = '{{uri}}' 
        ''', uri=uri), file_path=DEFAULT_DB_PATH)]
            if len(cached_table)>0:
                cached_table = cached_table[0]
                set_table_query_cache(cached_table)
            else:
                return []
        return [cached_table]


import json

def _join_key(table_name, operation):
    return table_name+"."+operation


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
    if not __str__:
        return __str__
    t = SimpleTemplate(__str__, noescape = True)
    t.filename = __name__
    s=t.render(**kwargs)
    return s


from html import unescape
def tables(__table_name, __operation, **kwargs):
    #print(f"tables request for operating tables : table_name :{__table_name}, operation : {__operation}")
    # key = _join_key(table_name, operation)
    # if  key in _tables_query_cache:
    #     return _tables_query_cache[key]

    templ = Tables.get(__table_name, __operation)

    custom_functions=None
    if templ.custom_functions:
        custom_functions ={}
        # query  function codes
        for fname in templ.custom_functions.strip().split(","):
            fname = fname.strip()
            custom_functions[fname] = function_ref(fname)

    sql = render_tpl(templ.table_name + "." + templ.operation, templ.sql_tmpl, **kwargs)

    result_data = None
    if templ.is_query:
        result_data = _db.exec_query(sql=sql, file_path=os.path.join(DB_PARENT_PATH,templ.db ), custom_functions=custom_functions)
    else:
        result_data = _db.exec_write(sql=sql, file_path=os.path.join(DB_PARENT_PATH,templ.db ), custom_functions=custom_functions)

    # invoke callback function
    if templ.callback_func:
        func_util.async_functions(templ.callback_func, ctx = {"table_id": templ.id, "data": kwargs} )
        print(f"callback_func called. table_name :  {__table_name}, operation: {__operation}")

    return result_data


_function_cache = {}
_pages_cache={}
_resources_cache=  {}


def clear_function_cache(name):
    if name in _function_cache:
        del _function_cache[name]
        print("clear_function_cache name : ", name)


def functions(_f_name, **kwargs):
    #print("function params: ", kwargs)
    return function_ref(_f_name)(**kwargs)

from lib import func_util
def function_ref(name):
    if name in _function_cache:
        return _function_cache[name]
    else:
        # func_code = _db.exec_query(template(Tables.get('functions', 'get_by_name').sql_tmpl, name = name) , file_path=DEFAULT_DB_PATH)[0]['code']
        func_code =  tables('functions', 'get_by_name',  name = name)[0]['code']

        compiled_code = compile(func_code+f"\nglobal __ret__;__ret__="+name, name, 'exec')
        g = {'functions': functions, 'tables': tables, 'async_functions': func_util.async_functions}
        eval(compiled_code, g)
        f = g['__ret__']
        _function_cache[name] =f
        return f


def is_query_sql(sql: str)->bool:
    t = sql.strip().lower()
    return t.startswith("select") or t.startswith("pragma")

def raw_sql(sql: str, separate_columns= False, placeholder_params:list=None, db="gogo.db"):
    if is_query_sql(sql):
        return _db.exec_query(sql=sql, file_path=os.path.join(DB_PARENT_PATH,db), separate_columns = separate_columns, placeholder_params=placeholder_params)
    else:
        return _db.exec_write(sql=sql, file_path=os.path.join(DB_PARENT_PATH,db), placeholder_params=placeholder_params)


def should_use_compress(filename: str) -> bool:
    IGNORE_COMPRESS = tables("settings", "get", name='sys.ignore_compress')[0]['value'].split(",")
    #print("IGNORE_COMPRESS >> ", IGNORE_COMPRESS)
    use_compress = True
    if any([filename.endswith(x) for x in IGNORE_COMPRESS]):
        use_compress = False
    return use_compress



# 保持兼容
sql_template=tables


# cache module
_custom_cache={}

def set_custom_cache(key,val):
    _custom_cache[key]=val

def get_custom_cache(key):
    if  key in _custom_cache:
        return _custom_cache[key]
    else:
        return None

def del_custom_cache(key):
    if key in _custom_cache:
        del _custom_cache[key]

if __name__ == '__main__':
    # print(CodeSnippet.create_table())
    # CodeSnippet.delete_all()
    print(CodeSnippet(title="test1", code="bodysdfsdxxxx", type="sql").save())
    print(CodeSnippet.all())
