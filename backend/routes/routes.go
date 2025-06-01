package routes

import (
	"tepph4/task_manager/controllers"
	"tepph4/task_manager/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	

	r.POST("/login", func(c *gin.Context) { controllers.Login(c, db) })
	r.POST("/register",func(c *gin.Context) { controllers.Register(c, db) })
	
    auth := r.Group("/")
    auth.Use(middleware.JWTAuthMiddleware())
	auth.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Hello, World!"})
	})

	return r
}