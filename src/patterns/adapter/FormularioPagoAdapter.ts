import { IEstrategiaMedioPago } from '../strategy/IEstrategiaMedioPago';
import { IFormularioPago } from '../strategy/IFormularioPago';

export class FormularioPagoAdapter implements IEstrategiaMedioPago {
    private formularioPago: IFormularioPago;

    constructor(formularioPago: IFormularioPago) {
        this.formularioPago = formularioPago;
    }

    calcularMonto(total: number): number {
        // Aquí podemos implementar la lógica específica para cada tipo de pago
        // Por ejemplo, para crédito podríamos calcular intereses
        return total;
    }

    getFormularioPago(): IFormularioPago {
        return this.formularioPago;
    }
} 