import { ReactElement, createElement } from 'react';
import { IFormularioPago, DatosCliente, DatosTarjeta } from './IFormularioPago';
import { FormularioDebitoComponent } from './components/FormularioDebitoComponent';

export class Debito implements IFormularioPago {
  getFormularioComponent() {
    return FormularioDebitoComponent;
  }

  calcularMonto(total: number): number {
    return total; // Sin recargo
  }

  async procesarPago(datosCliente: DatosCliente, datosPago?: DatosTarjeta): Promise<string> {
    if (!datosPago) throw new Error('Se requieren datos de tarjeta para pago con débito');
    return `Pago procesado con tarjeta de débito`;
  }
}
