package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/JotaBarbosaDev/RideShare/backend/db"
	"github.com/JotaBarbosaDev/RideShare/backend/models"
	"github.com/go-chi/chi/v5"
)

func GetEvent(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		log.Printf("Erro ao fazer parse do id: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	eventRet, err := db.GetEvent(int64(id))
	if err != nil {
		log.Printf("Erro ao obter evento: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	if (eventRet == models.Event{}) {
		http.Error(w, "Event not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(eventRet)
	w.Header().Add("Content-Type", "application/json")
}
