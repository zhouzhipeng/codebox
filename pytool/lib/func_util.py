import http.client
import os
from urllib import parse


def async_functions(func_name: str, **kwargs):
    http_conn = http.client.HTTPConnection("127.0.0.1", int(os.getenv("MAIN_PORT", "80")))
    params = parse.urlencode(kwargs)
    http_conn.request("POST", "/api/async-call-func",parse.urlencode({'func_name': func_name,'params': params}) , {"Content-type": "application/x-www-form-urlencoded;charset=utf-8"})
