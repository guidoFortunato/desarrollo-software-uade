class CantidadCuotasException extends Error {

  constructor(message: string = "Cantidad de cuotas no válida") {
      super(message);
      this.name = this.constructor.name; // Establece el nombre de la clase como el nombre del error
      Object.setPrototypeOf(this, CantidadCuotasException.prototype); // Asegura la correcta cadena de prototipos
  }
}
