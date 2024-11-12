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
    asiento.ocupar();
    setAsientosEnCarrito([...asientosEnCarrito, asiento]);
  };

  const quitarDelCarrito = (funcionId: number, ubicacionId: number) => {
    const asientoAQuitar = asientosEnCarrito.find(a => 
      a.getFuncion.id === funcionId && 
      a.getUbicacion.id === ubicacionId
    );
    
    if (asientoAQuitar) {
      asientoAQuitar.liberar();
      setAsientosEnCarrito(asientosEnCarrito.filter(a => a !== asientoAQuitar));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Carrito Sidebar (25%) */}
      <div className="w-1/4 bg-white shadow-lg p-4 border-r">
        <CarritoSidebar 
          asientos={asientosEnCarrito}
          onQuitarAsiento={quitarDelCarrito}
        />
      </div>

      {/* Lista de Funciones (75%) */}
      <div className="w-3/4 p-8">
        <FuncionesList 
          teatro={teatro}
          onAgregarAsiento={agregarAlCarrito}
          asientosEnCarrito={asientosEnCarrito}
        />
      </div>
    </div>
  );
};

export default UserLayout; 