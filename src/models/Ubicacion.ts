export class Ubicacion {
    private _id: number;
    private _nombre: string;
    private _cantidadMaxima: number;
    private _asientosDisponibles: number;
    private _asientosOcupados: number;

    constructor(
        id: number,
        nombre: string, 
        cantidadMaxima: number,
        asientosDisponibles: number = cantidadMaxima,
        asientosOcupados: number = 0
    ) {
        this._id = id;
        this._nombre = nombre;
        this._cantidadMaxima = cantidadMaxima;
        this._asientosDisponibles = asientosDisponibles;
        this._asientosOcupados = asientosOcupados;
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

    get asientosDisponibles(): number {
        return this._asientosDisponibles;
    }

    set asientosDisponibles(value: number) {
        this._asientosDisponibles = value;
    }

    get asientosOcupados(): number {
        return this._asientosOcupados;
    }

    set asientosOcupados(value: number) {
        this._asientosOcupados = value;
    }

    // Métodos para gestionar asientos
    ocuparAsiento(): void {
        if (this._asientosDisponibles > 0) {
            this._asientosDisponibles--;
            this._asientosOcupados++;
        }
    }

    liberarAsiento(): void {
        if (this._asientosOcupados > 0) {
            this._asientosOcupados--;
            this._asientosDisponibles++;
        }
    }
}
