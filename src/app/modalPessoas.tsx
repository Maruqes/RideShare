import React, { useState, useEffect } from 'react';

interface Event {
    id: string;
    name: string;
}

interface ModalPessoasProps {
    eventsArr: Event[];
}

const ModalPessoas: React.FC<ModalPessoasProps> = ({ eventsArr }) => {
    const [pessoas, setPessoas] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const storedPessoas = localStorage.getItem('pessoas');
        if (storedPessoas) {
            setPessoas(JSON.parse(storedPessoas));
        }
    }, []);

    const handleAddPessoa = () => {
        if (inputValue.trim()) {
            const newPessoas = [...pessoas, inputValue.trim()];
            setPessoas(newPessoas);
            localStorage.setItem('pessoas', JSON.stringify(newPessoas));
            setInputValue('');
        }
    };

    const handleRemovePessoa = (index: number) => {
        const newPessoas = pessoas.filter((_, i) => i !== index);
        setPessoas(newPessoas);
        localStorage.setItem('pessoas', JSON.stringify(newPessoas));
    };

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
                            <button onClick={handleAddPessoa} className="bg-blue-500 text-white p-2 rounded ml-2">
                                Adicionar
                            </button>
                        </div>
                        <ul>
                            {pessoas.map((pessoa, index) => (
                                <li key={index} className="flex justify-between items-center mb-2">
                                    {pessoa}
                                    <button onClick={() => handleRemovePessoa(index)} className="bg-red-500 text-white p-2 rounded">
                                        Apagar
                                    </button>
                                </li>
                            ))}
                        </ul>
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
