// Ejemplo de uso de las clases principales

import { Actor } from "./models/Actor";
import { Asiento } from "./models/Asiento";
import { CalculadoraPrecio } from "./models/CalculadoraPrecio";
import { Cliente } from "./models/Cliente";
import { Funcion } from "./models/Funcion";
import { Grupo } from "./models/Grupo";
import { Ubicacion } from "./models/Ubicacion";
import { DuracionRecargo } from "./patterns/decorator/DuracionRecargo";
import { PromocionRecargo } from "./patterns/decorator/PromocionRecargo";
import { ServicioRecargo } from "./patterns/decorator/ServicioRecargo";
import { UbicacionRecargo } from "./patterns/decorator/UbicacionRecargo";

function main() {
  // Crear un grupo y algunos actores
  const actor1 = new Actor("Juan Perez", "12345678", "Actor principal");
  const actor2 = new Actor("Ana Gomez", "87654321", "Actriz secundaria");
  const grupo = new Grupo("Grupo A", [actor1, actor2]);

  // Crear una función de teatro con una duración específica y una lista de ubicaciones habilitadas
  const ubicacionPlatea = new Ubicacion("Platea", 100);
  const ubicacionPalco = new Ubicacion("Palco", 50);
  const funcion = new Funcion(
    new Date(),
    "20:00",
    grupo,
    120,
    [ubicacionPlatea, ubicacionPalco],
    []
  );

  // Crear una instancia de Cliente
  const cliente = new Cliente("Carlos Ruiz", "98765432");

  //   const asiento = new AsientoTeatro(200, ubicacionPlatea, 1, calculadora, true, funcion, [ubicacionPlatea, ubicacionPalco]);
  const calculadora = new CalculadoraPrecio();

  // Aplicar decoradores de recargo a la calculadora de precio del asiento
  let calculadoraConRecargo = new DuracionRecargo(calculadora); // Recargo por duración de la función
  // calculadoraConRecargo = new PromocionRecargo(calculadoraConRecargo); // Recargo por promoción
  // calculadoraConRecargo = new ServicioRecargo(calculadoraConRecargo); // Recargo por servicio
  // calculadoraConRecargo = new UbicacionRecargo(calculadoraConRecargo); // Recargo por ubicación

  // Calcular el precio final del asiento con todos los recargos aplicados
//   const precioFinalAsiento = calculadoraConRecargo.calcularPrecio(
//     asiento,
//     asiento.getPrecioBase
//   );
//   console.log("Precio final del asiento con recargos:", precioFinalAsiento);

  //   console.log({cliente: cliente.getNombre})
  // //   console.log({actor1: actor1.getNombre})
  //   console.log({actor2: actor2.getNombre})
  //   console.log({grupo: grupo.getActores})
  //   console.log({funcion: funcion.getDuracion})
}

main();
