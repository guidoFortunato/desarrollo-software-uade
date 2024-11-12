import { useState } from 'react';
import { Asiento } from '../../models/Asiento';
import { MedioPago } from '../../models/MedioPago';

interface Compra {
  id: number;
  fecha: string;
  asientos: Asiento[];
  medioPago: MedioPago;
  total: number;
}

const AdminCompras = () => {
  const [compras, setCompras] = useState<Compra[]>([]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Historial de Compras</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {compras.map((compra) => (
          <div key={compra.id} className="border p-4">
            <p>Fecha: {compra.fecha}</p>
            <p>Método de pago: {compra.medioPago.getTipo}</p>
            <p>Total: ${compra.total}</p>
            
            <div className="mt-2">
              <h4>Asientos:</h4>
              {compra.asientos.map((asiento) => (
                <div key={asiento.getNumeroAsiento} className="ml-4">
                  <p>Función: {asiento.getFuncion.nombre}</p>
                  <p>Ubicación: {asiento.getUbicacion.nombre}</p>
                  <p>Número: {asiento.getNumeroAsiento}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCompras; 