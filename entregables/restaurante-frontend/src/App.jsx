// App.jsx (Ejemplo de montaje directo para pruebas)
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MesasPage from "./pages/MesasPage";
import React from "react";
import ComandasPage from "./pages/ComandasPage";
// ... otros imports

function App() {
  return (
    <div className="App">
      {/* Tu Navbar u otros componentes */}
      <ComandasPage />
    </div>
  );
}

export default App;