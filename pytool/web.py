# -*- coding: utf-8 -*-
import asyncio
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


@post('/')
def index():
    print(request.params)
    return "ok"


@route('/files/<filepath:path>')
def server_static(filepath):
    try:
        return f('server_static',filepath=filepath )
    except Exception:
        return _err_handle()

@route('/tables/<uri:path>', method=['GET', 'POST', 'PUT', 'DELETE'])
def operate_table(uri):
    try:
        return f('operate_table',uri=uri )
    except Exception:
        return _err_handle()

@route('/functions/<func_uri:path>', method=['GET', 'POST', 'PUT', 'DELETE'])
def call_function(func_uri):
    try:
        return f('call_function',func_uri=func_uri )
    except Exception:
        return _err_handle()


@get('/pages/<page_uri:path>')
def dynamic_pages(page_uri):
    try:
        return f('dynamic_pages',page_uri=page_uri )
    except Exception:
        return _err_handle()

@get('/static/<filepath:path>')
def static_files(filepath):
    try:
        return f('static_files',filepath=filepath )
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
        return f('call_function_from_golang',func_name=func_name )
    except Exception:
        return _err_handle()

def _err_handle():
    err = traceback.format_exc()
    print(err)
    response.status = 500
    return err

from webssh.main import main as webssh_main, options as webssh_options


def run_webssh(port):
    # options.xsrf = False
    asyncio.set_event_loop(asyncio.new_event_loop())
    webssh_options.address = '127.0.0.1'
    webssh_options.port = port
    webssh_main()


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
        sys.stdout = sys.stderr = open(os.path.join(os.getenv("BASE_DIR"), "python.txt"), "w")

        set_db_parent_path(os.getenv("DB_PATH"))

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

        print(os.environ)

        # run webssh server
        webssh_thread = threading.Thread(target=run_webssh, args=(8087,))
        webssh_thread.daemon = True
        webssh_thread.start()

        print("webssh server started.")

        run(host='127.0.0.1', port=8086, reloader=False, server="tornado")


    except Exception:
        err = traceback.format_exc()
        print("Python Err >>>>>>", err)
