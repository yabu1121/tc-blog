package main

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

// SupabaseのJWT Secretを使ってトークンを検証する
func authMiddleware(jwtSecret string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// AuthorizationヘッダーからBearerトークンを取得
			authHeader := c.Request().Header.Get("Authorization")
			tokenString := strings.TrimPrefix(authHeader, "Bearer ")

			// JWTのパースと検証
			token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
				return []byte(jwtSecret), nil
			})

			if err != nil || !token.Valid {
				return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
			}

			// 検証成功、次の処理へ
			return next(c)
		}
	}
}