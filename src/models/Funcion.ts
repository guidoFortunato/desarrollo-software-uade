import { Grupo } from './Grupo';
import { Ubicacion } from './Ubicacion';
import { Asiento } from './Asiento';

export class Funcion {
    fecha: Date;
    hora: string;
    duracion: number;
    grupo: Grupo;
    ubicacionesHabilitadas: Ubicacion[];
    asientos: Asiento[];

    constructor(fecha: Date, hora: string, duracion: number, grupo: Grupo, ubicacionesHabilitadas: Ubicacion[], asientos: Asiento[]) {
        this.fecha = fecha;
        this.hora = hora;
        this.duracion = duracion;
        this.grupo = grupo;
        this.ubicacionesHabilitadas = ubicacionesHabilitadas;
        this.asientos = asientos;
      }

    agregarUbicacionHabilitada(ubicacion: Ubicacion): void {}
    generarAsientos(): void {}
    obtenerAsientosDisponibles(ubicacion: Ubicacion): Asiento[] {
        return [];
    }
}
