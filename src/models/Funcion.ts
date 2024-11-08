import { Grupo } from './Grupo';
import { Ubicacion } from './Ubicacion';
import { Asiento } from './Asiento';

export class Funcion {
    private fecha: Date;
    private hora: string;
    private grupo: Grupo;
    private duracion: number;
    private ubicacionesHabilitadas: Ubicacion[];
    private asientos: Asiento[];

    constructor(
        fecha: Date,
        hora: string,
        grupo: Grupo,
        duracion: number,
        ubicacionesHabilitadas: Ubicacion[],
        asientos: Asiento[]
    ) {
        this.fecha = fecha;
        this.hora = hora;
        this.grupo = grupo;
        this.duracion = duracion;
        this.ubicacionesHabilitadas = ubicacionesHabilitadas;
        this.asientos = asientos;
    }

    // Métodos privados
    private agregarUbicacionHabilitada(ubicacion: Ubicacion): void {
        // Implementación
    }

    private generarAsientosParaUbicacionesHabilitadas(): void {
        // Implementación
    }

    private obtenerAsientosDisponibles(ubicacion: Ubicacion): Asiento[] | null {
        // Implementación
        return null;
    }

    // Getters y setters
    get getFecha(): Date {
        return this.fecha;
    }

    set setFecha(fecha: Date) {
        this.fecha = fecha;
    }

    get getHora(): string {
        return this.hora;
    }

    set setHora(hora: string) {
        this.hora = hora;
    }

    get getGrupo(): Grupo {
        return this.grupo;
    }

    set setGrupo(grupo: Grupo) {
        this.grupo = grupo;
    }

    get getDuracion(): number {
        return this.duracion;
    }

    set setDuracion(duracion: number) {
        this.duracion = duracion;
    }

    get getUbicacionesHabilitadas(): Ubicacion[] {
        return this.ubicacionesHabilitadas;
    }

    set setUbicacionesHabilitadas(ubicacionesHabilitadas: Ubicacion[]) {
        this.ubicacionesHabilitadas = ubicacionesHabilitadas;
    }

    get getAsientos(): Asiento[] {
        return this.asientos;
    }

    set setAsientos(asientos: Asiento[]) {
        this.asientos = asientos;
    }
}

