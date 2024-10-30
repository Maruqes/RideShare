package main

import (
    "fmt"
    "net/http"

    "github.com/JotaBarbosaDev/RideShare/backend/configs"
    "github.com/JotaBarbosaDev/RideShare/backend/handlers"
    "github.com/JotaBarbosaDev/RideShare/backend/db"
    "github.com/go-chi/chi/v5"
    "github.com/go-chi/cors"
)

func main() {
    db.CreateAllTablesAndFile()

    err := configs.Load()
    if err != nil {
        panic(err)
    }

    r := chi.NewRouter()

    // Configurar middleware CORS
    corsOptions := cors.Options{
        AllowedOrigins:   []string{"*"}, // Permitir todas as origens, ajuste conforme necessário
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
        ExposedHeaders:   []string{"Link"},
        AllowCredentials: true,
        MaxAge:           300, // 5 minutos
    }
    r.Use(cors.Handler(corsOptions))

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
