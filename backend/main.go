package main

import (
	"fmt"
	"tepph4/task_manager/config"
	"tepph4/task_manager/routes"
)

func main() {
	fmt.Println("Starting server")
	
	db := config.Conn_DB()
	r := routes.SetupRoutes(db)     // ตั้งค่า route พร้อมส่ง DB ไปด้วย
    r.Run(":3000")

	fmt.Println("server started !!!!!")
}