export class Ubicacion {
    private _id: number;
    private _nombre: string;
    private _cantidadMaxima: number;
    private _recargo: number;

    constructor(
        id: number,
        nombre: string, 
        cantidadMaxima: number,
        recargo: number
    ) {
        this._id = id;
        this._nombre = nombre;
        this._cantidadMaxima = cantidadMaxima;
        this._recargo = recargo;
    }

    get id(): number {
        return this._id;
    }

    get nombre(): string {
        return this._nombre;
    }

    get cantidadMaxima(): number {
        return this._cantidadMaxima;
    }

    get recargo(): number {
        return this._recargo;
    }
}
