import tornado.web
import tornado.httpserver
import tornado.ioloop
import requests
class MyHandler(tornado.web.RequestHandler):

    def get(self):
        self.write('OK')
        self.finish()

class MyHandler2(tornado.web.RequestHandler):

    def get(self):
        self.write(requests.get("http://127.0.0.1:8888").text)
        self.finish()



if __name__=='__main__':
    app = tornado.web.Application([(r'/', MyHandler),
                                   (r'/a', MyHandler2)])

    server = tornado.httpserver.HTTPServer(app)
    server.bind(8888)

    server.start(1) # Specify number of subprocesses

    tornado.ioloop.IOLoop.current().start()