import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";

// ⬇️ importa la nueva vista HU-4
import Microcontroladores from "./Pages/Microcontroladores";
// Nueva página de método de pago
import MetodoPago from "./Pages/MetodoPago";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* ⬇️ nueva ruta HU-4 */}
        <Route path="/microcontroladores" element={<Microcontroladores />} />
        {/* Página para seleccionar método de pago */}
        <Route path="/metodo-pago" element={<MetodoPago />} />
      </Routes>
    </>
  );
}

export default App;
