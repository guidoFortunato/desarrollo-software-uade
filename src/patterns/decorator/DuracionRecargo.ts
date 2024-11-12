
import { Asiento } from "../../models/Asiento";
import { CalculadoraPrecio } from "../../models/CalculadoraPrecio";
import { BaseDecoratorRecargo } from "./BaseDecoratorRecargo";

export class DuracionRecargo extends BaseDecoratorRecargo {

private asiento :Asiento;
    
private valor :number;
   
    constructor(valor:number,asiento:Asiento){
        super();
        this.valor=valor;
        this.asiento=asiento;
    }

   public  get costo(){

        return this.valor+this.asiento.getCosto;
       }


}
