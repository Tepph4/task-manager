package services

import (
	model "tepph4/task_manager/models"
	"tepph4/task_manager/utils"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func CreateRefreshToken(db *gorm.DB, userID string,refreshToken string) (*model.RefreshToken, error) {
	token := &model.RefreshToken{
		ID:        uuid.New().String(),
		UserID:    userID,
		Token:     refreshToken, 
		Revoked:   false,
		ExpiresAt: utils.RefreshTokenExpiry(),
		CreatedAt: time.Now(),
	}

	err := db.Create(token).Error
	if err != nil {
		return nil, err
	}

	return token, nil
}