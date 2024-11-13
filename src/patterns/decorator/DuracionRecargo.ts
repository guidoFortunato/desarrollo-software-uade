import { BaseDecoratorRecargo } from './BaseDecoratorRecargo';
import { Asiento } from '../../models/Asiento';
import { CalculadoraPrecio } from '../../models/CalculadoraPrecio';

export class DuracionRecargo extends BaseDecoratorRecargo {
    constructor(wrapped: CalculadoraPrecio) {
        super(wrapped);
    }

    calcular(asiento: Asiento, precioAcumulado: number): number {
        return this.wrapped.calcular(asiento, precioAcumulado);
    }
}
