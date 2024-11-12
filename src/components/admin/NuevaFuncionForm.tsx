import { useState, useEffect } from 'react';
import { Funcion } from '../../models/Funcion';
import { Grupo } from '../../models/Grupo';
import { Ubicacion } from '../../models/Ubicacion';

interface NuevaFuncionFormProps {
  grupos: Grupo[];
  ubicaciones: Ubicacion[];
  onCrear: (funcion: Funcion) => void;
  onCancel: () => void;
  funcionParaCopiar?: Funcion | null;
}

const NuevaFuncionForm = ({ grupos, ubicaciones, onCrear, onCancel, funcionParaCopiar }: NuevaFuncionFormProps) => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [grupoId, setGrupoId] = useState('');
  const [duracion, setDuracion] = useState('');
  const [ubicacionesSeleccionadas, setUbicacionesSeleccionadas] = useState<number[]>([]);

  // Obtener la fecha actual en formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (funcionParaCopiar) {
      setNombre(funcionParaCopiar.nombre);
      setGrupoId(funcionParaCopiar.grupo.id.toString());
      setDuracion(funcionParaCopiar.duracion.toString());
      setUbicacionesSeleccionadas(funcionParaCopiar.ubicaciones.map((ub: Ubicacion) => ub.id));
    }
  }, [funcionParaCopiar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que la fecha no sea anterior a hoy
    if (fecha < today) {
      alert('No se pueden crear funciones para fechas pasadas');
      return;
    }

    // Si es para hoy, validar que la hora no haya pasado
    if (fecha === today) {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      if (hora < currentTime) {
        alert('No se pueden crear funciones para horarios pasados');
        return;
      }
    }

    const ubicacionesHabilitadas = ubicaciones
      .filter(ub => ubicacionesSeleccionadas.includes(ub.id));

    const grupo = grupos.find(g => g.id === parseInt(grupoId));
    if (!grupo) return;

    const nuevaFuncion = new Funcion(
      Date.now(),
      nombre,
      new Date(fecha),
      hora,
      grupo,
      parseInt(duracion),
      ubicacionesHabilitadas
    );

    onCrear(nuevaFuncion);
  };

  const toggleUbicacion = (ubicacionId: number) => {
    setUbicacionesSeleccionadas(prev => 
      prev.includes(ubicacionId)
        ? prev.filter(id => id !== ubicacionId)
        : [...prev, ubicacionId]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-semibold text-indigo-800 mb-6">
        {funcionParaCopiar ? 'Copiar Función' : 'Nueva Función'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              min={today} // Restringir fechas anteriores
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Hora</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Grupo</label>
            <select
              value={grupoId}
              onChange={(e) => setGrupoId(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Seleccione un grupo</option>
              {grupos.map(grupo => (
                <option key={grupo.id} value={grupo.id}>
                  {grupo.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Duración (minutos)</label>
            <input
              type="number"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              min="1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Ubicaciones Habilitadas</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ubicaciones.map(ubicacion => (
              <div key={ubicacion.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`ubicacion-${ubicacion.id}`}
                  checked={ubicacionesSeleccionadas.includes(ubicacion.id)}
                  onChange={() => toggleUbicacion(ubicacion.id)}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-400"
                />
                <label htmlFor={`ubicacion-${ubicacion.id}`} className="text-gray-700">
                  {ubicacion.nombre} ({ubicacion.cantidadMaxima} asientos)
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Crear Función
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevaFuncionForm; 