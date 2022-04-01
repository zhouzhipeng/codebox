import requests
from bottle import *

from lib.ffmpeg_util import parse_thumbnail
from lib.shell_util import *

UPLOAD_PATH = "/static/upload/"
BASE_PATH = "/py"

os.environ['PYTHONUNBUFFERED']="1"


@route('/')
def index():
    return template("dd-upload.html")


@route('/notes')
def notes():
    return template("notes.html")


from html import unescape


@post(BASE_PATH + '/str-joiner/format-text')
def str_joiner_format():
    response.content_type = 'text/text; charset=UTF8'
    s = request.forms['s']
    print(s)
    return unescape(template(s + '\n'))  # 加上 \n 防止被识别为html模板文件名



@get(BASE_PATH + '/api/killself')
def kill_self():
    print("py received : kill_self")
    sys.stderr.close()
    return "ok"





#检验是否含有中文字符
def is_contains_chinese(strs):
    for _char in strs:
        if '\u4e00' <= _char <= '\u9fa5':
            return True
    return False

@post(BASE_PATH + '/translate')
def translate():
    response.content_type = 'text/text; charset=UTF8'
    response.set_header("Access-Control-Allow-Origin","*")
    response.set_header("Access-Control-Allow-Methods","*")

    src = request.forms['s']
    print(src)

    resp = requests.post(url="https://api-free.deepl.com/v2/translate",
                         data={"auth_key": "dd039ec7-c394-cb4d-7894-f3bf631635e9:fx",
                               "text": src,
                               "target_lang": "EN" if is_contains_chinese(src) else "ZH"}
                         , headers={'Content-Type': 'application/x-www-form-urlencoded'}).json()

    print(resp)

    return resp["translations"][0]["text"]


@post(BASE_PATH + '/upload-file')
def upload_file():
    # category = request.forms.get('category')
    upload = request.files.get('upfile')
    name, ext = os.path.splitext(upload.filename)
    # if ext not in ('.png', '.jpg', '.jpeg', '.mp4', '.proto'):
    #     response.status = 400
    #     return 'File extension not allowed.'

    # save_path = get_save_path_for_category(category)
    save_path = ".%s" % UPLOAD_PATH
    if not os.path.exists(save_path):
        os.mkdir(save_path)
    if os.path.exists(save_path + upload.filename):
        response.status = 400
        return "Duplicated File."
    upload.save(save_path)  # appends upload.filename automatically

    final_path = UPLOAD_PATH + upload.filename

    if ext == '.mp4':
        # test: using ffmpeg
        thumbnail_path = parse_thumbnail(os.getcwd() + final_path, upload.filename, os.getcwd() + UPLOAD_PATH)
        return thumbnail_path[len(os.getcwd()):]

    if ext == '.proto':
        # test: proto to rs
        source_proto_path = save_path
        output = shell("protoc --rust_out . *.proto", cwd=source_proto_path)
        print(output)

        return UPLOAD_PATH + name + ".rs"

    return final_path


@route(BASE_PATH + '/static/<filename:path>')
def send_static(filename):
    return static_file(filename, root='./static')




is_dev = os.environ.get('ENV') != 'prod'

print("is_dev : " + str(is_dev))

run(host='0.0.0.0', port=8086, reloader=False, debug=is_dev,
    server="wsgiref")

# from  sqlite_web import  sqlite_web
# sqlite_web.initialize_app("test.db")
# sqlite_web.app.run(host="127.0.0.1", port=8087)
