# task-manager

📌 ภาพรวมของโปรเจกต์
โปรเจกต์นี้เป็น แอป To-Do List หรือ Task Manager ที่สามารถทำงานแบบ Full Stack คือมีทั้ง Frontend (React) และ Backend (Go) พร้อมระบบฐานข้อมูล และเสริมความปลอดภัยด้วยระบบล็อกอินและ JWT authentication.

🧩 ฟีเจอร์หลัก

1. Frontend (React)
   สร้างหน้าจอผู้ใช้ด้วย React

   ฟีเจอร์ที่ต้องมี:

   ✅ แสดงรายการ Tasks

   ➕ เพิ่ม Task ใหม่

   🖊️ แก้ไข Task

   🗑️ ลบ Task

   🔐 ระบบล็อกอิน / สมัครสมาชิก

   ใช้ axios เพื่อเรียกใช้ REST API

2. Backend (Go)
   ใช้ภาษา Go สร้าง RESTful API

   ใช้ framework  Gin 

   เชื่อมต่อกับฐานข้อมูล (MySQL )

   API หลักที่ควรมี:

   Method Endpoint Function
   POST /register สมัครผู้ใช้ใหม่
   POST /login ล็อกอิน รับ JWT token
   GET /tasks ดึงรายการ Task ทั้งหมด
   POST /tasks เพิ่ม Task ใหม่
   PUT /tasks/:id แก้ไข Task ตาม ID
   DELETE /tasks/:id ลบ Task ตาม ID
