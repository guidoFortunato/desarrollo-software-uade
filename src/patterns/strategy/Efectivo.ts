import { IEstrategiaMedioPago } from './IEstrategiaMedioPago';

export class Efectivo implements IEstrategiaMedioPago {
    private readonly DESCUENTO = 0.10; // 10% de descuento

    public calcularMonto(total: number): number {
        return total * (1 - this.DESCUENTO);
    }
}
