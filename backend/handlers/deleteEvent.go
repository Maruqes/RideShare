package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/JotaBarbosaDev/RideShare/backend/db"
)

func DeleteEvent(w http.ResponseWriter, r *http.Request) {

	id, err := strconv.ParseInt(r.FormValue("ID"), 10, 64)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	err = db.DeletEvent(id)
	if err != nil {
		http.Error(w, "Erro a apagar o registo", http.StatusInternalServerError)
	}

	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(200)
}
