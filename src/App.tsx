import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Teatro } from './models/Teatro';
import { Funcion } from './models/Funcion';
import { Grupo } from './models/Grupo';
import { Ubicacion } from './models/Ubicacion';
import NavBar from './components/NavBar';
import UserLayout from './components/user/UserLayout';
import Carrito from './components/user/Carrito';
import AdminFunciones from './components/admin/AdminFunciones';
import AdminGrupos from './components/admin/AdminGrupos';
import AdminCompras from './components/admin/AdminCompras';

function App() {
  // Crear datos iniciales
  const grupoInicial = new Grupo(1, "Compañía Shakespeare", []);
  const ubicacionesIniciales = [
    new Ubicacion(1, "Platea", 100, 1),
    new Ubicacion(2, "Palco Alto", 100, 1.2),
    new Ubicacion(3, "Palco Bajo", 100, 1.5),
    new Ubicacion(4, "Cazuela", 100, 2),
    new Ubicacion(5, "Tertulia", 100, 2.25),
    new Ubicacion(6, "Paraíso", 100, 3)
  ];

  const funcionInicial = new Funcion(
    1,
    "Romeo y Julieta",
    new Date('2024-11-15'),
    "20:00",
    grupoInicial,
    120,
    ubicacionesIniciales
  );

  const [teatro] = useState(() => {
    const nuevoTeatro = new Teatro("Teatro Colonial", "Av. Corrientes 1234");
    nuevoTeatro.agregarGrupo(grupoInicial);
    nuevoTeatro.agregarFuncion(funcionInicial);
    nuevoTeatro.agregarUbicaciones(ubicacionesIniciales);
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
