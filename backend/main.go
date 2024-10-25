package main

import (
	"fmt"
	"net/http"

	"github.com/JotaBarbosaDev/RideShare/backend/configs"
	"github.com/JotaBarbosaDev/RideShare/backend/handlers"
	"github.com/JotaBarbosaDev/RideShare/backend/db"
	"github.com/go-chi/chi/v5"
)

func main(){
	db.CreateAllTablesAndFile()

	err := configs.Load()
	if err != nil {	
		panic(err)
	}

	r := chi.NewRouter()
	r.Post("/createEvent", handlers.CreateEvent)
	r.Put("/updateEvent", handlers.UpdateEvent)
	r.Delete("/deleteEvent", handlers.DeleteEvent)
	r.Get("/getEvents", handlers.ListEvent)
	r.Get("/getEventWithId/{id}", handlers.GetEvent)
	r.Post("/createPerson", handlers.CreatePerson)

	fmt.Println("Listening on port ", configs.GetServerPort())
	http.ListenAndServe(fmt.Sprintf(":%s", configs.GetServerPort()), r)
}
