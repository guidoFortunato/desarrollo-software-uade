import { useState, useEffect } from 'react';
import { Teatro } from '../../models/Teatro';
import { Compra } from '../../models/Compra';

interface AdminComprasProps {
  teatro: Teatro;
}

const AdminCompras = ({ teatro }: AdminComprasProps) => {
  const [compras, setCompras] = useState<Compra[]>([]);

  useEffect(() => {
    // Obtener todas las compras de todos los clientes
    const todasLasCompras = teatro.getClientes()
      .flatMap(cliente => cliente.getCompras())
      .sort((a, b) => b.getFecha().getTime() - a.getFecha().getTime()); // Ordenar por fecha descendente
    
    setCompras(todasLasCompras);
  }, [teatro]);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <div className="bg-gray-50 p-8 shadow-md">
        <h2 className="text-3xl font-bold text-indigo-900">Historial de Compras</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 gap-6">
          {compras.map((compra) => (
            <div key={compra.getId()} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-800">
                    Compra #{compra.getId()}
                  </h3>
                  <p className="text-gray-600">
                    Cliente: {compra.getDatosCliente().nombre}
                  </p>
                  <p className="text-gray-600">
                    Email: {compra.getDatosCliente().email}
                  </p>
                  <p className="text-gray-600">
                    Método de pago: {compra.getMetodoPago().getTipo}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">
                    Fecha: {compra.getFecha().toLocaleDateString()}
                  </p>
                  <p className="text-green-600 font-semibold">
                    Total: ${compra.getTotal()}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-semibold text-indigo-700 mb-3">
                  Asientos comprados:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {compra.getAsientos().map((asiento) => (
                    <div key={asiento.numeroAsiento} className="border rounded-lg p-4 bg-gray-50">
                      <p className="font-medium">Función: {asiento.funcion.nombre}</p>
                      <p className="text-gray-600">Fecha: {asiento.funcion.fecha}</p>
                      <p className="text-gray-600">Hora: {asiento.funcion.hora}</p>
                      <p className="text-gray-600">Ubicación: {asiento.ubicacion.nombre}</p>
                      <p className="text-gray-600">Asiento: #{asiento.numeroAsiento}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCompras; 