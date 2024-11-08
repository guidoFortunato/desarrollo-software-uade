export class Credito implements IEstrategiaMedioPago {
    private cantCuotas: number;
    private interes2Cuotas: number;
    private interes3Cuotas: number;
    private interes6Cuotas: number;

    constructor(cantCuotas: number, interes2Cuotas: number, interes3Cuotas: number, interes6Cuotas: number) {
        this.cantCuotas = cantCuotas;
        this.interes2Cuotas = interes2Cuotas;
        this.interes3Cuotas = interes3Cuotas;
        this.interes6Cuotas = interes6Cuotas;
    }

    public calcularMonto(total: number): number {
        let interesAplicado = 0;

        if (this.cantCuotas === 2) {
            interesAplicado = this.interes2Cuotas;
        } else if (this.cantCuotas === 3) {
            interesAplicado = this.interes3Cuotas;
        } else if (this.cantCuotas === 6) {
            interesAplicado = this.interes6Cuotas;
        } else {
            throw new Error("Cantidad de cuotas no válida");
        }

        return total + (total * interesAplicado / 100);
    }
}
