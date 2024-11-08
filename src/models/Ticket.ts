import { MedioPago } from './MedioPago';
import { Asiento } from './Asiento';

export class Ticket {
    medioPago: MedioPago;
    fechaDePago: Date;
    asientos: Asiento[] = [];

    calcularTotal(): number {
        return this.asientos.reduce((total, asiento) => total + asiento.calcularPrecio(), 0);
    }

    agregarAsiento(asiento: Asiento): void {
        this.asientos.push(asiento);
    }

    finalizarCompra(): void {}
}
