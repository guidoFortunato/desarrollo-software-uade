import { Cliente } from './Cliente';  // Asume que Cliente es una clase exportada
import { Grupo } from './Grupo';  // Asume que Grupo es una clase exportada
import { Funcion } from './Funcion';  // Asume que Funcion es una clase exportada
import {UbicacionesHandler} from './UbicacionesHandler';
import { Asiento } from './Asiento';
import { Platea } from './asientos/Platea';
export class TeatroColonial {
    private direccion: string;
    private clientes: Cliente[];
    private funciones! :Funcion[];
    private asientos!:Asiento[];
    private ubicacionesHandler!: UbicacionesHandler;

    constructor(direccion: string) {
        this.direccion = direccion;
        this.clientes = [];
        this.ubicacionesHandler= new UbicacionesHandler();

        console.log("bienvenidos al treato Colonial");
    }


    public limitarUbicaciones(plateas:number,palco:number){

        this.ubicacionesHandler.setPlateasNumber(plateas);
        this.ubicacionesHandler.setPalcosAltosNumber(palco)

    }

        // hay q revisar bien los if o usar case pero desconozco typescript
    public crearAsiento(ubicacion:string){

       

        if (ubicacion==="platea"){
            this.asientos.push(new Platea(true));
                
               
    
         }
         if (ubicacion==="palco") {
                //funcion.getAsientos.push(new Palco(true));
                
         } else {
                console.log("elegi una ubicacion correcta");
                
            }


           
        

       
    }


    public crearFuncion(fecha:Date,hora:string,grupo:Grupo,duracion:number,nombre:string){

        let funcion=new Funcion(fecha,hora,grupo,duracion,this.asientos.length,nombre)
        this.agregarFuncion(funcion);
    }

    private obtenerFuncion(nombreFuncion: string): Funcion | undefined {
        for (const funcion of this.funciones) {
            if (funcion.getNombre === nombreFuncion) { 
                return funcion;
            }
        }
        console.log("No se encontró la función con el número especificado.");
        return undefined; // Devuelve undefined si no se encuentra la función
  
 





    public comprarFunciones(funciones:Funcion[]){
    for(const funcion of funciones){
        this.comprarFuncion(funcion)
    }

        
    }


    public comprarFuncion(funcion:Funcion,numerosAsiento:number){

        funcion.getAsientos[numerosAsiento-1]=false;
        

   

    }


    public get getDireccion(): string {
        return this.direccion;
    }

    public set setDireccion(direccion: string) {
        this.direccion = direccion;
    }

    public get getClientes(): Cliente[] {
        return this.clientes;
    }

    public set setClientes(clientes: Cliente[]) {
        this.clientes = clientes;
    }

    private agregarFuncion(funcion: Funcion): void {
        this.funciones.push(funcion);
    }

    public asignarFechaFuncion(funcion: Funcion, fecha: Date): void {
        // Implementación
    }


    public asignarHoraFuncion(funcion: Funcion, hora: Date): void {
        // Implementación
    }

    public asignarGrupoFuncion(funcion: Funcion, grupo: Grupo): void {
        // Implementación
    }

    public registrarCliente(cliente: Cliente): void {
        // Implementación
    }

    public mostrarFuncionesDisponibles():void{


    }


}
