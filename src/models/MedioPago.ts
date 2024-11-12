import { IEstrategiaMedioPago } from '../patterns/strategy/IEstrategiaMedioPago';

export class MedioPago {
  private estrategiaPago: IEstrategiaMedioPago;
  private tipo: string;

  constructor(estrategiaPago: IEstrategiaMedioPago, tipo: string) {
      this.estrategiaPago = estrategiaPago;
      this.tipo = tipo;
  }

  public calcularMonto(total: number): number {
      return this.estrategiaPago.calcularMonto(total);
  }

  // Getters y Setters
  get getEstrategiaPago(): IEstrategiaMedioPago {
      return this.estrategiaPago;
  }

  set setEstrategiaPago(estrategiaPago: IEstrategiaMedioPago) {
      this.estrategiaPago = estrategiaPago;
  }

  get getTipo(): string {
      return this.tipo;
  }

  set setTipo(tipo: string) {
      this.tipo = tipo;
  }
}
