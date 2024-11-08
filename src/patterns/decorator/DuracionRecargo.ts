import { BaseDecoratorRecargo } from './BaseDecoratorRecargo';
import { Asiento } from '../../models/Asiento';

export class DuracionRecargo extends BaseDecoratorRecargo {
    private duracion: number;

    constructor(wrapee: BaseDecoratorRecargo, duracion: number) {
        super(wrapee);
        this.duracion = duracion;
    }

    calcularPrecio(asiento: Asiento): number {
        const recargoDuracion = this.duracion > 120 ? 30 : 0; // Ejemplo: recargo de $30 si dura más de 120 minutos
        return this.wrapee.calcularPrecio(asiento) + recargoDuracion;
    }
}
