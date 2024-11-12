import { useState } from 'react';
import { Grupo } from '../../models/Grupo';
import { Actor } from '../../models/Actor';

const AdminGrupos = () => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [showNewGrupoForm, setShowNewGrupoForm] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl">Gestión de Grupos</h2>
        <button
          onClick={() => setShowNewGrupoForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Nuevo Grupo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {grupos.map((grupo) => (
          <div key={grupo.id} className="border p-4">
            <h3>{grupo.nombre}</h3>
            <div className="mt-2">
              <h4>Actores:</h4>
              {grupo.actores.map((actor: Actor) => (
                <div key={actor.getDni}>
                  <p>{actor.getNombre}</p>
                  <p>DNI: {actor.getDni}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGrupos; 