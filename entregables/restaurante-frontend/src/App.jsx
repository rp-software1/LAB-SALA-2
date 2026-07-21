import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import MesasPage from "./pages/MesasPage";
import DetalleMesa from "./pages/DetalleMesa";
import CarritoPage from "./pages/CarritoPage";
import ComandasPage from "./pages/ComandasPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar nombreRestaurante="🍽 Restaurante SENATI" />

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "30px",
        }}
      >
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home />} />

          {/* Carta */}
          <Route path="/menu" element={<MenuPage />} />

          {/* Mesas */}
          <Route path="/mesas" element={<MesasPage />} />

          {/* Detalle de una mesa */}
          <Route path="/mesas/:id" element={<DetalleMesa />} />

          {/* Carrito */}
          <Route path="/carrito" element={<CarritoPage />} />

          {/* Comandas */}
          <Route path="/comandas" element={<ComandasPage />} />

          {/* Página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}