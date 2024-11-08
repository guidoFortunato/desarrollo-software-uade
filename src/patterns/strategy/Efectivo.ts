import { MedioPagoStrategy } from './MedioPagoStrategy';

export class Efectivo extends MedioPagoStrategy {
    descuento: number;

    calcularTotal(total: number): number {
        return total - (total * this.descuento);
    }
}
