import { BaseDecoratorRecargo } from './BaseDecoratorRecargo';
import { Asiento } from '../../models/Asiento';

export class ServicioRecargo extends BaseDecoratorRecargo {
    calcularPrecio(asiento: Asiento): number {
        return this.wrapee.calcularPrecio(asiento) + 20;
    }
}
