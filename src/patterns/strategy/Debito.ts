import { MedioPagoStrategy } from './MedioPagoStrategy';

export class Debito extends MedioPagoStrategy {
    calcularTotal(total: number): number {
        return total;
    }
}
