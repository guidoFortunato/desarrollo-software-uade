import { Asiento } from "../Asiento";
import { Funcion } from "../Funcion";
export class Platea extends Asiento{
    private cantidad : number;
    private valor :number;

    private static contador:number; 

    


    
  
    constructor(numeroAsiento: number, estado: boolean, funcion: Funcion, cantidad: number) {
      super(numeroAsiento,estado, funcion);
      this.cantidad = cantidad;
      this.valor= 200;
      Platea.contador ++;
  }

  




  public costo(){

    return get



  }

}