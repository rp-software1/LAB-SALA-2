import axios from "axios";
import { platosMock } from "../data/platos.mock";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getPlatos() {
  // Backend aún no disponible: devolvemos datos mock
  return new Promise((resolve) => {
    setTimeout(() => resolve(platosMock), 300);
  });

  // Cuando el backend esté listo, descomenta esto y borra lo de arriba:
  // const response = await axios.get(`${BASE_URL}/api/platos`);
  // return response.data;
}