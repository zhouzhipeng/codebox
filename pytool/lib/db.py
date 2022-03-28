import sqlite3

SQLITE_DB_PATH = '/tmp/test.db'

SHOW_SQL = True


def run_sql(sql: str) -> list[dict] | int:
    conn = sqlite3.connect(SQLITE_DB_PATH)
    c = conn.cursor()

    print("数据库打开成功")

    sql = sql.strip()

    if SHOW_SQL:
        print(sql)

    # result = 0
    if sql.lower().startswith('select'):

        cursor = c.execute(sql)
        columns = list(map(lambda x: x[0], cursor.description))
        result = []
        for row in cursor:
            d = {}
            for i in range(len(columns)):
                d[columns[i]] = row[i]
            result.append(d)

    else:
        c.execute(sql)
        conn.commit()
        result = conn.total_changes

    print("数据操作成功")
    conn.close()

    return result


if __name__ == '__main__':
    # print(exec("create table user(name text,age integer)"))
    print(run_sql("insert into user(name,age) values('zzz',22)"))

    print(run_sql("select * from user"))
