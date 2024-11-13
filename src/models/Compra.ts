import { Asiento } from './Asiento';
import { DatosCliente } from '../patterns/strategy/IFormularioPago';
import { MedioPago } from './MedioPago';

export class Compra {
    private id: number;
    private fecha: Date;
    private asientos: Asiento[];
    private metodoPago: MedioPago;
    private datosCliente: DatosCliente;
    private total: number;

    constructor(
        id: number,
        asientos: Asiento[],
        metodoPago: MedioPago,
        datosCliente: DatosCliente,
        total: number
    ) {
        this.id = id;
        this.fecha = new Date();
        this.asientos = asientos;
        this.metodoPago = metodoPago;
        this.datosCliente = datosCliente;
        this.total = total;
    }

    public getId(): number {
        return this.id;
    }

    public getFecha(): Date {
        return this.fecha;
    }

    public getAsientos(): Asiento[] {
        return this.asientos;
    }

    public getMetodoPago(): MedioPago {
        return this.metodoPago;
    }

    public getDatosCliente(): DatosCliente {
        return this.datosCliente;
    }

    public getTotal(): number {
        return this.total;
    }
} 