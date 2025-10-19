// Microcontroladores.js

import PlantillaProductos from "../components/Productos/PlantillaProductos";
import { obtenerMarcasMicro, buscarProductosPorCategoria } from "../services/productService";
import banner from "../assets/imagenes/productos/HeroProductos/microcontroladores-hero.png";

export default function Microcontroladores() {
  const handleBuscarProductos = () => {
      return buscarProductosPorCategoria('Microcontroladores');
  }

  return (
    <PlantillaProductos
      titulo="Microcontroladores"
      banner={banner}
      obtenerMarcas={obtenerMarcasMicro}
      buscarProductos={handleBuscarProductos} 
      rangoPrecio={{ min: 20000, max: 500000 }}
    />
  );
}