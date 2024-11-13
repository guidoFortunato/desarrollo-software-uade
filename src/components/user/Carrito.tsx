import { useState, useEffect } from 'react';
import { Asiento } from '../../models/Asiento';
import { CreditoRecargo } from '../../patterns/decorator/CreditoRecargo';
import { DatosCliente, DatosTarjeta, IFormularioPago } from '../../patterns/strategy/IFormularioPago';

const Carrito = () => {
  const [asientos, setAsientos] = useState<Asiento[]>([]);
  const [medioPago, setMedioPago] = useState<string>('');
  const [cuotas, setCuotas] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

  const calcularPrecioTotal = (): number => {
    return asientos.reduce((total, asiento) => {
      let precio = asiento.calcularPrecio();
      
      if (medioPago === 'credito' && cuotas > 1) {
        const creditoRecargo = new CreditoRecargo(asiento.calculadoraPrecio, cuotas);
        precio = creditoRecargo.calcular(asiento, precio);
      }
      
      return total + precio;
    }, 0);
  };

  useEffect(() => {
    const nuevoTotal = calcularPrecioTotal();
    setTotal(nuevoTotal);
  }, [asientos, medioPago, cuotas]);

  const handleMetodoPagoChange = (nuevoMetodo: string) => {
    setMedioPago(nuevoMetodo);
    if (nuevoMetodo !== 'credito') {
      setCuotas(1);
    }
  };

  const handleCuotasChange = (nuevasCuotas: number) => {
    setCuotas(nuevasCuotas);
  };

  const handleCompraFinalizada = (
    datosCliente: DatosCliente,
    metodoPago: IFormularioPago,
    datosPago?: DatosTarjeta
  ) => {
    console.log('Compra finalizada', { datosCliente, metodoPago, datosPago });
    setShowModal(false);
    setMedioPago('');
    setCuotas(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Carrito de Compras</h2>
      
      <div className="mb-4">
        {asientos.map((asiento) => {
          let precioUnitario = asiento.calcularPrecio();
          if (medioPago === 'credito' && cuotas > 1) {
            const creditoRecargo = new CreditoRecargo(asiento.calculadoraPrecio, cuotas);
            precioUnitario = creditoRecargo.calcular(asiento, precioUnitario);
          }

          return (
            <div key={asiento.numeroAsiento} className="border p-2 mb-2">
              <p>Función: {asiento.funcion.nombre}</p>
              <p>Ubicación: {asiento.ubicacion.nombre}</p>
              <p>Precio: ${precioUnitario}</p>
            </div>
          );
        })}
      </div>

      <div className="mb-4">
        <h3 className="text-xl mb-2">Total: ${total}</h3>
        <h3 className="text-xl mb-2">Método de Pago</h3>
        <select
          value={medioPago}
          onChange={(e) => handleMetodoPagoChange(e.target.value)}
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
            onChange={(e) => handleCuotasChange(Number(e.target.value))}
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
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Finalizar Compra
      </button>
    </div>
  );
};

export default Carrito; 