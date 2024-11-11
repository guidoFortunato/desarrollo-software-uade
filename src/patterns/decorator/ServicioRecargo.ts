import { Asiento } from "../../models/Asiento";
import { CalculadoraPrecio } from "../../models/CalculadoraPrecio";
import { BaseDecoratorRecargo } from "./BaseDecoratorRecargo";

export class ServicioRecargo extends BaseDecoratorRecargo {
    constructor(wrapee: CalculadoraPrecio) {
        super(wrapee);
    }

    // calcularPrecio(asiento: Asiento, precioAcumulado: number): number {
    //     return this.wrapee.calcularPrecio(asiento, precioAcumulado) + 5.0; // Ejemplo de recargo por servicio
    // }
    calcularPrecio(asiento: Asiento, precioAcumulado: number): number {
        // return this.getWrapee.calcularPrecio(asiento, precioAcumulado) + 5.0;
        return this.getWrapee().calcularPrecio(asiento, precioAcumulado) 
    }
}
