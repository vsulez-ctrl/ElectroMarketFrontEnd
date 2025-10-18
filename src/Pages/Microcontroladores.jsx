// src/Pages/Microcontroladores.jsx
import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { obtenerMarcasMicro, buscarMicrocontroladores } from "../services/productService";
import banner from "../assets/Tienda.jpg"; // tu imagen grande del mock (puedes cambiarla)

export default function Microcontroladores() {
  const [marcas, setMarcas] = useState([]);
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(false);

  const [filtro, setFiltro] = useState({
    marcas: [],
    min: 20000,
    max: 500000,
    disponible: false,
    q: "",
  });

  const nf = useMemo(() => new Intl.NumberFormat("es-CO"), []);

  useEffect(() => {
    (async () => setMarcas(await obtenerMarcasMicro()))();
  }, []);

  useEffect(() => {
    (async () => {
      setCargando(true);
      setItems(await buscarMicrocontroladores(filtro));
      setCargando(false);
    })();
  }, [filtro]);

  const toggleMarca = (m) =>
    setFiltro((s) => ({
      ...s,
      marcas: s.marcas.includes(m)
        ? s.marcas.filter((x) => x !== m)
        : [...s.marcas, m],
    }));

  const limpiar = () =>
    setFiltro({ marcas: [], min: 20000, max: 500000, disponible: false, q: "" });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* HERO superior */}
      <div className="w-full">
        <img src={banner} alt="Microcontroladores" className="w-full h-[320px] object-cover" />
      </div>

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto px-5 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* SIDEBAR FILTROS */}
        <aside className="bg-[#0f131b] border border-[#1f2937] rounded-xl p-4 sticky top-4 h-max">
          <h3 className="text-xl font-bold mb-4">MICROCONTROLADORES</h3>

          <h4 className="text-blue-300 text-sm font-semibold tracking-wide mb-2">Marcas</h4>
          <div className="space-y-2 mb-4">
            {marcas.map((m) => (
              <label key={m} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="accent-blue-500"
                  checked={filtro.marcas.includes(m)}
                  onChange={() => toggleMarca(m)}
                />
                <span>{m}</span>
              </label>
            ))}
          </div>

          <h4 className="text-blue-300 text-sm font-semibold tracking-wide mb-2">Precio</h4>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={filtro.min}
                onChange={(e) => setFiltro((s) => ({ ...s, min: Number(e.target.value || 0) }))}
                className="w-full bg-[#0b0f17] border border-[#1f2937] rounded-lg px-3 py-2 focus:outline-none"
              />
              <span>—</span>
              <input
                type="number"
                min={0}
                value={filtro.max}
                onChange={(e) => setFiltro((s) => ({ ...s, max: Number(e.target.value || 0) }))}
                className="w-full bg-[#0b0f17] border border-[#1f2937] rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>
            <div className="text-xs opacity-75">
              ${nf.format(filtro.min)} — ${nf.format(filtro.max)}
            </div>
          </div>

          <h4 className="text-blue-300 text-sm font-semibold tracking-wide mb-2">Disponibilidad</h4>
          <label className="flex items-center gap-2 text-sm mb-4">
            <input
              type="checkbox"
              className="accent-blue-500"
              checked={filtro.disponible}
              onChange={(e) => setFiltro((s) => ({ ...s, disponible: e.target.checked }))}
            />
            <span>Solo en stock</span>
          </label>

          <h4 className="text-blue-300 text-sm font-semibold tracking-wide mb-2">Búsqueda</h4>
          <input
            placeholder="Buscar modelo…"
            value={filtro.q}
            onChange={(e) => setFiltro((s) => ({ ...s, q: e.target.value }))}
            className="w-full bg-[#0b0f17] border border-[#1f2937] rounded-lg px-3 py-2 focus:outline-none mb-3"
          />

          <button
            onClick={limpiar}
            className="w-full bg-[#111827] border border-[#29344a] rounded-lg py-2 text-sm font-semibold hover:bg-[#172033] transition"
          >
            Restablecer
          </button>
        </aside>

        {/* LISTADO */}
        <main>
          <h2 className="text-2xl font-extrabold tracking-wider mb-6">MICROCONTROLADORES</h2>

          {cargando && (
            <div className="bg-[#0f131b] border border-[#1f2937] rounded-xl p-4 mb-4">Cargando…</div>
          )}

          {!cargando && items.length === 0 && (
            <div className="bg-[#0f131b] border border-[#1f2937] rounded-xl p-4 mb-4">
              No se encontraron productos con estos criterios.
            </div>
          )}

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((p) => (
              <article key={p.id} className="bg-[#0f131b] border border-[#1f2937] rounded-xl p-3 flex flex-col gap-3">
                {p.stock <= 0 && (
                  <span className="absolute mt-1 ml-1 text-[11px] bg-red-700 text-white px-2 py-1 rounded-md">
                    Agotado
                  </span>
                )}
                <div className="h-48 bg-[#0b0f17] rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => (e.currentTarget.style.opacity = 0.2)}
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold leading-snug" title={p.nombre}>{p.nombre}</h3>
                  <div className="text-xs opacity-80">{p.marca}</div>
                  <div className="font-extrabold">${nf.format(p.precio)}</div>
                </div>
                <button className="mt-auto bg-blue-600 hover:bg-blue-500 transition text-white font-semibold rounded-lg py-2">
                  Ver detalle
                </button>
              </article>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
