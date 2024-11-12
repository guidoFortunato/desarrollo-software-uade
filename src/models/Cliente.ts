import { Ticket } from "./Ticket";

export class Cliente {
  private nombre: string;
  private dni: string;
  private tickets: Ticket[];

  constructor(nombre: string, dni: string) {
      this.nombre = nombre;
      this.dni = dni;
      this.tickets = [];
      console.log("cliente: "+nombre +" creado");
  }

  // Getter y setter para tickets
  get getTickets(): Ticket[] {
      return this.tickets;
  }

  set setTickets(tickets: Ticket[]) {
      this.tickets = tickets;
  }

  // Getter para nombre
  get getNombre(): string {
      return this.nombre;
  }

  set setNombre(nombre: string) {
    this.nombre = nombre;
  }

  // Getter para dni
  get getDni(): string {
      return this.dni;
  }
}

