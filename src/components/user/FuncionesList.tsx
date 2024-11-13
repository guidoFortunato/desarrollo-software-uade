import { useState, useEffect } from 'react';
import { Teatro, Funcion, Asiento, CalculadoraPrecio, Ubicacion } from '../../models';
import { DuracionRecargo } from '../../patterns/decorator/DuracionRecargo';
import { UbicacionRecargo } from '../../patterns/decorator/UbicacionRecargo';
import { BaseDecoratorRecargo } from '../../patterns/decorator/BaseDecoratorRecargo';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface FuncionesListProps {
  teatro: Teatro;
  onAgregarAsiento: (asiento: Asiento) => void;
  onQuitarAsiento: (funcionId: number, ubicacionId: number) => void;
  asientosEnCarrito: Asiento[];
}

const FuncionesList = ({ teatro, onAgregarAsiento, onQuitarAsiento, asientosEnCarrito }: FuncionesListProps) => {
  const [selectedFuncion, setSelectedFuncion] = useState<Funcion | null>(null);
  const [funcionesFuturas, setFuncionesFuturas] = useState<Funcion[]>([]);

  useEffect(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const funciones = teatro.getFunciones().filter(funcion => {
      const funcionFecha = funcion.fecha;
      const funcionHora = funcion.hora;

      if (funcionFecha > today) return true;
      
      if (funcionFecha === today) {
        return funcionHora > currentTime;
      }
      
      return false;
    });

    setFuncionesFuturas(funciones);
  }, [teatro]);

  const getAsientosEnUbicacion = (funcion: Funcion, ubicacion: Ubicacion): number => {
    return asientosEnCarrito.filter(a => 
      a.funcion.id === funcion.id && 
      a.ubicacion.id === ubicacion.id
    ).length;
  };

  

  const calcularPrecioAsiento = (funcion: Funcion, ubicacion: Ubicacion): number => {
    // Buscamos un asiento existente de esta ubicación en la función
    const asientoExistente = funcion.asientos.find(a => a.ubicacion.id === ubicacion.id);
    if (asientoExistente) {
      return asientoExistente.calcularPrecio();
    }
    return 0; // O un valor por defecto si no hay asientos
  };

  
  const toggleFuncion = (funcion: Funcion) => {
    setSelectedFuncion(selectedFuncion?.id === funcion.id ? null : funcion);
  };
  const handleAgregarAsientoACarrito = (funcion: Funcion, ubicacion: Ubicacion) => {
    // Obtener todos los asientos de esta ubicación que no estén ocupados
    const asientosDisponibles = funcion.asientos.filter(asiento => 
      asiento.ubicacion.id === ubicacion.id && 
      !asiento.estado &&
      // Verificar que el asiento no esté ya en el carrito
      !asientosEnCarrito.includes(asiento)
    );
    
    // Tomar el primer asiento disponible que no esté en el carrito
    const asientoDisponible = asientosDisponibles[0];
    
    if (asientoDisponible) {
      onAgregarAsiento(asientoDisponible);
    }
  };

    return (
    <div className="h-full flex flex-col">
      <div className="p-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-indigo-900">
          Funciones Disponibles
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 pt-4">
        <div className="grid grid-cols-1 gap-8">
          {funcionesFuturas.map((funcion) => (
            <div key={funcion.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-indigo-800">{funcion.nombre}</h3>
                  <p className="text-gray-600">Fecha: {funcion.fecha}</p>
                  <p className="text-gray-600">Hora: {funcion.hora}</p>
                </div>
                <button
                  onClick={() => toggleFuncion(funcion)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  {selectedFuncion?.id === funcion.id ? 'Ocultar Ubicaciones' : 'Ver Ubicaciones'}
                </button>
              </div>
              
              {selectedFuncion?.id === funcion.id && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {funcion.ubicaciones.map((ubicacion) => {
                    const asientosEnUbicacion = getAsientosEnUbicacion(funcion, ubicacion);
                    const hayAsientosEnCarrito = asientosEnUbicacion > 0;
                    const precio = calcularPrecioAsiento(funcion, ubicacion);

                    return (
                      <div key={ubicacion.id} className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="text-lg font-semibold text-indigo-700 mb-2">
                          {ubicacion.nombre}
                          <span className="text-green-600 ml-2">
                            ${precio}
                          </span>
                        </h4>
                        <div className="space-y-2">
                          <p className="text-gray-600">
                            Asientos disponibles: <span className="font-semibold text-green-600">
                              {funcion.getAsientosDisponibles(ubicacion.id)}
                            </span>
                          </p>

                          <div className="mt-4">
                            {hayAsientosEnCarrito ? (
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold">
                                  {asientosEnUbicacion} asiento{asientosEnUbicacion > 1 ? 's' : ''} en carrito
                                </span>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleAgregarAsientoACarrito(funcion, ubicacion)}
                                    disabled={funcion.getAsientosDisponibles(ubicacion.id) === 0}
                                    className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
                                  >
                                    <PlusIcon className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() => onQuitarAsiento(funcion.id, ubicacion.id)}
                                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                  >
                                    <MinusIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleAgregarAsientoACarrito(funcion, ubicacion)}
                                disabled={funcion.getAsientosDisponibles(ubicacion.id) === 0}
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-400"
                              >
                                Agregar al carrito
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FuncionesList; 