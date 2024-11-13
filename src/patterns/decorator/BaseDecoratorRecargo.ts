import { Asiento } from '../../models/Asiento';
import { CalculadoraPrecio } from '../../models/CalculadoraPrecio';

export abstract class BaseDecoratorRecargo extends CalculadoraPrecio {
    protected wrapped: CalculadoraPrecio;

    constructor(wrapped: CalculadoraPrecio) {
        super();
        this.wrapped = wrapped;
    }

    abstract calcular(asiento: Asiento, precioAcumulado: number): number;
}
