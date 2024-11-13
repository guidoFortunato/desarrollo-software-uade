import { Grupo } from './Grupo';
import { Ubicacion } from './Ubicacion';
import { Asiento } from './Asiento';
import { DuracionRecargo } from '../patterns/decorator/DuracionRecargo';
import { UbicacionRecargo } from '../patterns/decorator/UbicacionRecargo';
import { BaseDecoratorRecargo } from '../patterns/decorator/BaseDecoratorRecargo';
import { CalculadoraPrecio, CalculadoraPrecioBase } from './CalculadoraPrecio';

export class Funcion {
    private _id: number;
    private _nombre: string;
    private _fecha: Date;
    private _hora: string;
    private _grupo: Grupo;
    private _duracion: number;
    private _ubicaciones: Ubicacion[];
    private _asientos: Asiento[] = [];

    constructor(
        id: number,
        nombre: string,
        fecha: Date,
        hora: string,
        grupo: Grupo,
        duracion: number,
        ubicaciones: Ubicacion[],
    ) {
        this._id = id;
        this._nombre = nombre;
        this._fecha = fecha;
        this._hora = hora;
        this._grupo = grupo;
        this._duracion = duracion;
        this._ubicaciones = ubicaciones;
        
        this.generarAsientos();
    }

    private generarAsientos(): void {
        let asientoId = 1;
        this._ubicaciones.forEach(ubicacion => {
            
            for (let i = 0; i < ubicacion.cantidadMaxima; i++) {
                const asiento = new Asiento(
                    asientoId++,
                    false,
                    ubicacion,
                    this
                );

                const calculadoraBase = new CalculadoraPrecioBase();
                const calculadoraUbicacion = new UbicacionRecargo(calculadoraBase);
                const calculadoraFinal = new DuracionRecargo(calculadoraUbicacion);

                asiento.setCalculadoraPrecio(calculadoraFinal);
                this._asientos.push(asiento);
            }
        });
    }

    get id(): number {
        return this._id;
    }

    get nombre(): string {
        return this._nombre;
    }

    get fecha(): string {
        return this._fecha.toISOString().split('T')[0];
    }

    get hora(): string {
        return this._hora;
    }

    get grupo(): Grupo {
        return this._grupo;
    }

    get duracion(): number {
        return this._duracion;
    }

    get ubicaciones(): Ubicacion[] {
        return this._ubicaciones;
    }

    get asientos(): Asiento[] {
        return this._asientos;
    }

    getAsientosDisponibles(ubicacionId: number): number {
        const asientosOcupados = this._asientos.filter(
            a => a.ubicacion.id === ubicacionId && a.estado
        ).length;
        const ubicacion = this._ubicaciones.find(u => u.id === ubicacionId);
        return ubicacion ? ubicacion.cantidadMaxima - asientosOcupados : 0;
    }

    getAsientosOcupados(ubicacionId: number): number {
        return this._asientos.filter(
            a => a.ubicacion.id === ubicacionId && a.estado
        ).length;
    }


}

