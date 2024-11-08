import { MedioPago } from './MedioPago';  // Asume que MedioPago es una clase exportada
import { Asiento } from './Asiento';  // Asume que Asiento es una clase exportada

export class Ticket {
    private medioPago: MedioPago;
    private fechaDePago: Date;
    private asientos: Asiento[];

    constructor(medioPago: MedioPago, fechaDePago: Date, asientos: Asiento[]) {
        this.medioPago = medioPago;
        this.fechaDePago = fechaDePago;
        this.asientos = asientos;
    }

    public calcularTotal(): number {
        // Implementación
        return 0.0;
    }

    public agregarAsiento(asiento: Asiento): void {
        // Implementación
    }

    public finalizarCompra(): void {
        // Implementación
    }

}
