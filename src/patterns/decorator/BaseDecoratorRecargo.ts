import { Asiento } from "../../models/Asiento";
import { CalculadoraPrecio } from "../../models/CalculadoraPrecio";

export abstract class BaseDecoratorRecargo extends CalculadoraPrecio {
    protected wrapee: CalculadoraPrecio;

    constructor(wrapee: CalculadoraPrecio) {
        super();
        this.wrapee = wrapee;
    }

    calcularPrecio(asiento: Asiento, precioAcumulado: number): number {
        return this.wrapee.calcularPrecio(asiento, precioAcumulado);
    }
}
