// Filters.jsx
import { useState } from "react";

const Filtros = ({ marcas, precioMin, precioMax, onFilterChange }) => {
  const [selectedMarcas, setSelectedMarcas] = useState([]);
  const [precio, setPrecio] = useState([precioMin, precioMax]);
  const [disponibilidad, setDisponibilidad] = useState(false);

  const handleMarcaChange = (marca) => {
    const updated = selectedMarcas.includes(marca)
      ? selectedMarcas.filter(m => m !== marca)
      : [...selectedMarcas, marca];

    setSelectedMarcas(updated);
    onFilterChange({ marcas: updated, precio, disponibilidad });
  };

  const handlePrecioChange = (event, index) => {
    const newPrecio = [...precio];
    newPrecio[index] = Number(event.target.value);
    setPrecio(newPrecio);
    onFilterChange({ marcas: selectedMarcas, precio: newPrecio, disponibilidad });
  };

  const handleDisponibilidadChange = () => {
    const newDisponibilidad = !disponibilidad;
    setDisponibilidad(newDisponibilidad);
    onFilterChange({ marcas: selectedMarcas, precio, disponibilidad: newDisponibilidad });
  };

  return (
    <div className="filters text-white">
      <div>
        <h3>Marcas</h3>
        {marcas.map(marca => (
          <label key={marca}>
            <input
              type="checkbox"
              checked={selectedMarcas.includes(marca)}
              onChange={() => handleMarcaChange(marca)}
            />
            {marca}
          </label>
        ))}
      </div>

      <div>
        <h3>Precio</h3>
        <input
          type="number"
          value={precio[0]}
          min={precioMin}
          max={precioMax}
          onChange={(e) => handlePrecioChange(e, 0)}
        />
        <input
          type="number"
          value={precio[1]}
          min={precioMin}
          max={precioMax}
          onChange={(e) => handlePrecioChange(e, 1)}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={disponibilidad}
            onChange={handleDisponibilidadChange}
          />
          Disponibilidad
        </label>
      </div>
    </div>
  );
};

export default Filtros;
