import { Asiento } from "./Asiento";

export abstract class CalculadoraPrecio {
    abstract calcular(asiento: Asiento, precioAcumulado: number): number;
}

export class CalculadoraPrecioBase extends CalculadoraPrecio {
    calcular(asiento: Asiento, precioAcumulado: number): number {
        return asiento.funcion.duracion / 2;
    }
}