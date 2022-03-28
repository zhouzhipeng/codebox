package main

import (
	"database/sql"
	"encoding/json"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

func querySql(sqlString string, ds string) string {
	db, err := sql.Open("mysql", ds)
	if err != nil {
		log.Println(err)
	}

	rows, err := db.Query(sqlString)
	if err != nil {
		return ""
	}
	defer rows.Close()
	columns, err := rows.Columns()
	if err != nil {
		return ""
	}
	count := len(columns)
	tableData := make([]map[string]interface{}, 0)
	values := make([]interface{}, count)
	valuePtrs := make([]interface{}, count)
	for rows.Next() {
		for i := 0; i < count; i++ {
			valuePtrs[i] = &values[i]
		}
		rows.Scan(valuePtrs...)
		entry := make(map[string]interface{})
		for i, col := range columns {
			var v interface{}
			val := values[i]
			b, ok := val.([]byte)
			if ok {
				v = string(b)
			} else {
				v = val
			}
			entry[col] = v
		}
		tableData = append(tableData, entry)
	}
	jsonData, err := json.Marshal(tableData)
	if err != nil {
		return ""
	}
	//fmt.Println(string(jsonData))
	return string(jsonData)
}

func writeSql(sqlString string, ds string) int64 {
	db, err := sql.Open("mysql", ds)
	defer db.Close()
	if err != nil {
		log.Println(err)
		return -1
	}

	r, e := db.Exec(sqlString)
	if e != nil {
		log.Println(e)
		return -1
	}
	c, ee := r.RowsAffected()
	if ee != nil {
		log.Println(ee)
		return -1
	}

	return c
}
