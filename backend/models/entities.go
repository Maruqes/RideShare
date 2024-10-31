package models

type Event struct {
	ID int64 `json:"id"`
	Title string `json:"title"`
	Start string `json:"start"`
	End string `json:"end"`
	Description string `json:"description"`
	PersonID string `json:"personID"`
}		

type Person struct {
	ID int64 `json:"id"`
	Name string `json:"name"`
	Pricetopay int `json:"pricetopay"`
}

type Route struct {
	ID int64 `json:"id"`
	Name string `json:"name"`
	StartName string `json:"startName"`
	EndName string `json:"endName"`
	Distance string `json:"distance"`
	Price int `json:"price"`
}
