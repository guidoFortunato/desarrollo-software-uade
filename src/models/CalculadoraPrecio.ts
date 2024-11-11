import { Asiento } from "./Asiento";


export class CalculadoraPrecio {
    calcularPrecio(asiento: Asiento, precioAcumulado: number): number {
        // return asiento.getPrecioBase + asiento.getUbicacion.getRecargo();
        return asiento.getPrecioBase + precioAcumulado;
    }
}
