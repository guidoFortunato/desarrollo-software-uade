import { Asiento } from '../../models';
import { useNavigate } from 'react-router-dom';

interface CarritoSidebarProps {
  asientos: Asiento[];
  onQuitarAsiento: (funcionId: number, ubicacionId: number) => void;
}

interface UbicacionEnCarrito {
  nombre: string;
  cantidad: number;
  asientos: Asiento[];
}

interface FuncionEnCarrito {
  nombre: string;
  fecha: string;
  hora: string;
  ubicaciones: Record<string, UbicacionEnCarrito>;
}

interface AsientosAgrupados {
  [key: string]: FuncionEnCarrito;
}

const CarritoSidebar = ({ asientos, onQuitarAsiento }: CarritoSidebarProps) => {
  const navigate = useNavigate();
  const total = asientos.reduce((sum, asiento) => sum + asiento.getPrecioBase, 0);

  // Agrupar asientos por función y ubicación
  const asientosAgrupados = asientos.reduce<AsientosAgrupados>((acc, asiento) => {
    const funcionId = asiento.getFuncion.id.toString();
    const ubicacionId = asiento.getUbicacion.id.toString();

    if (!acc[funcionId]) {
      acc[funcionId] = {
        nombre: asiento.getFuncion.nombre,
        fecha: asiento.getFuncion.fecha,
        hora: asiento.getFuncion.hora,
        ubicaciones: {}
      };
    }

    if (!acc[funcionId].ubicaciones[ubicacionId]) {
      acc[funcionId].ubicaciones[ubicacionId] = {
        nombre: asiento.getUbicacion.nombre,
        cantidad: 0,
        asientos: []
      };
    }

    acc[funcionId].ubicaciones[ubicacionId].cantidad++;
    acc[funcionId].ubicaciones[ubicacionId].asientos.push(asiento);

    return acc;
  }, {});

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">Carrito de Compras</h2>
      
      <div className="flex-grow overflow-auto">
        {Object.keys(asientosAgrupados).length === 0 ? (
          <p className="text-gray-500">No hay asientos en el carrito</p>
        ) : (
          <div className="space-y-6">
            {Object.entries(asientosAgrupados).map(([funcionId, funcion]) => (
              <div key={funcionId} className="border rounded-lg p-4">
                <div className="font-semibold text-lg text-indigo-800 mb-2">
                  {funcion.nombre}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {funcion.fecha} - {funcion.hora}
                </div>
                
                <div className="space-y-2">
                  {Object.entries(funcion.ubicaciones).map(([ubicacionId, ubicacion]) => (
                    <div key={ubicacionId} className="flex justify-between items-center border-t pt-2">
                      <div>
                        <span className="font-medium">{ubicacion.nombre}</span>
                        <span className="text-gray-600"> x{ubicacion.cantidad}</span>
                      </div>
                      <button
                        onClick={() => onQuitarAsiento(Number(funcionId), Number(ubicacionId))}
                        className="text-red-500 hover:text-red-700"
                      >
                        Quitar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between mb-4">
          <span className="font-bold">Total:</span>
          <span className="font-bold">${total}</span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          disabled={asientos.length === 0}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Continuar Compra
        </button>
      </div>
    </div>
  );
};

export default CarritoSidebar; 