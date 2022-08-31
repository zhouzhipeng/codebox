import sqlite3
import pandas as pd

con = sqlite3.connect('sg7.db')
wb = pd.read_excel('D:\下载\sg-setting-excel-master\sg-setting-excel-master\dist\setting_import.xls',sheet_name = None)

for sheet in wb:
    wb[sheet].to_sql(sheet,con,index=False)
con.commit()
con.close()