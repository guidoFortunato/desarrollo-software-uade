export class Actor {
  private nombre: string;
  private dni: string;
  private descripcion: string;

  constructor(nombre: string, dni: string, descripcion: string) {
    this.nombre = nombre;
    this.dni = dni;
    this.descripcion = descripcion;
}

 // Getter y setter para nombre
    get getNombre(): string {
        return this.nombre;
    }

    set setNombre(nombre: string) {
        this.nombre = nombre;
    }

    // Getter y setter para dni
    get getDni(): string {
        return this.dni;
    }

    set setDni(dni: string) {
        this.dni = dni;
    }

    // Getter y setter para descripcion
    get getDescripcion(): string {
        return this.descripcion;
    }

    set setDescripcion(descripcion: string) {
        this.descripcion = descripcion;
    }





}
