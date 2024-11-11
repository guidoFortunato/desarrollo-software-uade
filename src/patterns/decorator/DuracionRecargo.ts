import { Asiento } from "../../models/Asiento";
import { CalculadoraPrecio } from "../../models/CalculadoraPrecio";
import { BaseDecoratorRecargo } from "./BaseDecoratorRecargo";

export class DuracionRecargo extends BaseDecoratorRecargo {


    constructor(wrapee: CalculadoraPrecio) {
        super(wrapee);

    }

    calcularPrecio(asiento: Asiento, precioAcumulado: number): number {
        // return this.getWrapee.calcularPrecio(asiento, precioAcumulado) + 5.0;
        return this.getWrapee().calcularPrecio(asiento, precioAcumulado) 
    }
}
