package utils

import (
	"log"
	"os"
	"time"

	"github.com/google/uuid"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}


func GenerateUUID() string {
	return uuid.New().String()
}


func RefreshTokenExpiry() time.Time {
    return time.Now().Add(7 * 24 * time.Hour) // หมดอายุใน 7 วัน
}

func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func GetJWTSecret() []byte {
	return []byte(os.Getenv("JWT_SECRET"))
}