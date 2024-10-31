import React, { useState, useEffect } from 'react';

type Person = {
    id: string;
    name: string;
    pricetopay: number;
};

const Modal: React.FC<{ onEventsChange: (events: any[]) => void }> = ({ onEventsChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [eventsArr, setEventsArr] = useState<any[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<string>('');
    const [people, setPeople] = useState<Person[]>([]); // Lista de pessoas

    function getPessoas() {
        fetch('http://localhost:9000/getPersons', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setPeople(data);
        })
        .catch(error => console.error('Error fetching persons:', error));
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            //call ao backend /getPersons
            getPessoas();
        }
    }, []);

    useEffect(() => {
        onEventsChange(eventsArr);
    }, [eventsArr, onEventsChange]);

   

    const callBackEndAddEvento = async (title:string, start:string, end:string,desc:string, person_id:string) => {
        const response = await fetch('http://localhost:9000/createEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                Start: start,
                End: end,
                Description:desc,
                Title: title,
                PersonID: person_id
            }),
        });
 
        if (response.ok) {
            console.log('Request successful');
        } else {
            console.error('Request failed');
        }
    };

    const handleAddEvent = () => {
        const eventDate = (document.getElementById('eventDate') as HTMLInputElement).value;
        const eventDateEnd = (document.getElementById('eventDateEnd') as HTMLInputElement).value;

        if (selectedPerson) {
            let personManhosa = selectedPerson.split("//&&//")
            callBackEndAddEvento(personManhosa[0],eventDate, (eventDateEnd === '') ? eventDate : eventDateEnd, "Não pago", personManhosa[1]); // voltar aqui id

        } else {
            console.log('Person selection is required');
        }
    };

    async function deleteFOdase( id:string)
    {
        const response = await fetch(`http://localhost:9000/deleteEvent?ID=${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Request successful');
            getPessoas();
        } else {
            console.error('Request failed');
        }
    }

    const handleDeleteEvent = () => {
        const eventDate = (document.getElementById('eventDate') as HTMLInputElement).value;
        let eventDateEnd = (document.getElementById('eventDateEnd') as HTMLInputElement).value;

        eventDateEnd = (eventDateEnd === '') ? eventDate : eventDateEnd;

        let personManhosa = selectedPerson.split("//&&//")
        let pessoaNameToDelete = personManhosa[0];
        fetch('http://localhost:9000/getEvents', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            for(let i =0;i < data.length; i++)
            {
                if(data[i].start == eventDate && data[i].end == eventDateEnd && data[i].title == pessoaNameToDelete){
                    deleteFOdase(data[i].id);
                }
            }
        })
        .catch(error => console.error('Error fetching persons:', error));
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="corGeral text-white p-2 rounded">
                + Gerir Eventos
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded">
                        <h2 className="text-2xl font-bold mb-4">Gerir Pessoas</h2>
                        <div className="mb-4">
                            <select
                                id="personSelect"
                                value={selectedPerson}
                                onChange={(e) => setSelectedPerson(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
                            >
                                <option value="">Selecione uma pessoa</option>
                                {people && people.map(person => (
                                    <option key={person.id} value={person.name + "//&&//" + person.id}>{person.name}</option>
                                ))}
                            </select>
                            <input
                                type="date"
                                id="eventDate"
                                placeholder="Data inicio"
                                className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
                            />
                            <input
                                type="date"
                                id="eventDateEnd"
                                placeholder="Data fim"
                                className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
                            />
                        </div>
                        <button onClick={handleAddEvent} className="bg-blue-500 text-white p-2 rounded">
                            Adicionar
                        </button>
                        <button onClick={handleDeleteEvent} className="bg-red-500 text-white p-2 rounded ml-2">
                            Apagar
                        </button>
                        <button onClick={() => setIsOpen(false)} className="bg-gray-500 text-white p-2 rounded ml-2">
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
