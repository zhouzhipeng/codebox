import os
import sqlite3
from urllib import parse

SHOW_SQL = os.getenv("SHOW_SQL", True)


def set_show_sql(val: bool):
    global SHOW_SQL
    SHOW_SQL = val
    print("set_show_sql : ", SHOW_SQL)


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

    if SHOW_SQL:
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
        raise Exception(e, "sql :"+ sql)
    finally:
        # print("数据操作成功")
        conn.close()


    return result

from . import func_util
def exec_write(sql: str, file_path=":memory:", custom_functions: dict = None, placeholder_params: list = None) -> int:

    conn = sqlite3.connect(file_path, isolation_level=None)

    if custom_functions:
        for k, v in custom_functions.items():
            conn.create_function(k, -1, v)

    cursor = conn.cursor()

    # print("数据库打开成功")

    sql = sql.strip()

    if SHOW_SQL:
        print(sql)

    try:
        conn.execute("PRAGMA synchronous=OFF") #关闭同步

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
        raise Exception(e, "sql :"+ sql)
    finally:
        # print("数据操作成功")
        conn.close()

    return result


if __name__ == '__main__':
    # print(run_sql("create table user3(name text,age integer)", conn_str="sqlite://:memory:"))
    # print(run_on_sqlite("insert into user(name,age) values('zzz',22)"))

    pass
