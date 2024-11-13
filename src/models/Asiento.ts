import { Ubicacion } from './Ubicacion';
import { Funcion } from './Funcion';
import { CalculadoraPrecio, CalculadoraPrecioBase } from './CalculadoraPrecio';

export class Asiento {
    private _id: number;
    private _estado: boolean;
    private _ubicacion: Ubicacion;
    private _funcion: Funcion;
    private _calculadoraPrecio: CalculadoraPrecio;

    constructor(
        id: number,
        estado: boolean,
        ubicacion: Ubicacion,
        funcion: Funcion
    ) {
        this._id = id;
        this._estado = estado;
        this._ubicacion = ubicacion;
        this._funcion = funcion;
        this._calculadoraPrecio = new CalculadoraPrecioBase();
    }

    get calculadoraPrecio(): CalculadoraPrecio {
        return this._calculadoraPrecio;
    }

    setCalculadoraPrecio(calculadora: CalculadoraPrecio) {
        this._calculadoraPrecio = calculadora;
    }

    calcularPrecio(): number {
        return this._calculadoraPrecio.calcular(this, 0);
    }

    get ubicacion(): Ubicacion {
        return this._ubicacion;
    }

    get funcion(): Funcion {
        return this._funcion;
    }

    get estado(): boolean {
        return this._estado;
    }

    get numeroAsiento(): number {
        return this._id;
    }
    ocupar() {
        this._estado = true;
    }
    liberar() {
        this._estado = false;
    }
}

