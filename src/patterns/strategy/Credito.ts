import { IFormularioPago, DatosCliente, DatosTarjeta } from './IFormularioPago';
import { FormularioCreditoComponent } from './components/FormularioCreditoComponent';
import { CreditoRecargo } from '../decorator/CreditoRecargo';
import { CalculadoraPrecioBase } from '../../models/CalculadoraPrecio';
import { ComponentType } from 'react';

export class Credito implements IFormularioPago {
  private cuotas: number;

  constructor(cuotas: number = 1) {
    this.cuotas = cuotas;
  }

  getFormularioComponent(): ComponentType<{
    onSubmit: (datosCliente: DatosCliente, datosPago?: DatosTarjeta) => void;
    cuotas?: number;
  }> {
    return FormularioCreditoComponent;
  }

  calcularMonto(total: number): number {
    if (this.cuotas > 1) {
      const calculadoraBase = new CalculadoraPrecioBase();
      const creditoRecargo = new CreditoRecargo(calculadoraBase, this.cuotas);
      return creditoRecargo.calcular({ duracion: 0 } as any, total);
    }
    return total;
  }

  async procesarPago(datosCliente: DatosCliente, datosPago?: DatosTarjeta): Promise<string> {
    if (!datosPago) throw new Error('Se requieren datos de tarjeta para pago con crédito');
    const recargo = this.calcularMonto(100) - 100;
    return `Pago procesado con tarjeta de crédito en ${this.cuotas} cuotas con ${recargo}% de recargo`;
  }

  getCuotas(): number {
    return this.cuotas;
  }
}
