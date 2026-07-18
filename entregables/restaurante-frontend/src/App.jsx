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

export default App;