import { useState } from 'react';
import { Actor } from '../../models/Actor';
import { Grupo } from '../../models/Grupo';
import { Teatro } from '../../models/Teatro';

interface ModalActorProps {
  isOpen: boolean;
  onClose: () => void;
  onActorAgregado: (actor: Actor) => void;
  teatro: Teatro;
  grupoActual: Grupo;
}

const ModalActor = ({ isOpen, onClose, onActorAgregado, teatro, grupoActual }: ModalActorProps) => {
  const [selectedActorId, setSelectedActorId] = useState<string>('nuevo');
  const [nuevoActor, setNuevoActor] = useState({
    nombre: '',
    dni: '',
    descripcion: ''
  });

  // Obtener todos los actores que no están en el grupo actual
  const actoresDisponibles = teatro.getGrupos()
    .flatMap(grupo => grupo.actores)
    .filter(actor => 
      // Verificar que el actor no esté ya en el grupo actual
      !grupoActual.actores.some(a => a.getDni === actor.getDni)
    )
    // Eliminar duplicados basados en DNI
    .filter((actor, index, self) => 
      index === self.findIndex(a => a.getDni === actor.getDni)
    );

  const handleSubmit = () => {
    if (selectedActorId === 'nuevo') {
      if (nuevoActor.nombre && nuevoActor.dni) {
        const actor = new Actor(
          nuevoActor.nombre,
          nuevoActor.dni,
          nuevoActor.descripcion
        );
        teatro.agregarActor(actor);
        onActorAgregado(actor);
      }
    } else {
      const actorExistente = actoresDisponibles.find(a => a.getDni === selectedActorId);
      if (actorExistente) {
        onActorAgregado(actorExistente);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Agregar Actor</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seleccionar Actor
            </label>
            <select
              value={selectedActorId}
              onChange={(e) => setSelectedActorId(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="nuevo">Nuevo Actor</option>
              {actoresDisponibles.map((actor) => (
                <option key={actor.getDni} value={actor.getDni}>
                  {actor.getNombre} - DNI: {actor.getDni}
                </option>
              ))}
            </select>
          </div>

          {selectedActorId === 'nuevo' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nuevoActor.nombre}
                  onChange={(e) => setNuevoActor({ ...nuevoActor, nombre: e.target.value })}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DNI
                </label>
                <input
                  type="text"
                  value={nuevoActor.dni}
                  onChange={(e) => setNuevoActor({ ...nuevoActor, dni: e.target.value })}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={nuevoActor.descripcion}
                  onChange={(e) => setNuevoActor({ ...nuevoActor, descripcion: e.target.value })}
                  className="w-full border rounded-md p-2"
                  rows={3}
                />
              </div>
            </>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedActorId === 'nuevo' && (!nuevoActor.nombre || !nuevoActor.dni)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalActor; 