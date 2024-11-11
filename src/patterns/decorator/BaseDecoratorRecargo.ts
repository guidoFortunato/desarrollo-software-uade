import { Asiento } from "../../models/Asiento";
import { CalculadoraPrecio } from "../../models/CalculadoraPrecio";

export class BaseDecoratorRecargo extends CalculadoraPrecio {
    private wrapee: CalculadoraPrecio;

    constructor(wrapee: CalculadoraPrecio) {
        super();
        this.wrapee = wrapee;
    }

    protected getWrapee(): CalculadoraPrecio {
        return this.wrapee;
    }

    calcularPrecio(asiento: Asiento, precioAcumulado: number): number {
        return this.wrapee.calcularPrecio(asiento, precioAcumulado);
    }
}
