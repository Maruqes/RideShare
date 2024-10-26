package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/JotaBarbosaDev/RideShare/backend/db"
	"github.com/JotaBarbosaDev/RideShare/backend/models"
)

func UpdatePerson(w http.ResponseWriter, r *http.Request) {
	var person models.Person

	err := json.NewDecoder(r.Body).Decode(&person)
	if err != nil {
		log.Printf("Erro ao fazer decode do json: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	fmt.Println(person)

	err = db.UpdatePerson(person.ID, person.Name, person.Pricetopay)
	if err != nil {
		http.Error(w, "Erro ao criar registo", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(200) 
}
