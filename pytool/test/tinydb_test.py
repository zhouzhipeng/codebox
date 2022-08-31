import dataclasses
from dataclasses import dataclass

from tinydb import TinyDB, Query

db = TinyDB('db.json')


@dataclass
class Person:
    id: int
    name: str
    age: int

    @staticmethod
    def _table():
        return db.table("person")

    def save(self):
        self._table().insert(dataclasses.asdict(self))

    @staticmethod
    def all():
        return [Person(**x) for x in Person._table().all()]

    @staticmethod
    def find_by_name(name):
        q = Query()
        return Person._table().search(Person.name == name)


# Person(id=10,name='jj', age=20).save()
print(Person.find_by_name('jj'))