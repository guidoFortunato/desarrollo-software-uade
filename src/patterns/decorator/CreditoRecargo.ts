import { BaseDecoratorRecargo } from './BaseDecoratorRecargo';
import { Asiento } from '../../models/Asiento';
import { CalculadoraPrecio } from '../../models/CalculadoraPrecio';

export class CreditoRecargo extends BaseDecoratorRecargo {
    private cantidadCuotas: number;

    constructor(calculadoraBase: CalculadoraPrecio, cantidadCuotas: number) {
        super(calculadoraBase);
        this.cantidadCuotas = cantidadCuotas;
    }

    calcular(asiento: Asiento, precioAcumulado: number): number {
        const precioBase = this.wrapped.calcular(asiento, precioAcumulado);
        const recargoServicio = precioBase * 0.08 * this.cantidadCuotas;
        return precioBase + recargoServicio;
    }
} 