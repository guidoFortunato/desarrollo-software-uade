import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Teatro } from './models/Teatro';
import { Funcion } from './models/Funcion';
import { Grupo } from './models/Grupo';
import { Ubicacion } from './models/Ubicacion';
import { Actor } from './models/Actor';
import { Cliente } from './models/Cliente';
import { Compra } from './models/Compra';
import { MedioPago } from './models/MedioPago';
import { Efectivo } from './patterns/strategy/Efectivo';
import { Credito } from './patterns/strategy/Credito';
import NavBar from './components/NavBar';
import UserLayout from './components/user/UserLayout';
import Carrito from './components/user/Carrito';
import AdminFunciones from './components/admin/AdminFunciones';
import AdminGrupos from './components/admin/AdminGrupos';
import AdminCompras from './components/admin/AdminCompras';

function App() {
  // Crear ubicaciones (se usarán para todas las funciones)
  const ubicacionesIniciales = [
    new Ubicacion(1, "Platea", 100, 1),
    new Ubicacion(2, "Palco Alto", 100, 1.2),
    new Ubicacion(3, "Palco Bajo", 100, 1.5),
    new Ubicacion(4, "Cazuela", 100, 2),
    new Ubicacion(5, "Tertulia", 100, 2.25),
    new Ubicacion(6, "Paraíso", 100, 3)
  ];

  // Crear actores
  const actoresShakespeare = [
    new Actor("John Smith", "20345678", "Actor principal con 15 años de experiencia"),
    new Actor("Mary Johnson", "20987654", "Actriz premiada, especialista en drama")
  ];

  const actoresGarcia = [
    new Actor("Carlos Pérez", "30123456", "Director y actor principal"),
    new Actor("Ana González", "31234567", "Actriz de teatro experimental")
  ];

  // Crear grupos
  const grupoShakespeare = new Grupo(1, "Compañía Shakespeare", actoresShakespeare);
  const grupoGarciaLorca = new Grupo(2, "Teatro García Lorca", actoresGarcia);

  // Crear funciones
  const funcionRomeo = new Funcion(
    1,
    "Romeo y Julieta",
    new Date('2025-11-15'),
    "20:00",
    grupoShakespeare,
    120,
    ubicacionesIniciales
  );

  const funcionBodas = new Funcion(
    2,
    "Bodas de Sangre",
    new Date('2025-11-20'),
    "21:00",
    grupoGarciaLorca,
    150,
    ubicacionesIniciales
  );

  const [teatro] = useState(() => {
    const nuevoTeatro = new Teatro("Teatro Colonial", "Av. Corrientes 1234");
    
    // Agregar grupos y funciones
    nuevoTeatro.agregarGrupo(grupoShakespeare);
    nuevoTeatro.agregarGrupo(grupoGarciaLorca);
    nuevoTeatro.agregarFuncion(funcionRomeo);
    nuevoTeatro.agregarFuncion(funcionBodas);
    nuevoTeatro.agregarUbicaciones(ubicacionesIniciales);

    // Crear clientes
    const cliente1 = new Cliente("Juan Pérez", "juan@email.com");
    const cliente2 = new Cliente("María García", "maria@email.com");
    nuevoTeatro.registrarCliente(cliente1);
    nuevoTeatro.registrarCliente(cliente2);

    // Crear compras de ejemplo
    // Compra para Romeo y Julieta
    const asientosRomeo = [funcionRomeo.asientos[0], funcionRomeo.asientos[1]];
    asientosRomeo.forEach(asiento => asiento.ocupar());
    
    const compra1 = new Compra(
      1,
      asientosRomeo,
      new MedioPago(new Efectivo(), "efectivo"),
      { nombre: "Juan Pérez", email: "juan@email.com" },
      200
    );
    cliente1.agregarCompra(compra1);

    // Compra para Bodas de Sangre
    const asientosBodas = [funcionBodas.asientos[10], funcionBodas.asientos[11], funcionBodas.asientos[12]];
    asientosBodas.forEach(asiento => asiento.ocupar());
    
    const compra2 = new Compra(
      2,
      asientosBodas,
      new MedioPago(new Credito(3), "credito"),
      { nombre: "María García", email: "maria@email.com" },
      450
    );
    cliente2.agregarCompra(compra2);

    return nuevoTeatro;
  });

  return (
    <Router>
      <div className="h-screen flex flex-col overflow-hidden">
        <NavBar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/funciones" replace />} />
            
            {/* User routes */}
            <Route path="/funciones" element={<UserLayout teatro={teatro} />} />
            <Route path="/checkout" element={<Carrito />} />
            
            {/* Admin routes */}
            <Route path="/admin/funciones" element={<AdminFunciones teatro={teatro} />} />
            <Route path="/admin/grupos" element={<AdminGrupos teatro={teatro} />} />
            <Route path="/admin/compras" element={<AdminCompras teatro={teatro} />} />

            <Route path="*" element={<Navigate to="/funciones" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
