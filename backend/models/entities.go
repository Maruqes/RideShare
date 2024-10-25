package models

type Event struct {
	ID int64 `json:"id"`
	Title string `json:"title"`
	Start string `json:"start"`
	End string `json:"end"`
	Description string `json:"description"`
}		

type Person struct {
	ID int64 `json:"id"`
	Name string `json:"name"`
	TotalToPay int `json:"totalToPay"`
}

type Route struct {
	ID int64 `json:"id"`
	Name string `json:"name"`
	StarName string `json:"startName"`
	EndName string `json:"endName"`
	Distance int `json:"distance"`
	TravelTime int `json:"travelTime"`
	Price int `json:"price"`
}
