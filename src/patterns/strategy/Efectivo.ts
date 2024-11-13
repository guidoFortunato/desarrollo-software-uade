import { ReactElement, createElement } from 'react';
import { IFormularioPago, DatosCliente, DatosTarjeta } from './IFormularioPago';
import { FormularioEfectivoComponent } from './components/FormularioEfectivoComponent';

export class Efectivo implements IFormularioPago {
  getFormularioComponent() {
    return FormularioEfectivoComponent;
  }

  calcularMonto(total: number): number {
    return total; // Sin recargo
  }

  renderizarFormulario(onSubmit: (datosCliente: DatosCliente) => void): ReactElement {
    return createElement(FormularioEfectivoComponent, { onSubmit });
  }

  async procesarPago(datosCliente: DatosCliente): Promise<string> {
    const numeroCompra = Math.floor(Math.random() * 1000000);
    return `Compra #${numeroCompra} registrada. Por favor, acérquese a la boletería del teatro para realizar el pago y retirar sus entradas.`;
  }
}
