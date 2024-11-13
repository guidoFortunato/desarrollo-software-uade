import { Funcion } from './Funcion';
import { Grupo } from './Grupo';
import { Ubicacion } from './Ubicacion';
import { Cliente } from './Cliente';
import { Actor } from './Actor';

export class Teatro {
    private nombre: string;
    private funciones: Funcion[];
    private grupos: Grupo[];
    private direccion: string;
    private ubicaciones: Ubicacion[];
    private clientes: Cliente[];
    private actores: Actor[] = [];

    constructor(nombre: string, direccion: string) {
        this.nombre = nombre;
        this.funciones = [];
        this.grupos = [];
        this.direccion = direccion;
        this.ubicaciones = [];
        this.clientes = [];
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

    public getNombre(): string {
        return this.nombre;
    }

    public agregarUbicaciones(ubicaciones: Ubicacion[]): void {
        this.ubicaciones.push(...ubicaciones);
    }

    public getUbicaciones(): Ubicacion[] {
        return this.ubicaciones;
    }

    public registrarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    public getClientes(): Cliente[] {
        return this.clientes;
    }

    public buscarClientePorEmail(email: string): Cliente | undefined {
        return this.clientes.find(cliente => cliente.getEmail() === email);
    }

    public agregarActor(actor: Actor): void {
        this.actores.push(actor);
    }

    public getActores(): Actor[] {
        return this.actores;
    }
} 
