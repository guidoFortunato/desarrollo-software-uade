export class Credito implements IEstrategiaMedioPago {
    private cuotas: number;

    constructor(cuotas: number) {
        this.cuotas = cuotas;
    }

    public calcularMonto(total: number): number {
        let recargo = 0;
        switch (this.cuotas) {
            case 2:
                recargo = 0.06;
                break;
            case 3:
                recargo = 0.12;
                break;
            case 6:
                recargo = 0.20;
                break;
            default:
                throw new CantidadCuotasException();
        }
        return total * (1 + recargo);
    }
}
