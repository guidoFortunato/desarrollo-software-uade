export class Efectivo implements IEstrategiaMedioPago {
    // private descuento: number;

    // constructor(descuento: number) {
    //     this.descuento = descuento;
    // }

    public calcularMonto(total: number): number {
        return total * 0.9; // Descuento del 10%
    }
}
