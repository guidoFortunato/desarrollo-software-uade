import { MedioPago } from '../../models/MedioPago';

export class MedioPagoStrategy implements MedioPago {
    tipo: string;

    calcularTotal(total: number): number {
        return total;
    }
}
