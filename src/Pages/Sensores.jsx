import PlantillaProductos from "../components/Productos/PlantillaProductos";
import { obtenerMarcasSensores, buscarProductosPorCategoria } from "../services/productService";
import banner from "../assets/imagenes/productos/HeroProductos/sensor-hero.png";


  
  

export default function Sensores() {
  const handleBuscarProductos = () => {
      return buscarProductosPorCategoria('Sensores');
  }
  return (
    <PlantillaProductos
      titulo="Sensores"
      banner={banner}
      obtenerMarcas={obtenerMarcasSensores}
      buscarProductos={handleBuscarProductos}
      rangoPrecio={{ min: 15000, max: 300000 }}
    />
  );
}
