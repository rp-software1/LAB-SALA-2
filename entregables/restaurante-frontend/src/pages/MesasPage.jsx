import { mesasMock } from "../data/mesas.mock";

export default function MesasPage() {
  return (
    <section>
      <h2>Mesas del Restaurante</h2>

      {mesasMock.map((mesa) => (
        <div
          key={mesa.id}
          className={`mesa ${mesa.estado}`}
        >
          Mesa {mesa.numero}
        </div>
      ))}
    </section>
  );
}