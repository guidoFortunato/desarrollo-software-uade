const BaseDecoratorRecargo = require('./BaseDecoratorRecargo');
const Asiento = require('../../models/Asiento');


export class PromocionRecargo extends BaseDecoratorRecargo {
    private descuento: number;

    constructor(wrapee: BaseDecoratorRecargo, descuento: number) {
        super(wrapee);
        this.descuento = descuento;
    }

    calcularPrecio(asiento: Asiento): number {
        const precioBase = this.wrapee.calcularPrecio(asiento);
        const descuentoAplicado = precioBase * (this.descuento / 100);
        return precioBase - descuentoAplicado;
    }
}
