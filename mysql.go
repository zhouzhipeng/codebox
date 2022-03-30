package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"strings"
)

func querySql(sqlString string, ds string) string {
	log.Printf("querySql >> %s  , ds = %s ", sqlString, ds)

	prefix := ""

	//judge if contains insert, update, delete
	tsql := strings.ToLower(sqlString)
	if strings.HasPrefix(tsql, "insert") || strings.HasPrefix(tsql, "update") || strings.HasPrefix(tsql, "delete") {
		return writeSql(sqlString, ds)
	}

	db, err := sql.Open("mysql", ds)
	if err != nil {
		log.Println(err)
		return err.Error()
	}

	rows, err := db.Query(sqlString)
	if err != nil {
		log.Println(err)
		return err.Error()
	}
	defer rows.Close()
	columns, err := rows.Columns()
	if err != nil {
		log.Println(err)
		return err.Error()
	}
	count := len(columns)
	tableData := make([]map[string]interface{}, 0)
	values := make([]interface{}, count)
	valuePtrs := make([]interface{}, count)

	for rows.Next() {
		if len(tableData) > 100 {

			prefix = "warning : Only 100 rows returned for below table." + "<br/>"
			log.Println(prefix)
			break
		}

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

	if len(tableData) == 0 {
		entry := make(map[string]interface{})
		if len(columns) > 0 {

			for _, col := range columns {
				entry[col] = ""
			}
			tableData = append(tableData, entry)
		} else {
			entry["#msg"] = "Executed Successful!"
			tableData = append(tableData, entry)
		}
	}

	jsonData, err := json.Marshal(tableData)
	if err != nil {
		log.Println(err)
		return err.Error()
	}

	//fmt.Println(string(jsonData))

	return prefix + string(jsonData)
}

func writeSql(sqlString string, ds string) string {
	log.Printf("writeSql >> %s  , ds = %s ", sqlString, ds)

	db, err := sql.Open("mysql", ds)
	defer db.Close()
	if err != nil {
		log.Println(err)
		return err.Error()
	}

	r, e := db.Exec(sqlString)
	if e != nil {
		log.Println(e)
		return err.Error()
	}
	c, ee := r.RowsAffected()
	if ee != nil {
		log.Println(ee)
		return err.Error()
	}

	return fmt.Sprintf("Affected Rows: %d", c)
}
