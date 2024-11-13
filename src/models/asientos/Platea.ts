import { Asiento } from "../Asiento";
import { Funcion } from "../Funcion";
export class Platea extends Asiento{
   
    private valor :number;

    private static contador:number; 

    private nombre!:string;

    

    


    
  
    constructor( estado: boolean) {
      super(estado);
     
      this.valor= 200;
      Platea.contador ++;
  }





   public set setPrecioBase(precioBase: number) {
      this.valor = precioBase;
  }
  public get getCosto(){

    return this.valor;

  }

 

 
  

}