import sqlite3

db_name = 'test.db'

SHOW_SQL = True


def read(sql: str) -> list[dict]:
    conn = sqlite3.connect(db_name)

    c = conn.cursor()
    print("数据库打开成功")

    if SHOW_SQL:
        print(sql)

    cursor = c.execute(sql)
    columns = list(map(lambda x: x[0], cursor.description))
    result = []
    for row in cursor:
        d = {}
        for i in range(len(columns)):
            d[columns[i]] = row[i]
        result.append(d)
    print("数据操作成功")
    conn.close()

    return result


def write(sql: str) -> int:
    conn = sqlite3.connect(db_name)
    c = conn.cursor()
    print("数据库打开成功")

    if SHOW_SQL:
        print(sql)

    c.execute(sql)

    conn.commit()
    count = conn.total_changes

    print("数据操作成功")
    conn.close()
    return count
