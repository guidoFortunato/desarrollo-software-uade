import { useState } from 'react';
import { Teatro } from '../../models/Teatro';
import { Funcion } from '../../models/Funcion';
import { Ubicacion } from '../../models/Ubicacion';
import NuevaFuncionForm from './NuevaFuncionForm';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { Asiento } from '../../models/Asiento';
import { CalculadoraPrecio } from '../../models/CalculadoraPrecio';

interface AdminFuncionesProps {
  teatro: Teatro;
}

const AdminFunciones = ({ teatro }: AdminFuncionesProps) => {
  const [showNewFuncionForm, setShowNewFuncionForm] = useState(false);
  const [funcionParaCopiar, setFuncionParaCopiar] = useState<Funcion | null>(null);

  const handleCrearFuncion = (nuevaFuncion: Funcion) => {
    teatro.agregarFuncion(nuevaFuncion);
    setShowNewFuncionForm(false);
    setFuncionParaCopiar(null);
  };

  const handleCopiarFuncion = (funcion: Funcion) => {
    setFuncionParaCopiar(funcion);
    setShowNewFuncionForm(true);
  };

  const handleCancelar = () => {
    setShowNewFuncionForm(false);
    setFuncionParaCopiar(null);
  };

  const calcularPrecioAsiento = (funcion: Funcion, ubicacion: Ubicacion): number => {
    const asientoTemp = funcion.asientos.find(asiento => asiento.ubicacion.id === ubicacion.id);
    return asientoTemp?.calculadoraPrecio.calcular(asientoTemp, 0) || 0;
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <div className="bg-gray-50 p-8 shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-indigo-900">Gestión de Funciones</h2>
          <button
            onClick={() => showNewFuncionForm ? handleCancelar() : setShowNewFuncionForm(true)}
            className={`px-6 py-3 rounded-lg transition-colors duration-200 shadow-md text-white
              ${showNewFuncionForm 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
              }`}
          >
            {showNewFuncionForm ? 'Cancelar' : 'Nueva Función'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {showNewFuncionForm && (
            <NuevaFuncionForm
              grupos={teatro.getGrupos()}
              ubicaciones={teatro.getUbicaciones()}
              onCrear={handleCrearFuncion}
              onCancel={handleCancelar}
              funcionParaCopiar={funcionParaCopiar}
            />
          )}

          <div className="grid grid-cols-1 gap-6">
            {teatro.getFunciones().map((funcion) => (
              <div key={funcion.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-semibold text-indigo-800">{funcion.nombre}</h3>
                    <button
                      onClick={() => handleCopiarFuncion(funcion)}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      title="Copiar función"
                    >
                      <DocumentDuplicateIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Fecha: {funcion.fecha}</p>
                    <p className="text-gray-600">Hora: {funcion.hora}</p>
                    <p className="text-gray-600">Grupo: {funcion.grupo.nombre}</p>
                    <p className="text-gray-600">Duración: {funcion.duracion} min</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-xl font-semibold text-indigo-700 mb-3">Ubicaciones:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {funcion.ubicaciones.map((ubicacion) => (
                      <div key={ubicacion.id} className="border rounded-lg p-4 bg-gray-50">
                        <h5 className="font-semibold text-indigo-600 mb-2">
                          {ubicacion.nombre}
                          <span className="text-green-600 ml-2">
                            ${calcularPrecioAsiento(funcion, ubicacion)}
                          </span>
                        </h5>
                        <p className="text-gray-600">
                          Disponibles: <span className="font-semibold text-green-600">
                            {funcion.getAsientosDisponibles(ubicacion.id)}
                          </span>
                        </p>
                        <p className="text-gray-600">
                          Ocupados: <span className="font-semibold text-red-600">
                            {funcion.getAsientosOcupados(ubicacion.id)}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFunciones; 