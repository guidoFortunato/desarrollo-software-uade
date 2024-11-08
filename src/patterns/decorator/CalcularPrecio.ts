import { Asiento } from '../../models/Asiento';

export abstract class CalculadoraPrecio {
    abstract calcularPrecio(asiento: Asiento): number;
}
