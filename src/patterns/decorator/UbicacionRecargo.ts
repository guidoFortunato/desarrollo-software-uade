import { BaseDecoratorRecargo } from './BaseDecoratorRecargo';
import { Asiento } from '../../models/Asiento';

export class UbicacionRecargo extends BaseDecoratorRecargo {
    calcularPrecio(asiento: Asiento): number {
        const recargoUbicacion = asiento.ubicacion.nombre === "VIP" ? 50 : 0; // Ejemplo: $50 extra para asientos VIP
        return this.wrapee.calcularPrecio(asiento) + recargoUbicacion;
    }
}
