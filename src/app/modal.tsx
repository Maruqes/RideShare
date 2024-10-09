import React, { useState, useEffect } from 'react';

const Modal: React.FC<{ onEventsChange: (events: any[]) => void }> = ({ onEventsChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [eventsArr, setEventsArr] = useState<any[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<string>('');
    const [people, setPeople] = useState<string[]>([]); // Lista de pessoas

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedEvents = JSON.parse(localStorage.getItem("ourEvents") || "[]");
            setEventsArr(storedEvents);

            const storedPeople = JSON.parse(localStorage.getItem("pessoas") || "[]");
            setPeople(storedPeople);
        }
    }, []);

    useEffect(() => {
        onEventsChange(eventsArr);
    }, [eventsArr, onEventsChange]);

    const handleAddEvent = () => {
        const eventDate = (document.getElementById('eventDate') as HTMLInputElement).value;
        const eventDateEnd = (document.getElementById('eventDateEnd') as HTMLInputElement).value;

        if (selectedPerson) {
            const newEvent = {
                id: (eventsArr.length + 1).toString(),
                title: selectedPerson,
                start: eventDate,
                end: (eventDateEnd === '') ? eventDate : eventDateEnd,
                description: "O marque veio",
                people: [selectedPerson]
            };

            const updatedEvents = [...eventsArr, newEvent];
            setEventsArr(updatedEvents);
            localStorage.setItem("ourEvents", JSON.stringify(updatedEvents));
            setIsOpen(false);
            window.location.reload();
        } else {
            console.log('Person selection is required');
        }
    };

    const handleDeleteEvent = () => {
        const eventDate = (document.getElementById('eventDate') as HTMLInputElement).value;
        const eventDateEnd = (document.getElementById('eventDateEnd') as HTMLInputElement).value;

        const updatedEvents = eventsArr.filter(event => !(event.start === eventDate && event.end === eventDateEnd));
        setEventsArr(updatedEvents);
        localStorage.setItem("ourEvents", JSON.stringify(updatedEvents));
        setIsOpen(false); 
        window.location.reload(); 
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="corGeral text-white p-2 rounded">
                + Gerir Eventos
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded">
                        <div className="mb-4">
                            <select
                                id="personSelect"
                                value={selectedPerson}
                                onChange={(e) => setSelectedPerson(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
                            >
                                <option value="">Selecione uma pessoa</option>
                                {people.map(person => (
                                    <option key={person} value={person}>{person}</option>
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
