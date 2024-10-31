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
            <button onClick={() => setIsOpen(true)} className="bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 px-6 rounded-full shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-300 transform hover:scale-105">
                + Gerir Eventos
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Gerir Eventos</h2>
                        <div className="mb-6">
                            <label htmlFor="personSelect" className="block text-sm font-medium text-gray-700 mb-2">Selecione uma pessoa</label>
                            <select
                                id="personSelect"
                                value={selectedPerson}
                                onChange={(e) => setSelectedPerson(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Selecione uma pessoa</option>
                                {people && people.map(person => (
                                    <option key={person.id} value={person.name + "//&&//" + person.id}>{person.name}</option>
                                ))}
                            </select>
                            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">Data início</label>
                            <input
                                type="date"
                                id="eventDate"
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <label htmlFor="eventDateEnd" className="block text-sm font-medium text-gray-700 mb-2">Data fim</label>
                            <input
                                type="date"
                                id="eventDateEnd"
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button onClick={handleAddEvent} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Adicionar
                            </button>
                            <button onClick={handleDeleteEvent} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                                Apagar
                            </button>
                            <button onClick={() => setIsOpen(false)} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
