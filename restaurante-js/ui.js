// ========================================
// UI.JS
// ========================================
import { menu, agregarPlato } from "./menu.js";
import {
    contarPlatos,
    buscarPlatoPorNombre,
    filtrarStockBajo,
    obtenerResumenMenu,
    venderPlatoAsync,
    calcularEstadoPlato,
    verificarEstadoGeneral
} from "./operaciones.js";

export function renderMenu() {
    const output = document.getElementById("output");
    let html = `<h2>Menú del Restaurante</h2><ul>`;
    for (const p of menu) {
        const estado = calcularEstadoPlato(p);
        html += `<li class="${estado}"><strong>${p.nombre}</strong><br>Precio: S/ ${p.precio}<br>Stock: ${p.stock}</li><br>`;
    }
    html += `</ul><hr><h3>Total: ${contarPlatos()}</h3><p>${verificarEstadoGeneral()}</p>`;
    output.innerHTML = html;
}

export function mostrarMensaje(texto, clase = "") {
    document.getElementById("output").innerHTML = `<h2 class="${clase}">${texto}</h2>`;
}

export function conectarEventos() {
    // Evento de Venta con manejo de errores
    document.getElementById("btnVender").addEventListener("click", async () => {
        const nombre = document.getElementById("inputVentaNombre").value.trim();
        const cantidad = Number(document.getElementById("inputVentaCantidad").value);

        try {
            mostrarMensaje("Procesando...", "procesando");
            const mensaje = await venderPlatoAsync(nombre, cantidad);
            
            // Éxito: Solo aquí actualizamos la interfaz
            mostrarMensaje(mensaje, "exito");
            renderMenu();
        } catch (error) {
            // Error: El stock no se tocó y la UI no se rompió
            if (error.name === "ErrorNegocio") {
                mostrarMensaje("Advertencia: " + error.message, "error");
            } else {
                mostrarMensaje("Error inesperado: " + error.message, "error");
            }
        }
    });

    // Otros eventos
    document.getElementById("btnMostrar").addEventListener("click", renderMenu);
    document.getElementById("btnAgregar").addEventListener("click", () => {
        agregarPlato({ nombre: "Causa Rellena", precio: 14, stock: 12 });
        renderMenu();
    });
}