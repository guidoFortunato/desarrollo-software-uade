import React, { useState, useEffect } from 'react';
import { DatosCliente, DatosTarjeta, IFormularioPago } from '../../patterns/strategy/IFormularioPago';
import { Efectivo } from '../../patterns/strategy/Efectivo';
import { Debito } from '../../patterns/strategy/Debito';
import { Credito } from '../../patterns/strategy/Credito';
import { Teatro } from '../../models/Teatro';
import { Cliente } from '../../models/Cliente';
import { Compra } from '../../models/Compra';
import { Asiento } from '../../models/Asiento';
import { MedioPago } from '../../models/MedioPago';
import { IEstrategiaMedioPago } from '../../patterns/strategy/IEstrategiaMedioPago';

interface ModalPagoProps {
  isOpen: boolean;
  onClose: () => void;
  onCompraFinalizada: (datosCliente: DatosCliente, metodoPago: IFormularioPago, datosPago?: DatosTarjeta) => void;
  total: number;
  onCuotasChange: (cuotas: number) => void;
  onMetodoPagoChange: (metodoPago: string) => void;
  metodoPago: string;
  teatro: Teatro;
  asientos: Asiento[];
}

const ModalPago = ({ 
  isOpen, 
  onClose, 
  onCompraFinalizada, 
  total,
  onCuotasChange,
  onMetodoPagoChange,
  metodoPago,
  teatro,
  asientos
}: ModalPagoProps) => {
  const [cuotas, setCuotas] = useState<number>(1);
  const [estrategiaPago, setEstrategiaPago] = useState<IFormularioPago | null>(null);
  const [formularioCompleto, setFormularioCompleto] = useState<boolean>(false);
  const [datosCompletados, setDatosCompletados] = useState<{
    datosCliente?: DatosCliente;
    datosPago?: DatosTarjeta;
  }>({});
  const [mensajeCompra, setMensajeCompra] = useState<string>('');
  const [procesandoCompra, setProcesandoCompra] = useState(false);

  const handleCuotasChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevasCuotas = Number(event.target.value);
    setCuotas(nuevasCuotas);
    onCuotasChange(nuevasCuotas);
    if (metodoPago === 'credito') {
      setEstrategiaPago(new Credito(nuevasCuotas));
    }
  };

  const handleMetodoPagoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevoMetodo = event.target.value;
    onMetodoPagoChange(nuevoMetodo);
    setFormularioCompleto(false);
    setDatosCompletados({});
    
    switch (nuevoMetodo) {
      case 'efectivo':
        const efectivo = new Efectivo();
        setEstrategiaPago(efectivo);
        setCuotas(1);
        onCuotasChange(1);
        break;
      case 'debito':
        setEstrategiaPago(new Debito());
        setCuotas(1);
        onCuotasChange(1);
        break;
      case 'credito':
        setEstrategiaPago(new Credito(cuotas));
        break;
      default:
        setEstrategiaPago(null);
    }
  };

  const handleSubmit = async () => {
    if (datosCompletados.datosCliente && estrategiaPago) {
      setProcesandoCompra(true);
      try {
        const mensajeResultado = await estrategiaPago.procesarPago(
          datosCompletados.datosCliente,
          datosCompletados.datosPago
        );
        setMensajeCompra(mensajeResultado);
        
        const datosCliente = datosCompletados.datosCliente;
        
        if (datosCliente && estrategiaPago) {
          let cliente = teatro.buscarClientePorEmail(datosCliente.email);
          if (!cliente) {
            cliente = new Cliente(datosCliente.nombre, datosCliente.email);
            teatro.registrarCliente(cliente);
          }

          const medioPago = new MedioPago(
            estrategiaPago as IEstrategiaMedioPago,
            metodoPago
          );

          const compraId = Date.now();
          const nuevaCompra = new Compra(
            compraId,
            asientos,
            medioPago,
            datosCliente,
            total
          );
          cliente.agregarCompra(nuevaCompra);

          setTimeout(() => {
            onCompraFinalizada(datosCliente, estrategiaPago, datosCompletados.datosPago);
            onClose();
            setProcesandoCompra(false);
            setMensajeCompra('');
          }, 3000);
        }
      } catch (error) {
        setMensajeCompra(error instanceof Error ? error.message : 'Error al procesar el pago');
        setProcesandoCompra(false);
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setCuotas(1);
      setEstrategiaPago(null);
      setFormularioCompleto(false);
      setDatosCompletados({});
    }
  }, [isOpen]);

  const getBotonText = () => {
    if (procesandoCompra) return 'Procesando...';
    if (metodoPago === 'efectivo') return 'Confirmar Reserva';
    return 'Realizar Pago';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Finalizar Compra</h2>
        </div>
        
        {mensajeCompra ? (
          <div className="p-6 flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-green-600 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">¡Compra realizada con éxito!</p>
              <p className="text-gray-600">{mensajeCompra}</p>
            </div>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto flex-1">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Método de Pago
                </label>
                <select
                  value={metodoPago}
                  onChange={handleMetodoPagoChange}
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Seleccione método de pago</option>
                  <option value="efectivo">Efectivo</option>
                  <option value="debito">Débito</option>
                  <option value="credito">Crédito</option>
                </select>
              </div>

              {metodoPago === 'credito' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cuotas
                  </label>
                  <select
                    value={cuotas}
                    onChange={handleCuotasChange}
                    className="w-full border rounded-md p-2"
                  >
                    <option value={1}>1 cuota</option>
                    <option value={2}>2 cuotas</option>
                    <option value={3}>3 cuotas</option>
                    <option value={6}>6 cuotas</option>
                  </select>
                </div>
              )}

              {estrategiaPago && (
                <div className="mt-4">
                  {React.createElement(estrategiaPago.getFormularioComponent(), {
                    onSubmit: (datosCliente, datosPago) => {
                      setDatosCompletados({ datosCliente, datosPago });
                      setFormularioCompleto(true);
                    },
                    cuotas: metodoPago === 'credito' ? cuotas : undefined
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="p-6 border-t bg-gray-50">
          <div className="mb-4">
            <p className="text-lg font-bold">Total: ${total}</p>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
              disabled={procesandoCompra}
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={!metodoPago || !formularioCompleto || procesandoCompra}
              className={`px-4 py-2 rounded-md text-white disabled:bg-gray-400 disabled:cursor-not-allowed ${
                metodoPago === 'efectivo' ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {getBotonText()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPago; 