import { useState } from 'react';
import { Asiento, Teatro } from '../../models';
import FuncionesList from './FuncionesList';
import CarritoSidebar from './CarritoSidebar';

interface UserLayoutProps {
  teatro: Teatro;
}

const UserLayout = ({ teatro }: UserLayoutProps) => {
  const [asientosEnCarrito, setAsientosEnCarrito] = useState<Asiento[]>([]);

  const agregarAlCarrito = (asiento: Asiento) => {
    setAsientosEnCarrito([...asientosEnCarrito, asiento]);
  };

  const quitarDelCarrito = (funcionId: number, ubicacionId: number) => {
    const asientosCoincidentes = asientosEnCarrito.filter(a => 
      a.funcion.id === funcionId && 
      a.ubicacion.id === ubicacionId
    );
    
    if (asientosCoincidentes.length > 0) {
      const asientoAQuitar = asientosCoincidentes[asientosCoincidentes.length - 1];
      
      const nuevosAsientos = asientosEnCarrito.filter(a => a !== asientoAQuitar);
      setAsientosEnCarrito(nuevosAsientos);
    }
  };

  const finalizarCompra = () => {
    asientosEnCarrito.forEach(asiento => {
      asiento.ocupar();
    });
    setAsientosEnCarrito([]);
  };

  const cancelarCompra = () => {
    setAsientosEnCarrito([]);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="w-1/4 bg-white shadow-lg border-r">
        <CarritoSidebar 
          asientos={asientosEnCarrito}
          onQuitarAsiento={quitarDelCarrito}
          onFinalizarCompra={finalizarCompra}
          onCancelarCompra={cancelarCompra}
          teatro={teatro}
        />
      </div>

      <div className="w-3/4 bg-gray-50">
        <FuncionesList 
          teatro={teatro}
          onAgregarAsiento={agregarAlCarrito}
          onQuitarAsiento={quitarDelCarrito}
          asientosEnCarrito={asientosEnCarrito}
        />
      </div>
    </div>
  );
};

export default UserLayout; 