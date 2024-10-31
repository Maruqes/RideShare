package db

import (
	"database/sql"

	"github.com/JotaBarbosaDev/RideShare/backend/models"
	_ "github.com/mattn/go-sqlite3"
)

// Connect to the SQLite database

func CreateEventDB(title, start, end, description, personID string) error {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec("INSERT INTO events (title, start, end, description, personID) VALUES (?, ?, ?, ?, ?)", title, start, end, description, personID)
	if err != nil {
		return err
	}
	return nil
}

func CreatePerson(name string, Pricetopay int) error {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec("INSERT INTO persons (name, pricetopay) VALUES (?, ?)", name, Pricetopay)
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

func DeletPerson(id int64) error {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec("DELETE FROM persons WHERE id = ?", id)
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

func UpdatePerson(id int64, name string, pricetopay int) error {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec("UPDATE persons SET name = ?, pricetopay = ? WHERE id = ?", name, pricetopay, id)
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

func GetPerson(id int64) (models.Person, error) {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return models.Person{}, err
	}
	defer db.Close()

	row := db.QueryRow("SELECT id, name, pricetopay FROM persons WHERE id = ?", id)

	var person models.Person
	err = row.Scan(&person.ID, &person.Name, &person.Pricetopay)
	if err != nil {
		if err == sql.ErrNoRows {
			return models.Person{}, nil
		}
		return models.Person{}, err
	}
	return person, nil
}

func GetAllEvents() ([]models.Event, error) {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query("SELECT id, title, start, end, description, personID FROM events")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var events []models.Event
	for rows.Next() {
		var event models.Event
		if err := rows.Scan(&event.ID, &event.Title, &event.Start, &event.End, &event.Description, &event.PersonID); err != nil {
			return nil, err
		}
		events = append(events, event)
	}
	return events, nil
}

func GetAllPersons() ([]models.Person, error) {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query("SELECT id, name, pricetopay FROM persons")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var persons []models.Person
	for rows.Next() {
		var person models.Person
		if err := rows.Scan(&person.ID, &person.Name, &person.Pricetopay); err != nil {
			return nil, err
		}
		persons = append(persons, person)
	}
	return persons, nil
}

func CreateRoute(route models.Route) error {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec("INSERT INTO routes (name, start, end, distance, price) VALUES (?, ?, ?, ?, ?)",route.Name, route.StartName, route.EndName, route.Distance, route.Price)
	if err != nil {
		return err
	}
	return nil
}

func DeleteRoute(id int64) error {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec("DELETE FROM routes WHERE id = ?", id)
	if err != nil {
		return err
	}
	return nil
	return nil
}


func GetAllRoutes() ([]models.Route, error) {
	db, err := sql.Open("sqlite3", "./rideShare.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query("SELECT * FROM routes")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var routes []models.Route
	for rows.Next() {
		var route models.Route
		if err := rows.Scan(&route.ID, &route.Name, &route.StartName,&route.EndName,&route.Distance,&route.Price); err != nil {
			return nil, err
		}
		routes = append(routes, route)
	}
	return routes, nil
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
		"description" TEXT,
		"personID" TEXT
	);`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		panic(err)
	}

	createTableSQL = `CREATE TABLE IF NOT EXISTS persons (
		"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,		
		"name" TEXT,
		"pricetopay" INTEGER
	);`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		panic(err)
	}

	createTableSQL = `CREATE TABLE IF NOT EXISTS routes (
		"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,		
		"name" TEXT,
		"start" TEXT,
		"end" TEXT,
		"distance" TEXT,
		"price" INTEGER
	);`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		panic(err)
	}
}
