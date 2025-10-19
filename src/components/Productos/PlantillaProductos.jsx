import { useEffect, useMemo, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import HeroProducto from "./HeroProducto";
import Filtros from "./Filtros";
import ListaProductos from "./ListaProductos";

const PlantillaProductos = ({
  titulo,
  banner,
  obtenerMarcas,
  buscarProductos,
  rangoPrecio = { min: 20000, max: 500000 },
}) => {
  const [marcas, setMarcas] = useState([]);
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [filtro, setFiltro] = useState({
    marcas: [],
    min: rangoPrecio.min,
    max: rangoPrecio.max,
    disponible: false,
    q: "",
  });

  const nf = useMemo(() => new Intl.NumberFormat("es-CO"), []);

  useEffect(() => {
    (async () => setMarcas(await obtenerMarcas()))();
  }, [obtenerMarcas]);

  useEffect(() => {
    (async () => {
      setCargando(true);
      console.log("🔎 Buscando productos con filtro:", filtro);
      setItems(await buscarProductos(filtro));
      setCargando(false);
      
    })();
  }, [filtro, buscarProductos]);

  const limpiar = () =>
    setFiltro({
      marcas: [],
      min: rangoPrecio.min,
      max: rangoPrecio.max,
      disponible: false,
      q: "",
    });

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <HeroProducto imagen={banner} titulo={titulo} />

      <div className="max-w-7xl mx-auto px-5 py-8  grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <Filtros
          titulo={titulo.toUpperCase()}
          marcas={marcas}
          filtro={filtro}
          setFiltro={setFiltro}
          limpiar={limpiar}
        />

        <main>
          <h2 className="text-2xl font-extrabold tracking-wider mb-6">
            {titulo.toUpperCase()}
          </h2>
          <ListaProductos items={items} cargando={cargando} nf={nf} />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default PlantillaProductos;
