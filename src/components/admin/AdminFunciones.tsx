import { useState, useEffect } from 'react';
import { Funcion } from '../../types';

const funcionesIniciales: Funcion[] = [
  {
    id: 1,
    nombre: "Romeo y Julieta",
    fecha: "2024-04-15",
    hora: "20:00",
    duracion: 120,
    grupo: {
      id: 1,
      nombre: "Compañía Shakespeare",
      actores: []
    },
    ubicaciones: [
      { id: 1, nombre: "Platea", cantidadMaxima: 100, asientosDisponibles: 85, asientosOcupados: 15 },
      { id: 2, nombre: "Palco Alto", cantidadMaxima: 100, asientosDisponibles: 92, asientosOcupados: 8 },
      { id: 3, nombre: "Palco Bajo", cantidadMaxima: 100, asientosDisponibles: 76, asientosOcupados: 24 },
      { id: 4, nombre: "Cazuela", cantidadMaxima: 100, asientosDisponibles: 100, asientosOcupados: 0 },
      { id: 5, nombre: "Tertulia", cantidadMaxima: 100, asientosDisponibles: 95, asientosOcupados: 5 },
      { id: 6, nombre: "Paraíso", cantidadMaxima: 100, asientosDisponibles: 88, asientosOcupados: 12 }
    ]
  }
];

const AdminFunciones = () => {
  const [showNewFuncionForm, setShowNewFuncionForm] = useState(false);
  const [funciones, setFunciones] = useState<Funcion[]>([]);

  useEffect(() => {
    setFunciones(funcionesIniciales);
  }, []);

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
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Nueva Función</h3>
          {/* Formulario de nueva función */}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {funciones.map((funcion) => (
          <div key={funcion.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
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