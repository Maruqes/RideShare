import { get } from 'http';
import React, { useState, useEffect } from 'react';

interface Event {
    id: string;
    name: string;
}

type Person = {
    id: string;
    name: string;
    pricetopay: number;
};

interface ModalPessoasProps {}

const ModalPessoas: React.FC<ModalPessoasProps> = () => {
    const [pessoas, setPessoas] = useState<string[]>([]);
    const [pessoasArr, setPessoasArr] = useState<Person[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    
    function getPessoas() {
        fetch('http://localhost:9000/getPersons', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setPessoasArr(data);
        })
        .catch(error => console.error('Error fetching persons:', error));
    }
    useEffect(() => {
        getPessoas();
    }, []);

    


    useEffect(() => {
        const storedPessoas = localStorage.getItem('pessoas');
        if (storedPessoas) {
            setPessoas(JSON.parse(storedPessoas));
        }
    }, []);

    const handleCreatePerson = async () => {
        const response = await fetch('http://localhost:9000/createPerson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                Name: inputValue,
                pricetopay: '0',
            }),
        });

        if (response.ok) {
            console.log('Request successful');
            getPessoas();
        } else {
            console.error('Request failed');
        }
    };

    const handleRemovePessoa = async (id: string) => { //deletePerson?ID=4
        const response = await fetch(`http://localhost:9000/deletePerson?ID=${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Request successful');
            getPessoas();
        } else {
            console.error('Request failed');
        }
    }


    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="corGeral text-white p-2 rounded">
                + Gerir Pessoas
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
                        <h2 className="text-2xl font-bold mb-4">Gerir Pessoas</h2>
                        <div className="input-group mb-4 flex">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Adicionar pessoa"
                                className="w-full p-2 border border-gray-300 rounded mb-2 text-black flex-grow"
                            />
                            <button onClick={handleCreatePerson} className="bg-blue-500 text-white p-2 rounded ml-2">
                                Adicionar
                            </button>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            <ul>
                               {pessoasArr && pessoasArr.map((person, index) => (
                                    <li key={index} className="flex justify-between items-center mb-2">
                                        {person.name}
                                        <button onClick={() => handleRemovePessoa(person.id)} className="bg-red-500 text-white p-2 rounded">
                                            Apagar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="bg-gray-500 text-white p-2 rounded mt-4">
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalPessoas;
