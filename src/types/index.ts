import { IEstrategiaMedioPago } from '../patterns/strategy/IEstrategiaMedioPago';

export interface Funcion {
  id: number;
  nombre: string;
  fecha: string;
  hora: string;
  duracion: number;
  grupo: Grupo;
  ubicaciones: Ubicacion[];
}

export interface Grupo {
  id: number;
  nombre: string;
  actores: Actor[];
}

export interface Actor {
  id: number;
  nombre: string;
  dni: string;
  direccion: string;
}

export interface Ubicacion {
  id: number;
  nombre: string;
  cantidadMaxima: number;
  asientosDisponibles: number;
  asientosOcupados: number;
}

export interface Asiento {
  id: number;
  precio: number;
  ubicacion: Ubicacion;
  numeroAsiento: number;
  estado: boolean;
  funcion: Funcion;
}

export interface MedioPago {
  tipo: string;
  estrategiaPago: IEstrategiaMedioPago;
  calcularMonto: (total: number) => number;
}

export interface Compra {
  id: number;
  fecha: string;
  asientos: Asiento[];
  medioPago: MedioPago;
  total: number;
} 