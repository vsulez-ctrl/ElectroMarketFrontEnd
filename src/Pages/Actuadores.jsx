import PlantillaProductos from "../components/Productos/PlantillaProductos";
import {obtenerMarcasActuadores, buscarProductosPorCategoria} from "../services/productService";
import banner from "../assets/imagenes/productos/HeroProductos/ActuadoresHero.jpg";

export default function Actuadores() {
  const buscarActuadores = () => {
      return buscarProductosPorCategoria('Actuadores');
  }
  return (
    <PlantillaProductos
      titulo="Actuadores"
      banner={banner}
      obtenerMarcas={obtenerMarcasActuadores}
      buscarProductos={buscarActuadores}
      rangoPrecio={{ min: 22000, max: 600000 }}
    />
  );
}
