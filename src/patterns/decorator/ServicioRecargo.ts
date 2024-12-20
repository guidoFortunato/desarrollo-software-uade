import { BaseDecoratorRecargo } from './BaseDecoratorRecargo';
import { Asiento } from '../../models/Asiento';
import { CalculadoraPrecio } from '../../models/CalculadoraPrecio';

export class ServicioRecargo extends BaseDecoratorRecargo {
    constructor(wrapped: CalculadoraPrecio) {
        super(wrapped);
    }

    calcular(asiento: Asiento, precioAcumulado: number): number {
        const precioBase = this.wrapped.calcular(asiento, precioAcumulado);
        const recargoServicio = precioBase * 0.10;
        return precioBase + recargoServicio;
    }
}
