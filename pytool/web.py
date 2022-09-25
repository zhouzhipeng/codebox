# -*- coding: utf-8 -*-
import asyncio
import json
import logging
import signal
import zlib

import bottle
import psutil
import requests
from bottle import *

from lib.shell_util import *
# for package
from lib.sqlite_db import set_show_sql

bottle.BaseRequest.MEMFILE_MAX = 1024 * 1024 * 1024 * 1024  # (or whatever you want)


class Unbuffered(object):
    def __init__(self, stream):
        self.stream = stream
        # sys.stdout.reconfigure(encoding='utf-8')

    def write(self, data):
        t = ""  # ("[%s] " % str(datetime.now())) if data.strip() else ""
        self.stream.write(t + data)
        self.stream.flush()

    def writelines(self, datas):
        t = ""  # ("[%s] " % str(datetime.now())) if datas else ""
        self.stream.writelines(t + datas)
        self.stream.flush()

    def __getattr__(self, attr):
        return getattr(self.stream, attr)


import sys
sys.stdout = Unbuffered(sys.stdout)
sys.stderr = Unbuffered(sys.stderr)

import traceback

from data_types import tables, functions, should_use_compress, Tables, render_tpl, set_db_parent_path


def check_permission() -> str:
    PASSED = ""
    # return PASSED
    if os.getenv("ENABLE_AUTH", "false") == "false":
        return PASSED

    has_permission = functions("SYS_CHECK_PERMISSION", uri=request.fullpath, headers=dict(request.headers)
                               , cookies=dict(request.cookies))
    if not has_permission:
        response.status = 403
        return f"403 Forbidden . You have no permission for uri : {request.fullpath}"
    return PASSED


@post('/')
def index():
    print(request.params)
    return "ok"


@route('/files/<filepath:path>')
def server_static(filepath):
    cc = check_permission()
    if cc:
        return cc

    use_download = not filepath.endswith(".txt")
    return static_file(filepath, download=use_download, root=os.getenv("DB_PATH"))


@route('/tables/<uri:path>', method=['GET', 'POST', 'PUT', 'DELETE'])
def operate_table(uri):
    try:
        cc = check_permission()
        if cc:
            return cc
        response.headers['Content-Type'] = "text/text; charset=UTF-8"

        # id is system function , but will make trouble  in sql template.
        if 'id' not in request.params:
            request.params['id'] = None

        if 'Content-Type' in request.headers and 'form-urlencoded' in request.headers['Content-Type']:
            form = FormsDict(request.params).decode('utf-8')
        else:
            form = request.params

        ll = Tables.get_by_uri(request.fullpath)
        if len(ll) > 0:

            templ = ll[0]
            result = tables(templ.table_name, templ.operation, **form)
            if type(result) == list:
                response.headers['Content-Type'] = "application/json; charset=UTF-8"
                return json.dumps(result)
            else:
                return str(result)
        else:
            response.status = 404
            return "table not found."
    except Exception:
        response.headers['Content-Type'] = "text/text; charset=UTF-8"
        err = traceback.format_exc()
        print(err)
        response.status = 500
        return err


@route('/functions/<func_uri:path>', method=['GET', 'POST', 'PUT', 'DELETE'])
def call_function(func_uri):
    try:
        if not func_uri.startswith("public/"):
            cc = check_permission()
            if cc:
                return cc

        response.headers['Content-Type'] = "text/text; charset=UTF-8"

        # print(f"api request for call_function : func_name :{func_uri}, params : {request.query_string}")
        funcs = tables("functions", "get", uri=request.fullpath)
        if funcs:
            if 'Content-Type' in request.headers and 'form-urlencoded' in request.headers['Content-Type']:
                params = FormsDict(request.params).decode('utf-8')
            else:
                params = request.params
            for k, v in request.files.allitems():
                params[k] = v

            return str(functions(funcs[0]['name'], **params))
        else:
            response.status = 404
            return "Function not found."
    except Exception:
        response.headers['Content-Type'] = "text/text; charset=UTF-8"
        err = traceback.format_exc()
        print(err)
        response.status = 500
        return err


@get('/pages/<page_uri:path>')
def dynamic_pages(page_uri):
    try:
        if page_uri.startswith('private/'):
            cc = check_permission()
            if cc:
                return cc

        print("request page_uri :", page_uri)

        page = tables('pages', 'get_by_uri', uri=request.fullpath)

        if page:
            page = page[0]
            html_content = page['html']

            final_content = html_content
            if page['use_template']:
                final_content = render_tpl(page['name'], html_content)

            return final_content
        else:
            response.status = 404
            return "Page not found."
    except Exception:
        err = traceback.format_exc()
        print(err)
        response.status = 500
        return err


@get('/static/<filepath:path>')
def static_files(filepath):
    t1 = time.time()
    try:
        charset = 'UTF-8'

        if filepath.startswith("private/"):
            cc = check_permission()
            if cc:
                return cc
            f = tables("files", "get", uri=request.fullpath)
        else:
            f = tables("resources", "get", uri=request.fullpath)
        if len(f):

            page_body_decompressed = zlib.decompress(f[0]['content']) if f[0]['use_compress'] else f[0]['content']

            if (not should_use_compress(f[0]['name'])) and f[0]['use_compress']:
                # need to convert it to raw bytes
                tables("resources", "update_more", id=f[0]['id'], content_hex=page_body_decompressed.hex()
                       , raw_size=len(page_body_decompressed), compressed_size=len(page_body_decompressed),
                       use_compress=0)

            mimetype, encoding = mimetypes.guess_type(f[0]['name'])
            if encoding:
                response.headers['Content-Encoding'] = encoding

            if mimetype:
                if mimetype[:5] == 'text/' and charset and 'charset' not in mimetype:
                    mimetype += '; charset=%s' % charset
                response.headers['Content-Type'] = mimetype

                if f[0]['name'].endswith(".js"):
                    response.headers['Content-Type'] = "application/javascript"

            response.headers['Content-Length'] = len(page_body_decompressed)

            return page_body_decompressed

        else:
            response.status = 404
            return "404 not found"
    finally:
        t2 = time.time()
        response.headers['X-py-time'] = str((t2 - t1) * 1000) + "ms"
        # print(filepath, " t2-t1= ", (t2-t1))


@get('/py/api/killself')
def kill_self():
    print("py received : kill_self")
    current_process = psutil.Process()
    current_process.send_signal(signal.SIGTERM)


@get('/py/api/version')
def version():
    return "2022.8.23 9:56"


@route('/py/functions/<func_name>', method=['GET', 'POST', 'PUT', 'DELETE'])
def call_function_from_golang(func_name):
    try:
        params = FormsDict(request.params).decode('utf-8')
        print(f"callback from golang :  func_name : {func_name}")

        response.headers['Content-Type'] = "text/text; charset=UTF-8"
        return str(functions(func_name, **params))
    except Exception:
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
        v = line[i+1:]
        if k:
            os.environ[k] = v

    print("init python env done.")
    try:

        set_db_parent_path(os.getenv("DB_PATH"))

        # read settings table into env
        debug = functions('get_setting', name='SHOW_SQL', default="1") == "1"
        set_show_sql(debug)

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

        # run crontab thread.
        # print("starting crontab thread ...")
        # crontab_thread.start()
        # os.environ['PYTHONUNBUFFERED'] = "1"
        # os.environ['PYTHONIOENCODING'] = "utf8"

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
