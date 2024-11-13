import { useState } from 'react';
import { Grupo } from '../../models/Grupo';
import { Actor } from '../../models/Actor';
import { Teatro } from '../../models/Teatro';
import ModalActor from './ModalActor';

interface AdminGruposProps {
  teatro: Teatro;
}

const AdminGrupos = ({ teatro }: AdminGruposProps) => {
  const [showNewGrupoForm, setShowNewGrupoForm] = useState(false);
  const [showActorModal, setShowActorModal] = useState(false);
  const [selectedGrupo, setSelectedGrupo] = useState<Grupo | null>(null);
  const [nuevoGrupoNombre, setNuevoGrupoNombre] = useState('');

  const handleCrearGrupo = () => {
    if (nuevoGrupoNombre.trim()) {
      const nuevoGrupo = new Grupo(
        Date.now(), // ID único basado en timestamp
        nuevoGrupoNombre,
        []
      );
      teatro.agregarGrupo(nuevoGrupo);
      setNuevoGrupoNombre('');
      setShowNewGrupoForm(false);
    }
  };

  const handleAgregarActor = (grupo: Grupo) => {
    setSelectedGrupo(grupo);
    setShowActorModal(true);
  };

  const handleActorAgregado = (actor: Actor) => {
    if (selectedGrupo) {
      selectedGrupo.actores = [...selectedGrupo.actores, actor];
      setShowActorModal(false);
      setSelectedGrupo(null);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <div className="bg-gray-50 p-8 shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-indigo-900">Gestión de Grupos</h2>
          <button
            onClick={() => setShowNewGrupoForm(!showNewGrupoForm)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Nuevo Grupo
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        {showNewGrupoForm && (
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Crear Nuevo Grupo</h3>
            <div className="flex gap-4">
              <input
                type="text"
                value={nuevoGrupoNombre}
                onChange={(e) => setNuevoGrupoNombre(e.target.value)}
                placeholder="Nombre del grupo"
                className="flex-1 border rounded-md p-2"
              />
              <button
                onClick={handleCrearGrupo}
                disabled={!nuevoGrupoNombre.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
              >
                Crear
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {teatro.getGrupos().map((grupo) => (
            <div key={grupo.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold text-indigo-800">{grupo.nombre}</h3>
                <button
                  onClick={() => handleAgregarActor(grupo)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Agregar Actor
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {grupo.actores.map((actor) => (
                  <div key={actor.getDni} className="border rounded-lg p-4 bg-gray-50">
                    <p className="font-semibold">{actor.getNombre}</p>
                    <p className="text-gray-600">DNI: {actor.getDni}</p>
                    <p className="text-gray-600 text-sm mt-2">{actor.getDescripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showActorModal && selectedGrupo && (
        <ModalActor
          isOpen={showActorModal}
          onClose={() => {
            setShowActorModal(false);
            setSelectedGrupo(null);
          }}
          onActorAgregado={handleActorAgregado}
          teatro={teatro}
          grupoActual={selectedGrupo}
        />
      )}
    </div>
  );
};

export default AdminGrupos; 