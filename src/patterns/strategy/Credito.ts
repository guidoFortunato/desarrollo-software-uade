import { IEstrategiaMedioPago } from './IEstrategiaMedioPago';
import { CantidadCuotasException } from '../../excepciones/CantidadCuotasException';

export class Credito implements IEstrategiaMedioPago {
    private cuotas: number;

    constructor(cuotas: number) {
        this.cuotas = cuotas;
    }

    public calcularMonto(total: number): number {
        let recargo: number;
        switch (this.cuotas) {
            case 1:
                recargo = 0;
                break;
            case 2:
                recargo = 0.06;
                break;
            case 3:
                recargo = 0.12;
                break;
            case 6:
                recargo = 0.25;
                break;
            default:
                throw new CantidadCuotasException();
        }
        return total * (1 + recargo);
    }
}
