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

export default function App() {
  const [pagina, setPagina] = useState('home');

  return (
    <>
      <NavBar cambiarPagina={setPagina} />
>>>>>>> 9fe5d6d9621a7436459d970b282ebc9fcab8b767

      <main style={{ padding: '30px' }}>
        {pagina === 'home' && <Home />}
        {pagina === 'menu' && <MenuPage />}
        {pagina === 'mesas' && <MesasPage />}
        {pagina === 'carrito' && <CarritoPage />}
      </main>
    </>
  );
}