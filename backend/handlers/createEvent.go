package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/JotaBarbosaDev/RideShare/backend/db"
	"github.com/JotaBarbosaDev/RideShare/backend/models"
)

func CreateEvent(w http.ResponseWriter, r *http.Request) {
	var event models.Event

	event.Start = r.FormValue("Start")
	event.End = r.FormValue("End")
	event.Description = r.FormValue("Description")
	event.Title = r.FormValue("Title")

	fmt.Println(event)

	err := db.CreateEventDB(event.Title, event.Start, event.End, event.Description)
	if err != nil {
		http.Error(w, "Erro ao criar registo", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(200)
}
