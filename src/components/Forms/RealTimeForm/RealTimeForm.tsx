import { Button } from "../../Button/Button";
import InputField from "../../Inputs/InputField";

export const RealTimeForm = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-lg mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Formulario
                    </h1>
                    <p className="text-gray-600">
                        Complete los campos a continuación
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                    <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                <span className="text-sm font-medium text-blue-700">
                                    Formulario activo
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* YOUR INPUTS GO HERE */}
                    <div className="space-y-6">
                        {/* 
                            Estructura básica para cada input:
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Campo *
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                                    placeholder="Texto de ejemplo"
                                />
                            </div>
                        */}
                        <div>
                            <InputField
                                label="Titulo"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <Button variant="secondary" size="md">
                            Cancelar
                        </Button>
                        <Button variant="success" size="md">
                            Guardar
                        </Button>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Los campos marcados con * son obligatorios
                    </p>
                </div>
            </div>
        </div>
    );
};