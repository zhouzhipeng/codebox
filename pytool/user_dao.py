# from bottle import template
#
#
# from lib.data_types import *
# from lib import db
#
#
# def query_user(name: str) -> list[User]:
#     rows = db.read(template("""
#             select * from user where name='{{name}}'
#         """, name=name))
#     user_list = [User(**r) for r in rows]
#     return user_list
#
#
# def insert_user(user: User) -> int:
#     return db.write(template("""
#         insert into user(name,age) values('{{u.name}}', '{{u.age}}')
#     """, u=user))
#
#
# def batch_insert_users(users: list[User]) -> int:
#     return db.write(template("""
#         insert into user(name,age)
#         values
#         %for i,c in enumerate(rows) :
#         ('{{c.name}}', '{{c.age}}')
#         %if i != len(rows)-1:
#         ,
#         %end
#         %end
#     """, rows=users))
