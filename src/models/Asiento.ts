import { CalculadoraPrecio } from './CalculadoraPrecio';
import { Funcion } from './Funcion';
import { Ubicacion } from './Ubicacion';

export class Asiento {
    private _precioBase: number;
    private _ubicacion: Ubicacion;
    private _numeroAsiento: number;
    private _estado: boolean;
    private _calculadora: CalculadoraPrecio;
    private _funcion: Funcion;

    constructor(
        precioBase: number,
        ubicacion: Ubicacion,
        numeroAsiento: number,
        calculadora: CalculadoraPrecio,
        estado: boolean,
        funcion: Funcion
    ) {
        this._precioBase = precioBase;
        this._ubicacion = ubicacion;
        this._numeroAsiento = numeroAsiento;
        this._calculadora = calculadora;
        this._estado = estado;
        this._funcion = funcion;
    }

    // Getters
    get getPrecioBase(): number {
        return this._precioBase;
    }

    get getUbicacion(): Ubicacion {
        return this._ubicacion;
    }

    get getNumeroAsiento(): number {
        return this._numeroAsiento;
    }

    get isEstado(): boolean {
        return this._estado;
    }

    get getCalculadora(): CalculadoraPrecio {
        return this._calculadora;
    }

    get getFuncion(): Funcion {
        return this._funcion;
    }

    // Setters
    set setPrecioBase(precioBase: number) {
        this._precioBase = precioBase;
    }

    set setUbicacion(ubicacion: Ubicacion) {
        this._ubicacion = ubicacion;
    }

    set setNumeroAsiento(numeroAsiento: number) {
        this._numeroAsiento = numeroAsiento;
    }

    set setEstado(estado: boolean) {
        this._estado = estado;
    }

    set setCalculadora(calculadora: CalculadoraPrecio) {
        this._calculadora = calculadora;
    }

    set setFuncion(funcion: Funcion) {
        this._funcion = funcion;
    }

    // Método para calcular el precio final del asiento
    calcularPrecio(): number {
        return this._calculadora.calcularPrecio(this, 0);
    }

    // Método para marcar el asiento como ocupado
    ocupar(): void {
        this._estado = true;
        this._ubicacion.ocuparAsiento();
    }

    // Método para liberar el asiento
    liberar(): void {
        this._estado = false;
        this._ubicacion.liberarAsiento();
    }
}

