import { BaseDecoratorRecargo } from './BaseDecoratorRecargo';
import { Asiento } from '../../models/Asiento';
import { CalculadoraPrecio } from '../../models/CalculadoraPrecio';

export class PromocionRecargo extends BaseDecoratorRecargo {
    constructor(wrapped: CalculadoraPrecio) {
        super(wrapped);
    }

    calcular(asiento: Asiento, precioAcumulado: number): number {
        const precioBase = this.wrapped.calcular(asiento, precioAcumulado);
        const descuento = precioBase * 0.25;
        return precioBase - descuento;
    }
}

