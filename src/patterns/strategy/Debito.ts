import { IEstrategiaMedioPago } from './IEstrategiaMedioPago';

export class Debito implements IEstrategiaMedioPago {
    public calcularMonto(total: number): number {
        return total;
    }
}
