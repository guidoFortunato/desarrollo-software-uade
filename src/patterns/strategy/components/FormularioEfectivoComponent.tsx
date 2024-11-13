import { useState } from 'react';
import { DatosCliente } from '../IFormularioPago';
import { DatosClienteComponent } from './DatosClienteComponent';

interface FormularioEfectivoComponentProps {
  onSubmit: (datosCliente: DatosCliente) => void;
}

export const FormularioEfectivoComponent = ({ onSubmit }: FormularioEfectivoComponentProps) => {
  return (
    <div className="space-y-3">
      <DatosClienteComponent onChange={onSubmit} />
      
      <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md">
        <p className="text-sm">
          Una vez confirmada la reserva, deberá acercarse a la boletería del teatro para realizar el pago y retirar sus entradas.
        </p>
      </div>
    </div>
  );
}; 