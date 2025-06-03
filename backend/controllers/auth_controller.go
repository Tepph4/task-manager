package controllers

import (
	"net/http"
	model "tepph4/task_manager/models"
	"tepph4/task_manager/services"
	"tepph4/task_manager/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func Login(c *gin.Context, db *gorm.DB) {
	var input model.LoginInput
	
	if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	var user model.User
	 if err := db.Where("username = ?", input.Username).First(&user).Error; err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

	if !services.CheckPasswordHash(input.Password, user.PasswordHash) {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

	token, refreshToken, err := services.GenerateTokens(user.ID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Token generation failed"})
        return
    }

	services.CreateRefreshToken(db, user.ID, refreshToken)

    c.JSON(http.StatusOK, gin.H{       
        "user": gin.H{
                "id":       user.ID,
                "username": user.Username,                
                },
        "token":  token,
        "refresh_token": refreshToken,
    })	
}


func Register(c *gin.Context,db *gorm.DB) {
    var input model.RegisterInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    hashedPassword, err := utils.HashPassword(input.Password)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Hash error"})
        return
    }

    user := model.User{
        ID:           uuid.New().String(),
        Username:     input.Username,
        PasswordHash: hashedPassword,
    }

    if err := db.Create(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Username already exists"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "User registered"})
}
