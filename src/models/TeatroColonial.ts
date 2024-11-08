import { Cliente } from "./Cliente";
import { Funcion } from "./Funcion";
import { Grupo } from "./Grupo";

export class TeatroColonial {
  direccion: string;

  constructor(direccion: string) {
    this.direccion = direccion;
  }

  cargaDiasDisponibles(dias: Date[]): void {}


  agregarFuncion(funcion: Funcion): void {}


  registrarFechaFuncion(funcion: Funcion, fecha: Date): void {}


  asignarGrupo(funcion: Funcion, grupo: Grupo): void {}


  registrarCliente(cliente: Cliente): void {}
}
