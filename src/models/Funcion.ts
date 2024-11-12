import { Grupo } from './Grupo';
import { Ubicacion } from './Ubicacion';
import { Asiento } from './Asiento';

export class Funcion {
    private _id: number;
    private _nombre: string;
    private _fecha: Date;
    private _hora: string;
    private _grupo: Grupo;
    private _duracion: number;
    private _ubicaciones: Ubicacion[];
    private _asientos: Asiento[];

    constructor(
        id: number,
        nombre: string,
        fecha: Date,
        hora: string,
        grupo: Grupo,
        duracion: number,
        ubicaciones: Ubicacion[],
        asientos: Asiento[] = []
    ) {
        this._id = id;
        this._nombre = nombre;
        this._fecha = fecha;
        this._hora = hora;
        this._grupo = grupo;
        this._duracion = duracion;
        this._ubicaciones = ubicaciones;
        this._asientos = asientos;
    }

    get id(): number {
        return this._id;
    }

    get nombre(): string {
        return this._nombre;
    }

    get fecha(): string {
        return this._fecha.toISOString().split('T')[0];
    }

    get hora(): string {
        return this._hora;
    }

    get grupo(): Grupo {
        return this._grupo;
    }

    get duracion(): number {
        return this._duracion;
    }

    get ubicaciones(): Ubicacion[] {
        return this._ubicaciones;
    }

    get asientos(): Asiento[] {
        return this._asientos;
    }
}

