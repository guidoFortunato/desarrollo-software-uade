import { useState, useEffect } from 'react';
import { DatosCliente } from '../IFormularioPago';

interface DatosClienteComponentProps {
  onChange: (datosCliente: DatosCliente) => void;
}

export const DatosClienteComponent = ({ onChange }: DatosClienteComponentProps) => {
  const [datosCliente, setDatosCliente] = useState<DatosCliente>({
    nombre: '',
    email: ''
  });

  const validarEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(() => {
    if (datosCliente.nombre && datosCliente.email && validarEmail(datosCliente.email)) {
      onChange(datosCliente);
    }
  }, [datosCliente, onChange]);

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo
        </label>
        <input
          type="text"
          value={datosCliente.nombre}
          onChange={(e) => setDatosCliente({ ...datosCliente, nombre: e.target.value })}
          className="w-full border rounded-md p-2"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={datosCliente.email}
          onChange={(e) => setDatosCliente({ ...datosCliente, email: e.target.value })}
          className={`w-full border rounded-md p-2 ${
            datosCliente.email && !validarEmail(datosCliente.email) 
              ? 'border-red-500' 
              : ''
          }`}
          required
        />
        {datosCliente.email && !validarEmail(datosCliente.email) && (
          <p className="text-red-500 text-sm mt-1">
            Por favor ingrese un email válido
          </p>
        )}
      </div>
    </div>
  );
}; 