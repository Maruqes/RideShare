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
	r.Post("/createPerson", handlers.CreatePerson)
	r.Put("/updateEvent", handlers.UpdateEvent)
	r.Put("/updatePerson", handlers.UpdatePerson)
	r.Delete("/deleteEvent", handlers.DeleteEvent)
	r.Delete("/deletePerson", handlers.DeletePerson)
	r.Get("/getEvents", handlers.ListEvent)
	r.Get("/getPersons", handlers.ListPerson)
	r.Get("/getEventWithId/{id}", handlers.GetEvent)
	r.Get("/getPersonWithId/{id}", handlers.GetPerson)

	fmt.Println("Listening on port ", configs.GetServerPort())
	http.ListenAndServe(fmt.Sprintf(":%s", configs.GetServerPort()), r)
}
