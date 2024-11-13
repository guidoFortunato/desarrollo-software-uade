import { useState, useEffect } from 'react';
import { Asiento } from '../../models';
import ModalPago from './ModalPago';
import { IFormularioPago, DatosCliente, DatosTarjeta } from '../../patterns/strategy/IFormularioPago';
import { DuracionRecargo } from '../../patterns/decorator/DuracionRecargo';
import { UbicacionRecargo } from '../../patterns/decorator/UbicacionRecargo';
import { CreditoRecargo } from '../../patterns/decorator/CreditoRecargo';
import { Teatro } from '../../models/Teatro';

interface CarritoSidebarProps {
  asientos: Asiento[];
  onQuitarAsiento: (funcionId: number, ubicacionId: number) => void;
  onFinalizarCompra: () => void;
  onCancelarCompra: () => void;
  teatro: Teatro;
}

interface UbicacionEnCarrito {
  nombre: string;
  cantidad: number;
  asientos: Asiento[];
}

interface FuncionEnCarrito {
  nombre: string;
  fecha: string;
  hora: string;
  ubicaciones: Record<string, UbicacionEnCarrito>;
}

interface AsientosAgrupados {
  [key: string]: FuncionEnCarrito;
}

const CarritoSidebar = ({ 
  asientos, 
  onQuitarAsiento, 
  onFinalizarCompra,
  onCancelarCompra,
  teatro
}: CarritoSidebarProps) => {
  const [showModal, setShowModal] = useState(false);
  const [metodoPago, setMetodoPago] = useState<string>('');
  const [cuotas, setCuotas] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const calcularTotal = () => {
      return asientos.reduce((sum, asiento) => {
        let precio = asiento.calcularPrecio();
        
        if (metodoPago === 'credito' && cuotas > 1) {
          const creditoRecargo = new CreditoRecargo(asiento.calculadoraPrecio, cuotas);
          precio = creditoRecargo.calcular(asiento, precio);
        }
        
        return sum + precio;
      }, 0);
    };

    const nuevoTotal = calcularTotal();
    setTotal(nuevoTotal);
  }, [asientos, metodoPago, cuotas]);

  const handleMetodoPagoChange = (nuevoMetodo: string) => {
    setMetodoPago(nuevoMetodo);
    setCuotas(1);
  };

  const handleCuotasChange = (nuevasCuotas: number) => {
    setCuotas(nuevasCuotas);
  };

  const handleCompraFinalizada = (
    datosCliente: DatosCliente,
    metodoPago: IFormularioPago,
    datosPago?: DatosTarjeta
  ) => {
    onFinalizarCompra();
    setShowModal(false);
    setMetodoPago('');
    setCuotas(1);
  };

  const handleCloseModal = () => {
    onCancelarCompra();
    setShowModal(false);
    setMetodoPago('');
    setCuotas(1);
  };

  // Modificamos la estructura de datos para mantener los asientos individuales
  const asientosAgrupados = asientos.reduce<AsientosAgrupados>((acc, asiento) => {
    const funcionId = asiento.funcion.id.toString();
    const ubicacionId = asiento.ubicacion.id.toString();

    if (!acc[funcionId]) {
      acc[funcionId] = {
        nombre: asiento.funcion.nombre,
        fecha: asiento.funcion.fecha,
        hora: asiento.funcion.hora,
        ubicaciones: {}
      };
    }

    if (!acc[funcionId].ubicaciones[ubicacionId]) {
      acc[funcionId].ubicaciones[ubicacionId] = {
        nombre: asiento.ubicacion.nombre,
        cantidad: 0,
        asientos: []
      };
    }

    acc[funcionId].ubicaciones[ubicacionId].cantidad++;
    acc[funcionId].ubicaciones[ubicacionId].asientos.push(asiento);

    return acc;
  }, {});

  return (
    <div className="h-full flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">Carrito de Compras</h2>
      
      <div className="flex-1 overflow-y-auto">
        {Object.keys(asientosAgrupados).length === 0 ? (
          <p className="text-gray-500">No hay asientos en el carrito</p>
        ) : (
          <div className="space-y-6 pr-2">
            {Object.entries(asientosAgrupados).map(([funcionId, funcion]) => (
              <div key={funcionId} className="border rounded-lg p-4">
                <div className="font-semibold text-lg text-indigo-800 mb-2">
                  {funcion.nombre}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {funcion.fecha} - {funcion.hora}
                </div>
                
                <div className="space-y-2">
                  {Object.entries(funcion.ubicaciones).map(([ubicacionId, ubicacion]) => {
                    const asiento = ubicacion.asientos[0];
                    let precioUnitario = asiento.calcularPrecio();
                    
                    if (metodoPago === 'credito' && cuotas > 1) {
                      const creditoRecargo = new CreditoRecargo(asiento.calculadoraPrecio, cuotas);
                      precioUnitario = creditoRecargo.calcular(asiento, precioUnitario);
                    }

                    return (
                      <div key={ubicacionId} className="flex justify-between items-center border-t pt-2">
                        <div>
                          <span className="font-medium">{ubicacion.nombre}</span>
                          <span className="text-gray-600"> x{ubicacion.cantidad}</span>
                          <span className="text-green-600 ml-2">${precioUnitario} c/u</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {ubicacion.cantidad} {ubicacion.cantidad === 1 ? 'asiento' : 'asientos'}
                          </span>
                          <button
                            onClick={() => onQuitarAsiento(Number(funcionId), Number(ubicacionId))}
                            className="text-red-500 hover:text-red-700 px-2 py-1"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t pt-4 mt-4 bg-white">
        <div className="flex justify-between mb-4">
          <span className="font-bold">Total:</span>
          <span className="font-bold">${total}</span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          disabled={asientos.length === 0}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Continuar Compra
        </button>
      </div>

      <ModalPago
        isOpen={showModal}
        onClose={handleCloseModal}
        onCompraFinalizada={handleCompraFinalizada}
        total={total}
        onCuotasChange={handleCuotasChange}
        onMetodoPagoChange={handleMetodoPagoChange}
        metodoPago={metodoPago}
        teatro={teatro}
        asientos={asientos}
      />
    </div>
  );
};

export default CarritoSidebar; 