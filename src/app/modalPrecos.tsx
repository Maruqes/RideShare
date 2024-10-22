import React, { useState } from 'react';

interface ModalPrecosProps {
    eventsArr: any[];
    ana: number;
    rafaEscola: number;
    rafaResi: number;
    jame: number;
}

const ModalPrecos: React.FC<ModalPrecosProps> = ({ eventsArr, ana, rafaEscola, rafaResi, jame }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button 
                className="corGeral text-white py-2 px-4 rounded" 
                onClick={handleShow}
            >
                Despesas
            </button>

            {show && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                            <div className="bg-white px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-2xl font-bold mb-4">
                                            Despesas
                                        </h3>
                                        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-lg font-semibold text-gray-700">Marques:</span>
                                                <span className="text-xl font-bold text-gray-900">{((((eventsArr.length - 1) - ana - rafaEscola - rafaResi - jame ) * 1.50) - 33).toFixed(2)}€</span>
                                            </div>
                                            {ana !== 0 && (
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-lg font-semibold text-gray-700">Ana:</span>
                                                    <span className="text-xl font-bold text-gray-900">{((ana) - 4).toFixed(2)}€</span>
                                                </div>
                                            )}
                                            {rafaEscola !== 0 && (
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-lg font-semibold text-gray-700">Rafa Escola:</span>
                                                    <span className="text-xl font-bold text-gray-900">{(rafaEscola*0.11).toFixed(2)}€</span>
                                                </div>
                                            )}
                                            {rafaResi !== 0 && (
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-lg font-semibold text-gray-700">Rafa Resi:</span>
                                                    <span className="text-xl font-bold text-gray-900">{(rafaResi*0.16).toFixed(2)}€</span>
                                                </div>
                                            )}
                                            {jame !== 0 && (
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-lg font-semibold text-gray-700">Jame:</span>
                                                    <span className="text-xl font-bold text-gray-900">{(jame*0.78).toFixed(2)}€</span> /* valor padrao 0.78€ */
                                                </div>
                                            )}
                                            <hr className="my-4"/>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-semibold text-gray-700">Total (Ana e Marques):</span>
                                                <span className="text-xl font-bold text-gray-900">{(((((eventsArr.length - ana - rafaEscola - rafaResi - jame) - 1) * 1.50) + ana) - 33 - 4).toFixed(2)}€</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-semibold text-gray-700">Total Rafa:</span>
                                                <span className="text-xl font-bold text-gray-900">{((rafaEscola * 0.11) + (rafaResi * 0.16)).toFixed(2)}€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button 
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm" 
                                    onClick={handleClose}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalPrecos;
