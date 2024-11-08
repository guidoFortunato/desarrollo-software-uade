export class Ubicacion {
    private nombre: string;
    private cantidadMaxima: number;

    constructor(nombre: string, cantidadMaxima: number) {
        this.nombre = nombre;
        this.cantidadMaxima = cantidadMaxima;
    }

    public get getNombre(): string {
        return this.nombre;
    }

    public set setNombre(nombre: string) {
        this.nombre = nombre;
    }

    public get getCantidadMaxima(): number {
        return this.cantidadMaxima;
    }

    public set setCantidadMaxima(cantidadMaxima: number) {
        this.cantidadMaxima = cantidadMaxima;
    }
}
