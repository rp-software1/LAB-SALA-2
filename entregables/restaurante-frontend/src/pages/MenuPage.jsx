import { platosMock } from "../data/platos.mock";

export default function MenuPage() {
  return (
    <section>
      <h2>Carta del Restaurante</h2>

      {platosMock.map((plato) => (
        <div key={plato._id}>
          {plato.nombre} - S/ {plato.precio}
        </div>
      ))}
    </section>
  );
}