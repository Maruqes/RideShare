package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/JotaBarbosaDev/RideShare/backend/db"
)

func ListPerson(w http.ResponseWriter, r *http.Request) {

	persons, err := db.GetAllPersons()
	if err != nil {
		log.Printf("Erro ao obter as pessoas: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(persons); err != nil {
		log.Printf("Erro ao codificar resposta JSON: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
	}
}
