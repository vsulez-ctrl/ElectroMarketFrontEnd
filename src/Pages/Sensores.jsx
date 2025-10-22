import PlantillaProductos from "./PlantillaProductos";
import { obtenerFiltrosDisponibles, buscarProductos } from "../services/productService";
import banner from "../assets/imagenes/productos/HeroProductos/sensor-hero.png";

export default function Sensores() {
  const handleObtenerFiltros = () => {
        return obtenerFiltrosDisponibles('Sensores');
    }
  const handleBuscarProductos = (filtros) => {
      return buscarProductos(filtros,'Sensores');
  }
  return (
    <PlantillaProductos
      titulo="Sensores"
      banner={banner}
      obtenerFiltrosIniciales={handleObtenerFiltros}
      buscarProductos={handleBuscarProductos}
      rangoPrecio={{ min: 15000, max: 300000 }}
    />
  );
}
