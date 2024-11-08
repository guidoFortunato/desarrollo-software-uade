import { CalculadoraPrecio } from "./CalculadoraPrecio";
import { Funcion } from "./Funcion";
import { Ubicacion } from "./Ubicacion";


export abstract class Asiento {
    private _precioBase: number;
    private _ubicacion: Ubicacion;
    private _numeroAsiento: number;
    private _estado: boolean;
    private _calculadora: CalculadoraPrecio;
    private _funcion: Funcion;
    private _ubicacionesHabilitadas: Ubicacion[];

    constructor(
        precioBase: number,
        ubicacion: Ubicacion,
        numeroAsiento: number,
        calculadora: CalculadoraPrecio,
        estado: boolean,
        funcion: Funcion,
        ubicacionesHabilitadas: Ubicacion[]
    ) {
        this._precioBase = precioBase;
        this._ubicacion = ubicacion;
        this._numeroAsiento = numeroAsiento;
        this._calculadora = calculadora;
        this._estado = estado;
        this._funcion = funcion;
        this._ubicacionesHabilitadas = ubicacionesHabilitadas;
    }

    // Getter y setter para funcion
    get getFuncion(): Funcion {
        return this._funcion;
    }

    set setFuncion(funcion: Funcion) {
        this._funcion = funcion;
    }

    // Getter y setter para precioBase
    get getPrecioBase(): number {
        return this._precioBase;
    }

    set setPrecioBase(precioBase: number) {
        this._precioBase = precioBase;
    }

    // Getter y setter para ubicacion
    get getUbicacion(): Ubicacion {
        return this._ubicacion;
    }

    set setUbicacion(ubicacion: Ubicacion) {
        this._ubicacion = ubicacion;
    }

    // Getter y setter para numeroAsiento
    get getNumeroAsiento(): number {
        return this._numeroAsiento;
    }

    set setNumeroAsiento(numeroAsiento: number) {
        this._numeroAsiento = numeroAsiento;
    }

    // Getter y setter para estado
    get isEstado(): boolean {
        return this._estado;
    }

    set setEstado(estado: boolean) {
        this._estado = estado;
    }

    // Getter y setter para calculadora
    get getCalculadora(): CalculadoraPrecio {
        return this._calculadora;
    }

    set setCalculadora(calculadora: CalculadoraPrecio) {
        this._calculadora = calculadora;
    }

    // Método abstracto calcularPrecio
    abstract calcularPrecio(): number;
}

