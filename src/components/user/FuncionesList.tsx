import { useState, useEffect } from 'react';
import { Funcion, Ubicacion } from '../../types';

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

const FuncionesList = () => {
  const [selectedFuncion, setSelectedFuncion] = useState<Funcion | null>(null);
  const [funciones, setFunciones] = useState<Funcion[]>([]);

  useEffect(() => {
    setFunciones(funcionesIniciales);
  }, []);

  const agregarAlCarrito = (funcionId: number, ubicacionId: number) => {
    // Implementar lógica para agregar al carrito
    alert(`Asiento agregado al carrito - Función: ${funcionId}, Ubicación: ${ubicacionId}`);
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-indigo-900">Funciones Disponibles</h2>
      <div className="grid grid-cols-1 gap-8">
        {funciones.map((funcion) => (
          <div key={funcion.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl font-semibold text-indigo-800">{funcion.nombre}</h3>
                <p className="text-gray-600">Fecha: {funcion.fecha}</p>
                <p className="text-gray-600">Hora: {funcion.hora}</p>
              </div>
              <button
                onClick={() => setSelectedFuncion(funcion)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                {selectedFuncion?.id === funcion.id ? 'Ocultar Ubicaciones' : 'Ver Ubicaciones'}
              </button>
            </div>
            
            {selectedFuncion?.id === funcion.id && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {funcion.ubicaciones.map((ubicacion) => (
                  <div key={ubicacion.id} className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="text-lg font-semibold text-indigo-700 mb-2">{ubicacion.nombre}</h4>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        Asientos disponibles: <span className="font-semibold text-green-600">{ubicacion.asientosDisponibles}</span>
                      </p>
                      <p className="text-gray-600">
                        Asientos ocupados: <span className="font-semibold text-red-600">{ubicacion.asientosOcupados}</span>
                      </p>
                      <button
                        onClick={() => agregarAlCarrito(funcion.id, ubicacion.id)}
                        className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        disabled={ubicacion.asientosDisponibles === 0}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuncionesList; 