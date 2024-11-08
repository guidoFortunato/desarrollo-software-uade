import { MedioPagoStrategy } from './MedioPagoStrategy';

export class Credito extends MedioPagoStrategy {
    cantCuotas: number;
    interes2Cuotas: number;
    interes3Cuotas: number;

    calcularTotal(total: number): number {
        const interes = this.cantCuotas === 2 ? this.interes2Cuotas : this.interes3Cuotas;
        return total + (total * interes);
    }
}
