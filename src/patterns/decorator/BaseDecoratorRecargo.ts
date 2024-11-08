import { CalculadoraPrecio } from './CalculadoraPrecio';
import { Asiento } from '../../models/Asiento';

export abstract class BaseDecoratorRecargo extends CalculadoraPrecio {
    protected wrapee: CalculadoraPrecio;

    constructor(wrapee: CalculadoraPrecio) {
        super();
        this.wrapee = wrapee;
    }

    abstract calcularPrecio(asiento: Asiento): number;
}
