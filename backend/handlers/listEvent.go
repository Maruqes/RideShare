package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/JotaBarbosaDev/RideShare/backend/db"
)

func ListEvent(w http.ResponseWriter, r *http.Request) {

	events, err := db.GetAllEvents()
	if err != nil {
		log.Printf("Erro ao obter eventos: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(events); err != nil {
		log.Printf("Erro ao codificar resposta JSON: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
	}

}
