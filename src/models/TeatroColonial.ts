import { Cliente } from './Cliente';  // Asume que Cliente es una clase exportada
import { Grupo } from './Grupo';  // Asume que Grupo es una clase exportada
import { Funcion } from './Funcion';  // Asume que Funcion es una clase exportada

export class TeatroColonial {
    private direccion: string;
    private clientes: Cliente[];
    private funciones! :Funcion[];

    constructor(direccion: string) {
        this.direccion = direccion;
        this.clientes = [];

        console.log("bienvenidos al treato Colonial");
    }

    public cargarDiasDisponibles(dias: Date[]): void {
        // Implementación
    }

    public cargarGrupos(grupos: Grupo[]): void {
        // Implementación
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

    public agregarFuncion(funcion: Funcion): void {
        // Implementación
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
}
