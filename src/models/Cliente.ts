import { Compra } from './Compra';

export class Cliente {
    private nombre: string;
    private email: string;
    private compras: Compra[];

    constructor(nombre: string, email: string) {
        this.nombre = nombre;
        this.email = email;
        this.compras = [];
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getEmail(): string {
        return this.email;
    }

    public agregarCompra(compra: Compra): void {
        this.compras.push(compra);
    }

    public getCompras(): Compra[] {
        return this.compras;
    }
}

