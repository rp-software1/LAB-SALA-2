function PlatoCard({ plato }) {

    return (

        <div>

            <h2>{plato.nombre}</h2>

            <p>Categoría: {plato.categoria}</p>

            <p>Precio: S/ {plato.precio}</p>

            <p>Stock: {plato.stock}</p>

            <p>

                {

                    plato.disponible

                        ? "✅ Disponible"

                        : "❌ No disponible"

                }

            </p>

            <hr />

        </div>

    );

}

export default PlatoCard;