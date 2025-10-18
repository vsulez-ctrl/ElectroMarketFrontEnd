// src/services/productService.js
// === Datos mock (puedes cambiar luego a API) ===
import imgUno   from '../assets/arduino1 r3.png';
import imgNano  from '../assets/arduino nano.png';
import imgESP32 from '../assets/freenove ESP32.png';
// Si quieres usar otra imagen para el Pico, agrégala a /src/assets y cámbiala aquí:
import imgPico  from '../assets/logo.png'; // temporal, reemplaza si tienes "raspberry pico.png"

const MICRO = [
  { id: 'uno',   nombre: 'Arduino Uno R3',       marca: 'Arduino',  precio: 89000,  stock: 12, imagen: imgUno   },
  { id: 'nano',  nombre: 'Arduino Nano A000005', marca: 'Arduino',  precio: 69000,  stock: 7,  imagen: imgNano  },
  { id: 'esp32', nombre: 'Freenove ESP32',       marca: 'Freenove', precio: 129000, stock: 5,  imagen: imgESP32 },
  { id: 'pico',  nombre: 'Raspberry Pi Pico',    marca: 'Adafruit', precio: 120000, stock: 10, imagen: imgPico  },
];

// === API del servicio (mock en memoria) ===
export async function obtenerMarcasMicro() {
  return Array.from(new Set(MICRO.map(p => p.marca)));
}

export async function buscarMicrocontroladores({
  marcas = [],
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  disponible = false,
  q = '',
} = {}) {
  const qq = q.trim().toLowerCase();
  return MICRO.filter(p => {
    if (marcas.length && !marcas.includes(p.marca)) return false;
    if (p.precio < min || p.precio > max) return false;
    if (disponible && p.stock <= 0) return false;
    if (qq && !(p.nombre.toLowerCase().includes(qq) || p.marca.toLowerCase().includes(qq))) return false;
    return true;
  });
}
