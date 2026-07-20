<<<<<<< HEAD
=======
<<<<<<< HEAD
import { useState, useEffect } from "react";

>>>>>>> d678ca7e3fff7b3e36f148210d6b4532eb8ecf3c
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import MesasPage from "./pages/MesasPage";
import CarritoPage from "./pages/CarritoPage";
<<<<<<< HEAD

import { getPlatos } from "./services/api";
=======

import { getPlatos } from "./services/api";
=======
<<<<<<< HEAD
import PlatoCard from "./components/PlatoCard.jsx";
import { platosMock } from "./data/platos.mock.js";

function App() {

    return (

        <>

            <h1>Restaurante El Sabor Peruano</h1>

            {

                platosMock.map(plato => (

                    <PlatoCard

                        key={plato.id}

                        plato={plato}

                    />

                ))

            }

        </>

    );

}
=======
import { useState } from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import MesasPage from './pages/MesasPage';
import CarritoPage from './pages/CarritoPage';
>>>>>>> 71f067f6dc9fb9c86fa82ba89e3c350dfea8f9c8
>>>>>>> d678ca7e3fff7b3e36f148210d6b4532eb8ecf3c

export default function App() {
  const [pagina, setPagina] = useState("home");

  useEffect(() => {
    async function probarAPI() {
<<<<<<< HEAD
      const platos = await getPlatos();
      console.log(platos);
=======
      try {
        const platos = await getPlatos();
        console.log(platos);
      } catch (error) {
        console.error(error);
      }
>>>>>>> d678ca7e3fff7b3e36f148210d6b4532eb8ecf3c
    }

    probarAPI();
  }, []);

  return (
    <>
      <NavBar cambiarPagina={setPagina} />

      <main style={{ padding: "30px" }}>
        {pagina === "home" && <Home />}
        {pagina === "menu" && <MenuPage />}
        {pagina === "mesas" && <MesasPage />}
        {pagina === "carrito" && <CarritoPage />}
      </main>
    </>
  );
}