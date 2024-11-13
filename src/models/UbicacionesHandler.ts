import { PalcoAlto } from "./asientos/PalcoAlto";

export class UbicacionesHandler{

private plateas!: number;   
private palcoAltos!: number;


    

    constructor(){}
    


   getPlateasNumber(){

    return this.plateas
   } 

   public get getPalcosAltosNumber(){

    return this.palcoAltos
   } 

   public  setPlateasNumber(plateas:number){

    this.plateas=plateas;

   }

   public  setPalcosAltosNumber(palcos:number){

    this.palcoAltos=palcos;

   }
    
}