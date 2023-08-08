# code = compile("""
# import requests
# print(requests)
# a=1
# b=2
# def add(a,b):
# 1/0
#     return int(a)+int(b)
# def run(a,b):
#     return add(a,b)
#
#
# """+"\nglobal __ret__;__ret__=run", 'aa', 'exec')

#
# g = {"a":1, "b":33}
# print(eval(code,g))
# print(g['__ret__'](1,6))
# def b(d: dict):
#     print(d)
#     print("b")
#
# def a():
#     print(1)
# from bottle import SimpleTemplate

#
#
# def render_tpl(__name__, __str__, **kwargs):
#     t = SimpleTemplate(source=__str__, noescape = True)
#     t.filename = __name__
#     s=t.render(**kwargs)
#     return s
#
# print(render_tpl("test1", "select * from abc where id={{id}} ", id='=$&ss'))


# from  dns import resolver
#
# my_resolver = resolver.Resolver()
#
# # 8.8.8.8 is Google's public DNS server
# my_resolver.nameservers = ['8.8.8.8','114.114.114.114']
#
# answersTXT = my_resolver.resolve("ssh.zhouzhipeng.com","TXT")
# for tdata in answersTXT:
#     for txt_string in tdata.strings:
#         txt_string = txt_string.decode()
#         print(txt_string)
#
# # print(answer[0])

#
import json
import os

from bit import Key
# from bit.network import fees
from web3 import Web3
# from web3.auto.infura.mainnet import w3

from web3.types import ABI


import uncurl

result = uncurl.parse_context("""
curl 'http://127.0.0.1/functions/clear-table-cache' \
  -H 'Accept: */*' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: multipart/form-data; boundary=----WebKitFormBoundarycg8EKMtCSEwSmqwo' \
  -H 'Cookie: _ga=GA1.1.15611080.1648866916; __utma=96992031.15611080.1648866916.1664600362.1664612559.45' \
  -H 'Origin: http://127.0.0.1' \
  -H 'Pragma: no-cache' \
  -H 'Referer: http://127.0.0.1/pages/tables-editor' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  --data-raw $'------WebKitFormBoundarycg8EKMtCSEwSmqwo\r\nContent-Disposition: form-data; name="table_name"\r\n\r\napi_entry\r\n------WebKitFormBoundarycg8EKMtCSEwSmqwo\r\nContent-Disposition: form-data; name="operation"\r\n\r\nsave\r\n------WebKitFormBoundarycg8EKMtCSEwSmqwo--\r\n' \
  --compressed
""")

print(result)

for k,v in result.headers.items():
    print(k,":", v)