import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import FuncionesList from './components/user/FuncionesList';
import Carrito from './components/user/Carrito';
import AdminFunciones from './components/admin/AdminFunciones';
import AdminGrupos from './components/admin/AdminGrupos';
import AdminCompras from './components/admin/AdminCompras';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          {/* User routes */}
          <Route path="/funciones" element={<FuncionesList />} />
          <Route path="/carrito" element={<Carrito />} />
          
          {/* Admin routes */}
          <Route path="/admin/funciones" element={<AdminFunciones />} />
          <Route path="/admin/grupos" element={<AdminGrupos />} />
          <Route path="/admin/compras" element={<AdminCompras />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
