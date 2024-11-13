import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleCambiarVista = () => {
    const newIsAdmin = !isAdmin;
    setIsAdmin(newIsAdmin);
    // Redirigir a la página de funciones correspondiente
    navigate(newIsAdmin ? '/admin/funciones' : '/funciones');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-800 to-indigo-900 p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-purple-200">
          Teatro Colonial
        </Link>
        <div className="flex items-center gap-6">
          <button
            onClick={handleCambiarVista}
            className="text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg transition-colors duration-200 shadow-md"
          >
            Cambiar a {isAdmin ? 'Vista Usuario' : 'Vista Admin'}
          </button>
          {isAdmin ? (
            <div className="flex gap-6">
              <Link to="/admin/funciones" className="text-white hover:text-purple-200 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                Funciones
              </Link>
              <Link to="/admin/grupos" className="text-white hover:text-purple-200 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                Grupos
              </Link>
              <Link to="/admin/compras" className="text-white hover:text-purple-200 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                Compras
              </Link>
            </div>
          ) : (
            <div className="flex gap-6">
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 