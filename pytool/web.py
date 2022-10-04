# -*- coding: utf-8 -*-
import logging
import signal

import bottle
import psutil
import requests
from bottle import *

bottle.BaseRequest.MEMFILE_MAX = 1024 * 1024 * 1024 * 1024  # (or whatever you want)

import traceback

from data_types import functions, set_db_parent_path

f = functions


@get('/')
def index():
    return "ok"

@route('/files/')
@route('/files/<filepath:path>')
def server_static(filepath='/'):
    try:
        return f('server_static', filepath=filepath)
    except Exception:
        return _err_handle()


@route('/tables/<uri:path>', method=['GET', 'POST', 'PUT', 'DELETE'])
def operate_table(uri):
    try:
        return f('operate_table', uri=uri)
    except Exception:
        return _err_handle()


@route('/functions/<func_uri:path>', method=['GET', 'POST', 'PUT', 'DELETE'])
def call_function(func_uri):
    try:
        return f('call_function', func_uri=func_uri)
    except Exception:
        return _err_handle()


@get('/pages/<page_uri:path>')
def dynamic_pages(page_uri):
    try:
        return f('dynamic_pages', page_uri=page_uri)
    except Exception:
        return _err_handle()


@get('/static/<filepath:path>')
def static_files(filepath):
    try:
        return f('static_files', filepath=filepath)
    except Exception:
        return _err_handle()


@get('/py/api/killself')
def kill_self():
    print("py received : kill_self")
    current_process = psutil.Process()
    current_process.send_signal(signal.SIGTERM)


@route('/py/functions/<func_name>', method=['GET', 'POST', 'PUT', 'DELETE'])
def call_function_from_golang(func_name):
    try:
        return f('call_function_from_golang', func_name=func_name)
    except Exception:
        return _err_handle()


def _err_handle():
    err = traceback.format_exc()
    print(err)
    response.status = 500
    return err


class Logger:

    def __init__(self, filename):
        self.console = sys.stdout
        self.file = open(filename, "w", encoding='utf-8')

    def write(self, message):
        # self.console.write(message)
        self.file.write(message)
        self.file.flush()

    def flush(self):
        # self.console.flush()
        self.file.flush()


if __name__ == '__main__':
    # read env from config server.
    for line in requests.get('http://127.0.0.1:28888/getenv').text.split("\n"):
        # k, v = line.split(sep="=", maxsplit=2)
        i = line.index('=')
        k = line[:i]
        v = line[i + 1:]
        if k:
            os.environ[k] = v

    print("init python env done.")
    try:

        # set print to file
        sys.stdout = sys.stderr = Logger(os.path.join(os.getenv("BASE_DIR"), "python.txt"))

        set_db_parent_path(os.getenv("BASE_DIR"))

        # read settings table into env
        debug = functions('get_setting', name='SHOW_SQL', default="1") == "1"
        os.environ['SHOW_SQL'] = str(debug)

        if debug:
            # You must initialize logging, otherwise you'll not see debug output.
            logging.basicConfig()
            logging.getLogger().setLevel(logging.DEBUG)
            requests_log = logging.getLogger("requests.packages.urllib3")
            requests_log.setLevel(logging.DEBUG)
            requests_log.propagate = True

        try:
            # init userdata.db
            print(functions('SYS_INIT_USERDATA_DB'))
        except Exception:
            err = traceback.format_exc()
            print("SYS_INIT_USERDATA_DB Err >>>>>>", err)

        # print(os.environ)

        run(host='127.0.0.1', port=8086, reloader=False, server="cheroot")


    except Exception:
        err = traceback.format_exc()
        print("Python Err >>>>>>", err)
