export class MedioPago {
  private estrategiaPago: IEstrategiaMedioPago;
  private tipo: string;

  constructor(estrategiaPago: IEstrategiaMedioPago, tipo: string) {
      this.estrategiaPago = estrategiaPago;
      this.tipo = tipo;
  }

  public calcularTotal(total: number): number {
      return 0.0;
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
