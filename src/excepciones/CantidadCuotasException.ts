export class CantidadCuotasException extends Error {
    constructor() {
        super('Cantidad de cuotas inválida');
        this.name = 'CantidadCuotasException';
    }
}
