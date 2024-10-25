package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"strconv"

	"github.com/JotaBarbosaDev/RideShare/backend/db"
	"github.com/JotaBarbosaDev/RideShare/backend/models"
)

func CreatePerson(w http.ResponseWriter, r *http.Request){
	var person models.Person

	person.Name = r.FormValue("Name")
	totalPay,err := strconv.ParseInt(r.FormValue("TotalToPay"), 10, 64)
	if err != nil {
		http.Error(w, "Invalid total to pay", http.StatusBadRequest)
		return
	}
	person.TotalToPay = int(totalPay)

	fmt.Println(person)

	err = db.CreatePerson(person.Name, person.TotalToPay)
	if err != nil {
		http.Error(w, "Erro ao criar registo", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(200)
}
