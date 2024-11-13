import { BaseDecoratorRecargo } from './BaseDecoratorRecargo';
import { Asiento } from '../../models/Asiento';
import { CalculadoraPrecio } from '../../models/CalculadoraPrecio';

export class UbicacionRecargo extends BaseDecoratorRecargo {
    constructor(wrapped: CalculadoraPrecio) {
        super(wrapped);
    }

    calcular(asiento: Asiento, precioAcumulado: number): number {
        const precioBase = this.wrapped.calcular(asiento, precioAcumulado);
        return precioBase * asiento.ubicacion.recargo;
    }
}
