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

	event.Start = r.FormValue("Start")
	event.End = r.FormValue("End")
	event.Description = r.FormValue("Description")
	event.Title = r.FormValue("Title")
	event.PersonsIDs = r.FormValue("PersonsIDs")
	event.RouteID = r.FormValue("RouteID")

	//check if persons exists
	splitPersons := strings.Split(event.PersonsIDs, "//")
	for i := 0; i < len(splitPersons); i++ {
		personID, err := strconv.ParseInt(splitPersons[i], 10, 64)
		if err != nil {
			http.Error(w, "Invalid person ID", http.StatusBadRequest)
			return
		}
		if !db.CheckIfPersonExists(personID) {
			http.Error(w, "Pessoa não existe", http.StatusNotFound)
			return
		}
	}

	//check if route exists
	routeID, err := strconv.ParseInt(event.RouteID, 10, 64)
	if err != nil {
		http.Error(w, "Invalid route ID", http.StatusBadRequest)
		return
	}
	if !db.CheckIfRouteExists(routeID) {
		http.Error(w, "Rota não existe", http.StatusNotFound)
		return
	}

	fmt.Println(event)

	err = db.CreateEventDB(event.Title, event.Start, event.End, event.Description, event.PersonsIDs, event.RouteID)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Erro ao criar registo", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(200)
}
