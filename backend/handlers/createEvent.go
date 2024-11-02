package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/JotaBarbosaDev/RideShare/backend/db"
	"github.com/JotaBarbosaDev/RideShare/backend/models"
)

func CreateEvent(w http.ResponseWriter, r *http.Request) {
	var event models.Event
	// Decode JSON body into event
	err := json.NewDecoder(r.Body).Decode(&event)
	if err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}
	fmt.Println(event)
	// Check if persons exist
	splitPersons := strings.Split(event.PersonsIDs, "//")
	for _, personIDStr := range splitPersons {
		personID, err := strconv.ParseInt(personIDStr, 10, 64)
		if err != nil {
			fmt.Println("Error parsing person ID")
			http.Error(w, "Invalid person ID", http.StatusBadRequest)
			return
		}
		if !db.CheckIfPersonExists(personID) {
			fmt.Println("Person does not exist")
			http.Error(w, "Pessoa não existe", http.StatusNotFound)
			return
		}
	}

	// Check if route exists
	routeID, err := strconv.ParseInt(event.RouteID, 10, 64)
	if err != nil {
		fmt.Println("Error parsing route ID")
		http.Error(w, "Invalid route ID", http.StatusBadRequest)
		return
	}
	if !db.CheckIfRouteExists(routeID) {
		fmt.Println("Route does not exist")
		http.Error(w, "Rota não existe", http.StatusNotFound)
		return
	}

	err = db.CreateEventDB(event.Title, event.Start, event.End, event.Description, event.PersonsIDs, event.RouteID)
	if err != nil {
		fmt.Println("Error creating event")
		http.Error(w, "Erro ao criar registo", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(200)
}
