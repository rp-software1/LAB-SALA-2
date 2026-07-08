// ========================================
// UI.JS
// Interfaz: pantalla + eventos + render
// ========================================

import { menu, agregarPlato } from "./menu.js";

import {
    contarPlatos,
    buscarPlatoPorNombre,
    filtrarStockBajo,
    obtenerResumenMenu,
    venderPlato,
    calcularEstadoPlato,
    verificarEstadoGeneral
} from "./operaciones.js";

// ========================================
// RENDER MENÚ
// ========================================

export function renderMenu() {

    const output = document.getElementById("output");

    let html = `
        <h2>Menú del Restaurante</h2>
        <ul>
    `;

    for (let i = 0; i < menu.length; i++) {

        const plato = menu[i];
        const estado = calcularEstadoPlato(plato);

        let textoEstado = "";

        if (estado === "normal") {
            textoEstado = "Disponible";
        } else if (estado === "bajo") {
            textoEstado = "Stock bajo";
        } else {
            textoEstado = "AGOTADO";
        }

        html += `
            <li class="${estado}">
                <strong>${plato.nombre}</strong><br>
                Precio: S/ ${plato.precio}<br>
                Stock: ${plato.stock}<br>
                Estado: ${textoEstado}
            </li>
            <br>
        `;
    }

    html += `
        </ul>

        <hr>

        <p>${verificarEstadoGeneral()}</p>

        <h3>Total de platos: ${contarPlatos()}</h3>
    `;

    output.innerHTML = html;
}

// ========================================
// RENDER LISTA GENERAL
// ========================================

export function renderLista(titulo, lista) {

    const output = document.getElementById("output");

    let html = `<h2>${titulo}</h2><ul>`;

    for (let i = 0; i < lista.length; i++) {
        html += `<li>${lista[i]}</li>`;
    }

    html += "</ul>";

    output.innerHTML = html;
}

// ========================================
// MOSTRAR MENSAJES
// ========================================

export function mostrarMensaje(texto) {

    document.getElementById("output").innerHTML =
        `<h2>${texto}</h2>`;

}

// ========================================
// EVENTOS
// ========================================

export function conectarEventos() {

    // Mostrar menú
    document.getElementById("btnMostrar").addEventListener("click", () => {
        renderMenu();
    });

    // Agregar plato demo
    document.getElementById("btnAgregar").addEventListener("click", () => {

        agregarPlato({
            nombre: "Pollo a la Brasa",
            precio: 20,
            stock: 4
        });

        renderMenu();

    });

    // Buscar plato
    document.getElementById("btnBuscar").addEventListener("click", () => {

        const nombre = document.getElementById("inputBuscar").value.trim();

        const plato = buscarPlatoPorNombre(nombre);

        if (!plato) {
            mostrarMensaje("Plato no encontrado");
            return;
        }

        renderLista("Resultado", [
            `${plato.nombre} - S/ ${plato.precio} - Stock: ${plato.stock}`
        ]);

    });

    // Stock bajo
    document.getElementById("btnStockBajo").addEventListener("click", () => {

        const lista = filtrarStockBajo().map(
            p => `${p.nombre} - Stock: ${p.stock}`
        );

        renderLista(
            "Stock bajo",
            lista.length ? lista : ["No hay platos con stock bajo"]
        );

    });

    // Resumen
    document.getElementById("btnResumen").addEventListener("click", () => {

        const resumen = obtenerResumenMenu();
        resumen.push(`Total de platos: ${contarPlatos()}`);

        renderLista("Resumen del menú", resumen);

    });

    // Vender plato
    document.getElementById("btnVender").addEventListener("click", () => {

        const nombre = document.getElementById("inputVentaNombre").value.trim();
        const cantidad = Number(document.getElementById("inputVentaCantidad").value);

        const resultado = venderPlato(nombre, cantidad);

        mostrarMensaje(resultado.mensaje);

        if (resultado.ok) {
            renderMenu();
        }

    });

    // Estado general
    document.getElementById("btnEstado").addEventListener("click", () => {

        mostrarMensaje(verificarEstadoGeneral());

    });
}