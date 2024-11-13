
import { Funcion } from "./Funcion";
import { BaseDecoratorRecargo } from "../patterns/decorator/BaseDecoratorRecargo";


export  abstract class Asiento {

    protected static _numeroAsientoContador: number;
    
    
    protected _numeroAsiento: number;

    protected _funciones! :Funcion[];
   

    constructor( ) {
        this._numeroAsiento = Asiento._numeroAsientoContador +1;
        
       
    }

    // Getter y setter para funcion
    

    

   abstract set setPrecioBase(precioBase: number);
      
    


    // Getter y setter para numeroAsiento
    get getNumeroAsiento(): number {
        return this._numeroAsiento;
    }

    set setNumeroAsiento(numeroAsiento: number) {
        this._numeroAsiento = numeroAsiento;
    }

    // Getter y setter para estado
    

    

    // Getter y setter para calculadora
    

    set setFuncion(funcion:Funcion){

        this._funciones.push(funcion);
    }



    // Método abstracto calcularPrecio

    abstract get getCosto():number;
    //abstract calcularPrecio(): number;
}

