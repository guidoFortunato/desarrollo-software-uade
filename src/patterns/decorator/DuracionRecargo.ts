
import { Asiento } from "../../models/Asiento";
import { CalculadoraPrecio } from "../../models/CalculadoraPrecio";
import { BaseDecoratorRecargo } from "./BaseDecoratorRecargo";

export class DuracionRecargo extends BaseDecoratorRecargo {

private asiento! :Asiento
    
private valor :number;
   costo(){

    this.asiento.
   }
    constructor(valor:number){
        super();
        this.valor=valor;

    }


setAsiento(asiento :Asiento){

    this.asiento=asiento;
}

}
