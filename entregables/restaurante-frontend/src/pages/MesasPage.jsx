import MesaCard from "../components/MesaCard";
import { mesasMock } from "../data/mesas.mock";

export default function MesasPage() {
  return (
    <section>
      <h2>Mesas del Restaurante</h2>

      {mesasMock.map((mesa) => (
        <MesaCard
          key={mesa.id}
          numero={mesa.numero}
          capacidad={mesa.capacidad}
          comensales={mesa.comensales}
          estado={mesa.estado}
        />
      ))}
    </section>
  );
}