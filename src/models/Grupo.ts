import { Actor } from "./Actor";

export class Grupo {
  private _id: number;
  private _nombre: string;
  private _actores: Actor[];

  constructor(id: number, nombre: string, actores: Actor[]) {
    this._id = id;
    this._nombre = nombre;
    this._actores = actores;
  }

  get id(): number {
    return this._id;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(nombre: string) {
    this._nombre = nombre;
  }
  
  get actores(): Actor[] {
    return this._actores;
  }
  
  set actores(actores: Actor[]) {
    this._actores = actores;
  }
}
