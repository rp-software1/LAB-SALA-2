// ========================================
// UI.JS
// Pantalla + eventos + renderizado
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

// ========================================
// MOSTRAR MENÚ
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
        <h3>Total de platos: ${contarPlatos()}</h3>
        <p>${verificarEstadoGeneral()}</p>
    `;

    output.innerHTML = html;
}

// ========================================
// MOSTRAR LISTAS
// ========================================
export function renderLista(titulo, listaTextos) {
    const output = document.getElementById("output");
    let html = `
        <h2>${titulo}</h2>
        <ul>
    `;

    for (let i = 0; i < listaTextos.length; i++) {
        html += `
            <li>${listaTextos[i]}</li>
        `;
    }
    html += `</ul>`;
    output.innerHTML = html;
}

// ========================================
// MOSTRAR MENSAJES
// ========================================
export function mostrarMensaje(texto, clase = "") {
    const output = document.getElementById("output");
    output.innerHTML = `
        <h2 class="${clase}">${texto}</h2>
    `;
}

// ========================================
// CONECTAR BOTONES
// ========================================
export function conectarEventos() {

    // Mostrar menú
    document.getElementById("btnMostrar").addEventListener("click", () => {
        renderMenu();
    });

    // Agregar plato demo
    document.getElementById("btnAgregar").addEventListener("click", () => {
        agregarPlato({
            nombre: "Causa Rellena",
            precio: 14,
            stock: 12
        });
        renderMenu();
    });

    // Buscar plato
    document.getElementById("btnBuscar").addEventListener("click", () => {
        const nombre = document.getElementById("inputBuscar").value.trim();
        const plato = buscarPlatoPorNombre(nombre);

        if (!plato) {
            mostrarMensaje("Plato no encontrado", "error");
            return;
        }

        renderLista("Resultado de búsqueda", [
            `${plato.nombre} - S/ ${plato.precio} - Stock: ${plato.stock}`
        ]);
    });

    // Stock bajo
    document.getElementById("btnStockBajo").addEventListener("click", () => {
        const lista = filtrarStockBajo().map(plato => 
            `${plato.nombre} - Stock: ${plato.stock}`
        );

        renderLista("Platos con stock bajo", 
            lista.length ? lista : ["No hay platos con stock bajo"]
        );
    });

    // Resumen
    document.getElementById("btnResumen").addEventListener("click", () => {
        const lista = obtenerResumenMenu();
        renderLista("Resumen del menú", lista);
    });

    // Vender con async / await
    document.getElementById("btnVender").addEventListener("click", async () => {
        const nombre = document.getElementById("inputVentaNombre").value.trim();
        const cantidad = Number(document.getElementById("inputVentaCantidad").value);

        try {
            mostrarMensaje("Procesando pedido...", "procesando");
            const mensaje = await venderPlatoAsync(nombre, cantidad);
            mostrarMensaje(mensaje, "exito");
            renderMenu();
        } catch(error) {
            mostrarMensaje(error.message, "error");
        }
    });

    // Estado general
    document.getElementById("btnEstado").addEventListener("click", () => {
        mostrarMensaje(verificarEstadoGeneral());
    });
}