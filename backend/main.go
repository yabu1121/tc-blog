package main

import (
	"encoding/json"
	"net/http"
)

type Post struct {
	ID int `json:"id"`
	Title string `json:"title"`
	Content string `json:"content"`
	Description string `json:"description"`
}

func main(){
	posts:= []Post{
		{ID: 1, Title:"初めてのGo", Content:"Goのバックエンドです", Description: "初めてGoのバックエンドでapiを作成しています"},
		{ID: 2, Title:"Next.js", Content:"apiでの連携です。", Description: "Next.jsのバックエンドも作れるという特徴を腐らせています"},
	}

	http.HandleFunc("/posts", func (w http.ResponseWriter, r *http.Request){
		// CORSの設定
		w.Header().Set("Access-Control-Allow-Origin","*")
		w.Header().Set("Content-Type","application/json")
		json.NewEncoder(w).Encode(posts)
	})
	http.ListenAndServe(":8080", nil)
}