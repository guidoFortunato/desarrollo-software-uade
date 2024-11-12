import { Funcion } from './Funcion';
import { Grupo } from './Grupo';

export class Teatro {
    private funciones: Funcion[];
    private grupos: Grupo[];
    private direccion: string;

    constructor(direccion: string) {
        this.funciones = [];
        this.grupos = [];
        this.direccion = direccion;
    }

    public agregarFuncion(funcion: Funcion): void {
        this.funciones.push(funcion);
    }

    public getFunciones(): Funcion[] {
        return this.funciones;
    }

    public agregarGrupo(grupo: Grupo): void {
        this.grupos.push(grupo);
    }

    public getGrupos(): Grupo[] {
        return this.grupos;
    }

    public getDireccion(): string {
        return this.direccion;
    }
} 