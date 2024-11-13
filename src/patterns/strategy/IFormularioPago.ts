import { ComponentType } from 'react';

export interface DatosCliente {
  nombre: string;
  email: string;
}

export interface DatosTarjeta {
  numero: string;
  nombreTitular: string;
  fechaVencimiento: string;
  ccv: string;
}

export interface IFormularioPago {
  procesarPago(datosCliente: DatosCliente, datosPago?: DatosTarjeta): Promise<string>;
  calcularMonto(total: number): number;
  getFormularioComponent(): ComponentType<{
    onSubmit: (datosCliente: DatosCliente, datosPago?: DatosTarjeta) => void;
    cuotas?: number;
  }>;
} 