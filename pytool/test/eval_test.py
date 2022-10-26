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
