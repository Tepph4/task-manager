package main

import (
	"gorm.io/driver/mysql"
	"gorm.io/gen"
	"gorm.io/gorm"
)

func main() {
    // เชื่อมต่อฐานข้อมูล
    dsn := "UserAdmin:P@ssw0rd@tcp(localhost:3306)/task_manager?charset=utf8mb4&parseTime=True&loc=Local"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    // สร้าง generator
    g := gen.NewGenerator(gen.Config{
        OutPath: "./models", // ตำแหน่ง output
        Mode:    gen.WithDefaultQuery | gen.WithQueryInterface,
    })

    g.UseDB(db)

    // Generate ทั้งหมด
    g.GenerateAllTable()

    // รัน
    g.Execute()
}
