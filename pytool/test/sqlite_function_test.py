import sqlite3
import hashlib



code = compile("""
import requests
print(requests)
import sqlite3
import hashlib
a=1
b=2
def add(a,b):
    return int(a)+int(b)
def run(a,b):
    return add(a,b)
def md5sum(t):
    return hashlib.md5(t).hexdigest()


"""+"\nglobal __ret__;__ret__=md5sum", '<string>', 'exec')
"".encode("utf-8")

g = {"a":1, "b":33}
eval(code,g)
con = sqlite3.connect(":memory:")
con.create_function("md5", -1, g['__ret__'])
cur = con.cursor()
cur.execute("select md5(?)", (b"foo",))
print(cur.fetchone()[0])

con.close()
