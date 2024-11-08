import { Ubicacion } from './Ubicacion';
import { CalculadoraPrecio } from '../patterns/decorator/CalculadoraPrecio';

export abstract class Asiento {
    precioBase: number;
    ubicacion: Ubicacion;
    numeroAsiento: number;
    estado: boolean;
    calculadora: CalculadoraPrecio;

    abstract calcularPrecio(): number;
}
