package routes

import (
	"log"
	"os"
	"tepph4/task_manager/controllers"
	"tepph4/task_manager/middleware"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

func SetupRoutes(db *gorm.DB) *gin.Engine {
	r := gin.Default()
	
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("BASED_URL")}, 
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))


	r.POST("/login", func(c *gin.Context) { controllers.Login(c, db) })
	r.POST("/register",func(c *gin.Context) { controllers.Register(c, db) })
	
    auth := r.Group("/")
    auth.Use(middleware.JWTAuthMiddleware())
	auth.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Hello, World!"})
	})

	return r
}