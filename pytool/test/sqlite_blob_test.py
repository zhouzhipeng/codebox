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

if __name__ == '__main__':

    insertBLOB("bootstrap.min.css","/static/css/bootstrap.min.css","D:\Code\gogo\static\css\\bootstrap.min.css")
