import dataclasses

from bottle import *

from lib.ffmpeg_util import parse_thumbnail
from lib.shell_util import *
from user_dao import *

UPLOAD_PATH = "/static/upload/"
BASE_PATH = "/py"


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


@route('/user/<name>')
def show(name):
    print("in443...")
    row = query_user(name)
    return {"data": [dataclasses.asdict(r) for r in row]}


@route('/user/add')
def add_user():
    count = insert_user(User(**request.params))
    return "affected:" + str(count)


@route('/user/batch-add')
def batch_add_user():
    count = batch_insert_users([User(name='ahei', age=11, id=0), User(name='asss', age=11, id=0)])
    return "affected:" + str(count)


is_dev = os.environ.get('ENV') != 'prod'

print("is_dev : " + str(is_dev))

run(host='0.0.0.0', port=8086, reloader=is_dev, debug=is_dev,
    server="wsgiref")

# from  sqlite_web import  sqlite_web
# sqlite_web.initialize_app("test.db")
# sqlite_web.app.run(host="127.0.0.1", port=8087)
