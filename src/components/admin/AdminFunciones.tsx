import { useState } from 'react';
import { Teatro } from '../../models/Teatro';
import { Funcion } from '../../models/Funcion';
import { Ubicacion } from '../../models/Ubicacion';
import NuevaFuncionForm from './NuevaFuncionForm';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

interface AdminFuncionesProps {
  teatro: Teatro;
}

const ubicacionesDisponibles = [
  new Ubicacion(1, "Platea", 100, 100, 0),
  new Ubicacion(2, "Palco Alto", 100, 100, 0),
  new Ubicacion(3, "Palco Bajo", 100, 100, 0),
  new Ubicacion(4, "Cazuela", 100, 100, 0),
  new Ubicacion(5, "Tertulia", 100, 100, 0),
  new Ubicacion(6, "Paraíso", 100, 100, 0)
];

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

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-900">Gestión de Funciones</h2>
        <button
          onClick={() => setShowNewFuncionForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 shadow-md"
        >
          Nueva Función
        </button>
      </div>

      {showNewFuncionForm && (
        <NuevaFuncionForm
          grupos={teatro.getGrupos()}
          ubicaciones={ubicacionesDisponibles}
          onCrear={handleCrearFuncion}
          onCancel={handleCancelar}
          funcionParaCopiar={funcionParaCopiar}
        />
      )}

      <div className="grid grid-cols-1 gap-6">
        {teatro.getFunciones().map((funcion) => (
          <div key={funcion.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 relative">
            <button
              onClick={() => handleCopiarFuncion(funcion)}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
              title="Copiar función"
            >
              <DocumentDuplicateIcon className="h-6 w-6" />
            </button>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-semibold text-indigo-800">{funcion.nombre}</h3>
                <p className="text-gray-600">Fecha: {funcion.fecha}</p>
                <p className="text-gray-600">Hora: {funcion.hora}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Grupo: {funcion.grupo.nombre}</p>
                <p className="text-gray-600">Duración: {funcion.duracion} min</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-xl font-semibold text-indigo-700 mb-3">Ubicaciones:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {funcion.ubicaciones.map((ubicacion) => (
                  <div key={ubicacion.id} className="border rounded-lg p-4 bg-gray-50">
                    <h5 className="font-semibold text-indigo-600 mb-2">{ubicacion.nombre}</h5>
                    <p className="text-gray-600">
                      Disponibles: <span className="font-semibold text-green-600">{ubicacion.asientosDisponibles}</span>
                    </p>
                    <p className="text-gray-600">
                      Ocupados: <span className="font-semibold text-red-600">{ubicacion.asientosOcupados}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFunciones; 