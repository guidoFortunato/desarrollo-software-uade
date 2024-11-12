import { Actor } from './models/Actor';
import { Grupo } from './models/Grupo';
import { Ubicacion } from './models/Ubicacion';
import { Funcion } from './models/Funcion';
import { Cliente } from './models/Cliente';

// Función principal para inicializar el teatro
function main() {
  // Crear actores
  const actor1 = new Actor("Juan Perez", "12345678", "Actor principal");
  const actor2 = new Actor("Ana Gomez", "87654321", "Actriz secundaria");

  // Crear grupo con ID
  const grupo = new Grupo(1, "Grupo A", [actor1, actor2]);

  // Crear ubicaciones con ID y capacidad
  const ubicacionPlatea = new Ubicacion(1, "Platea", 100, 100, 0);
  const ubicacionPalco = new Ubicacion(2, "Palco", 50, 50, 0);

  // Crear una función con todos los parámetros requeridos
  const funcion = new Funcion(
    1, // id
    "Obra de Teatro", // nombre
    new Date(), // fecha
    "20:00", // hora
    grupo, // grupo
    120, // duración
    [ubicacionPlatea, ubicacionPalco], // ubicaciones
    [] // asientos (opcional)
  );

  // Crear una instancia de Cliente
  const cliente = new Cliente("Carlos Ruiz", "98765432");

  return {
    actores: [actor1, actor2],
    grupo,
    ubicaciones: [ubicacionPlatea, ubicacionPalco],
    funcion,
    cliente
  };
}

export default main;
