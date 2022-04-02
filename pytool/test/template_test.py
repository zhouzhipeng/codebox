from bottle import SimpleTemplate


# tpl = SimpleTemplate('Hello {{name}}!')
# s=tpl.render(name='World')
#
# print(s)

from io import StringIO
import sys

old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()


code = compile('''
import time
print(name)
print(int(time.time()*1000))
if a:
     print('yes')
     func(1)
'''.strip(), '<string>', 'exec')
print(code)
r = eval(code,{"name":"zhouzhipeng3333","a":True, "func": lambda x : print(x+1)})
print(r)

sys.stdout = old_stdout

message = mystdout.getvalue()

print(message)


