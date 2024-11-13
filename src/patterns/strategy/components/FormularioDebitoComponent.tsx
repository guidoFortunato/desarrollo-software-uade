import { useState, useEffect } from 'react';
import { DatosCliente, DatosTarjeta } from '../IFormularioPago';
import { DatosClienteComponent } from './DatosClienteComponent';

interface FormularioDebitoComponentProps {
  onSubmit: (datosCliente: DatosCliente, datosTarjeta: DatosTarjeta) => void;
}

export const FormularioDebitoComponent = ({ onSubmit }: FormularioDebitoComponentProps) => {
  const [datosCliente, setDatosCliente] = useState<DatosCliente | null>(null);
  const [datosTarjeta, setDatosTarjeta] = useState<DatosTarjeta>({
    numero: '',
    nombreTitular: '',
    fechaVencimiento: '',
    ccv: ''
  });

  useEffect(() => {
    if (datosCliente && datosTarjeta.numero && datosTarjeta.fechaVencimiento && datosTarjeta.ccv) {
      onSubmit(datosCliente, datosTarjeta);
    }
  }, [datosCliente, datosTarjeta, onSubmit]);

  return (
    <div className="space-y-4">
      <DatosClienteComponent onChange={setDatosCliente} />
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de tarjeta
          </label>
          <input
            type="text"
            value={datosTarjeta.numero}
            onChange={(e) => setDatosTarjeta({ ...datosTarjeta, numero: e.target.value })}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del titular
          </label>
          <input
            type="text"
            value={datosTarjeta.nombreTitular}
            onChange={(e) => setDatosTarjeta({ ...datosTarjeta, nombreTitular: e.target.value })}
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vencimiento (MM/AA)
            </label>
            <input
              type="text"
              value={datosTarjeta.fechaVencimiento}
              onChange={(e) => setDatosTarjeta({ ...datosTarjeta, fechaVencimiento: e.target.value })}
              className="w-full border rounded-md p-2"
              placeholder="MM/AA"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CCV
            </label>
            <input
              type="text"
              value={datosTarjeta.ccv}
              onChange={(e) => setDatosTarjeta({ ...datosTarjeta, ccv: e.target.value })}
              className="w-full border rounded-md p-2"
              maxLength={4}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 