import { Asiento } from './Asiento';

export class Ubicacion {
    nombre: string;
    cantidadMaxima: number;
    asientos: Asiento[] = [];

    verificarDisponibilidad(): boolean {
        return true;
    }
}
