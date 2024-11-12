import { useState } from 'react';
import { Asiento } from '../../models/Asiento';
import { MedioPago } from '../../models/MedioPago';

const Carrito = () => {
  const [asientos, setAsientos] = useState<Asiento[]>([]);
  const [medioPago, setMedioPago] = useState<string>('');
  const [cuotas, setCuotas] = useState<number>(1);

  const finalizarCompra = () => {
    // Implementar lógica de finalización de compra
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Carrito de Compras</h2>
      
      <div className="mb-4">
        {asientos.map((asiento) => (
          <div key={asiento.getNumeroAsiento} className="border p-2 mb-2">
            <p>Función: {asiento.getFuncion.nombre}</p>
            <p>Ubicación: {asiento.getUbicacion.nombre}</p>
            <p>Precio: ${asiento.getPrecioBase}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="text-xl mb-2">Método de Pago</h3>
        <select
          value={medioPago}
          onChange={(e) => setMedioPago(e.target.value)}
          className="border p-2"
        >
          <option value="">Seleccione método de pago</option>
          <option value="efectivo">Efectivo</option>
          <option value="debito">Débito</option>
          <option value="credito">Crédito</option>
        </select>

        {medioPago === 'credito' && (
          <select
            value={cuotas}
            onChange={(e) => setCuotas(Number(e.target.value))}
            className="border p-2 ml-2"
          >
            <option value="1">1 cuota</option>
            <option value="2">2 cuotas</option>
            <option value="3">3 cuotas</option>
            <option value="6">6 cuotas</option>
          </select>
        )}
      </div>

      <button
        onClick={finalizarCompra}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Finalizar Compra
      </button>
    </div>
  );
};

export default Carrito; 