package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/JotaBarbosaDev/RideShare/backend/db"
	"github.com/JotaBarbosaDev/RideShare/backend/models"
)

func UpdateEvent(w http.ResponseWriter, r *http.Request) {
	var event models.Event

	err := json.NewDecoder(r.Body).Decode(&event)
	if err != nil {
		log.Printf("Erro ao fazer decode do json: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	fmt.Println(event)

	err = db.UpdateEvent(event.ID, event.Title, event.Start, event.End, event.Description)
	if err != nil {
		http.Error(w, "Erro ao criar registo", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(200) 
}
