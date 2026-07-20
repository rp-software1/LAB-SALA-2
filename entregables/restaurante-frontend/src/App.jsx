import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import MesasPage from "./pages/MesasPage";
import CarritoPage from "./pages/CarritoPage";

import { getPlatos } from "./services/api";

export default function App() {
  const [pagina, setPagina] = useState("home");

  useEffect(() => {
    async function probarAPI() {
      const platos = await getPlatos();
      console.log(platos);
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