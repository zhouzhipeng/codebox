import os
# import  sqlite_blob_test

import sqlite3


def convertToBinaryData(filename):
    # Convert digital data to binary format
    with open(filename, 'rb') as file:
        blobData = file.read()
    return blobData


def insertBLOB(name, uri, content):
    try:
        sqliteConnection = sqlite3.connect('C:\\Users\\ZHOUZH~1\\AppData\\Local\\Temp\\gogo_files\\gogo.db')
        cursor = sqliteConnection.cursor()
        print("Connected to SQLite")
        sqlite_insert_blob_query = """ INSERT INTO resources
                                  (name, uri, content) VALUES (?, ?, ?)"""

        resume = convertToBinaryData(content)
        # Convert data into tuple format
        data_tuple = (name, uri, resume)
        cursor.execute(sqlite_insert_blob_query, data_tuple)
        sqliteConnection.commit()
        print("Image and file inserted successfully as a BLOB into a table")
        cursor.close()

    except sqlite3.Error as error:
        print("Failed to insert blob data into sqlite table", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("the sqlite connection is closed")


import zlib


def compress(infile, dst, level=9):
    infile = open(infile, 'rb')
    dst = open(dst, 'wb')
    compress = zlib.compressobj(level)
    data = infile.read(1024)
    while data:
        dst.write(compress.compress(data))
        data = infile.read(1024)
    dst.write(compress.flush())


def decompress(infile, dst):
    infile = open(infile, 'rb')
    dst = open(dst, 'wb')
    decompress = zlib.decompressobj()
    data = infile.read(1024)
    while data:
        dst.write(decompress.decompress(data))
        data = infile.read(1024)
    dst.write(decompress.flush())


if __name__ == '__main__':

    for root, subdirs, files in os.walk("D:\Code\gogo\static"):

        for f in files:
            try:
                abs_f = os.path.join(root, f)
                cf = os.path.join(root, f + ".xz")
                uri = root.split("D:\Code\gogo")[1].replace("\\", "/") + "/" + f
                compress(abs_f, cf)
                print(f, uri, cf)
                insertBLOB(f, uri, cf)
                os.remove(cf)
            except:
                print("err")
