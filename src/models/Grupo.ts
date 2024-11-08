import { Actor } from "./Actor";

export class Grupo {

  private nombre: string;
  private actores: Actor[];

  constructor(nombre: string, actores: Actor[]) {
    this.nombre = nombre;
    this.actores = actores;
  }

  get getNombre(): string {
    return this.nombre;
  }

  set setNombre(nombre: string) {
    this.nombre = nombre;
  }
  
  get getActores(): Actor[] {
    return this.actores;
  }
  
  set setActores(actores: Actor[]) {
    this.actores = actores;
  }
}
