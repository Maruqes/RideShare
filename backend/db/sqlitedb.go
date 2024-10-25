package db

import (
	"database/sql"

	"github.com/JotaBarbosaDev/RideShare/backend/models"
	_ "github.com/mattn/go-sqlite3"
)

// Connect to the SQLite database

func CreateEventDB(title, start, end, description string) error {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec("INSERT INTO events (title, start, end, description) VALUES (?, ?, ?, ?)", title, start, end, description)
	if err != nil {
		return err
	}
	return nil
}

func CreatePerson(name string, pricetopay int) error {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec("INSERT INTO person (name, pricetopay) VALUES (?, ?)", name, pricetopay)
	if err != nil {
		return err
	}
	return nil
}

func DeletEvent(id int64) error {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec("DELETE FROM events WHERE id = ?", id)
	if err != nil {
		return err
	}
	return nil
}

func UpdateEvent(id int64, title, start, end, description string) error {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec("UPDATE events SET title = ?, start = ?, end = ?, description = ? WHERE id = ?", title, start, end, description, id)
	if err != nil {
		return err
	}
	return nil
}

func GetEvent(id int64) (models.Event, error) {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return models.Event{}, err
	}
	defer db.Close()

	row := db.QueryRow("SELECT id, title, start, end, description FROM events WHERE id = ?", id)

	var event models.Event
	err = row.Scan(&event.ID, &event.Title, &event.Start, &event.End, &event.Description)
	if err != nil {
		if err == sql.ErrNoRows {
			return models.Event{}, nil
		}
		return models.Event{}, err
	}
	return event, nil
}

func GetAllEvents() ([]models.Event, error) {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query("SELECT id, title, start, end, description FROM events")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var events []models.Event
	for rows.Next() {
		var event models.Event
		if err := rows.Scan(&event.ID, &event.Title, &event.Start, &event.End, &event.Description); err != nil {
			return nil, err
		}
		events = append(events, event)
	}
	return events, nil
}

func CreateAllTablesAndFile() {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	createTableSQL := `CREATE TABLE IF NOT EXISTS events (
		"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,		
		"title" TEXT,
		"start" TEXT,
		"end" TEXT,
		"description" TEXT
	);`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		panic(err)
	}

	createTableSQL = `CREATE TABLE IF NOT EXISTS person (
		"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,		
		"name" TEXT,
		"pricetopay" INTEGER
	);`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		panic(err)
	}
}
