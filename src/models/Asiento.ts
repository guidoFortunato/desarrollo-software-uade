import { CalculadoraPrecio } from "./CalculadoraPrecio";
import { Funcion } from "./Funcion";



export  class Asiento {

    private _numeroAsiento: number;
    private _estado: boolean;
    private _funcion: Funcion;


    constructor(

        numeroAsiento: number,
        estado: boolean,
        funcion: Funcion,
        
    ) {
      
       
        this._numeroAsiento = numeroAsiento;
       
        this._estado = estado;
        this._funcion = funcion;
      
    }

    // Getter y setter para funcion
    get getFuncion(): Funcion {
        return this._funcion;
    }

    set setFuncion(funcion: Funcion) {
        this._funcion = funcion;
    }

    
  

   abstract set setPrecioBase(precioBase: number) {
      
    // Getter y setter para ubicacion


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

    abstract getCosto():number;
    //abstract calcularPrecio(): number;
}

