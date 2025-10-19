

// ===========================================================
// === FUNCIONES COMUNES DE FILTRADO =========================
// ===========================================================
function filtrarProductos(productos, { marcas = [], min = 0, max = Number.MAX_SAFE_INTEGER, disponible = false, q = "" } = {}) {
  const query = q.trim().toLowerCase();
  return productos.filter(p => {
    if (marcas.length && !marcas.includes(p.marca)) return false;
    if (p.precio < min || p.precio > max) return false;
    if (disponible && p.stock <= 0) return false;
    if (query && !(p.nombre.toLowerCase().includes(query) || p.marca.toLowerCase().includes(query))) return false;
    return true;
  });
}

// ===========================================================
// === MICROCONTROLADORES ====================================
// ===========================================================
export async function obtenerMarcasMicro() {
  return Array.from(new Set(MICRO.map(p => p.marca)));
}

export async function buscarMicrocontroladores(filtro) {
  return filtrarProductos(MICRO, filtro);
}

// ===========================================================
// === SENSORES ==============================================
// ===========================================================
export async function obtenerMarcasSensores() {
  return Array.from(new Set(SENSORES.map(p => p.marca)));
}

export async function buscarSensores(filtro) {
  return filtrarProductos(SENSORES, filtro);
}

// ===========================================================
// === ACTUADORES ============================================
// ===========================================================
export async function obtenerMarcasActuadores() {
  return Array.from(new Set(ACTUADORES.map(p => p.marca)));
}

export async function buscarActuadores(filtro) {
  return filtrarProductos(ACTUADORES, filtro);
}


// src/services/productService.js
const API_URL = "http://localhost:3000"; // cambia si usas otro puerto o dominio

// 🔹 Obtener productos por categoría (dinámico)
export async function buscarProductosPorCategoria(categoria) {
  try {
    const res = await fetch(`${API_URL}/productos/categoria/${categoria}`);
    if (!res.ok) throw new Error(`Error al obtener productos de ${categoria}`);
    const data = await res.json();
    console.log("✅ Productos obtenidos:", data);
    return data; // ← lista de productos [{id, nombre, marca, precio, stock, imagen}]
  } catch (error) {
    console.error("❌ Error buscando productos:", error);
    return [];
  }
}

// productService.js
// Asegúrate de importar tu API_URL

export async function obtenerProductoPorId(id) {
  try {
    // 🚨 Asumo que el endpoint de tu API es /productos/:id
    const res = await fetch(`${API_URL}/productos/${id}`); 
    console.log(`🔍 Buscando producto por ID: ${id}`);
    
    if (!res.ok) {
      // Manejar casos donde el producto no se encuentra (404)
      if (res.status === 404) return null;
      throw new Error(`Error al obtener producto: ${res.status}`);
    }
    
    const data = await res.json();
    console.log(`Producto ID ${id} obtenido:`, data);
    return data; 
  } catch (error) {
    console.error("❌ Error buscando producto por ID:", error);
    return [];
  }
}

// 🔹 Obtener marcas disponibles desde backend
export async function obtenerMarcasPorCategoria(categoria) {
  try {
    const res = await fetch(`${API_URL}/productos/buscar/filtros?categoria=${categoria}`);
    if (!res.ok) throw new Error("Error al obtener marcas");
    const data = await res.json();
    return data.marcas || [];
  } catch (error) {
    console.error("❌ Error obteniendo marcas:", error);
    return [];
  }
}
