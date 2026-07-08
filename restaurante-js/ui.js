import { menu } from "./menu.js";
import {
    buscarPlatoPorNombre,
    filtrarStockBajo,
    obtenerResumenMenu,
    venderPlato,
    calcularEstadoPlato,
    verificarEstadoGeneral
} from "./operaciones.js";

export function renderMenu() {
    const output = document.getElementById("output");
    let html = "<h3>Menú</h3><ul>";

    for (let i = 0; i < menu.length; i++) {
        const plato = menu[i];
        const estado = calcularEstadoPlato(plato);
        html += `<li class="${estado}">${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
    }

    html += "</ul>";
    html += `<p>${verificarEstadoGeneral()}</p>`;
    output.innerHTML = html;
}

export function renderLista(titulo, listaTextos) {
    const output = document.getElementById("output");
    let html = `<h3>${titulo}</h3><ul>`;
    
    for (let i = 0; i < listaTextos.length; i++) {
        html += `<li>${listaTextos[i]}</li>`;
    }
    
    html += "</ul>";
    output.innerHTML = html;
}

export function mostrarMensaje(texto) {
    const output = document.getElementById("output");
    output.innerHTML = `<p>${texto}</p>`;
}

export function conectarEventos() {
    const btnMostrar = document.getElementById("btnMostrar");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnBuscar = document.getElementById("btnBuscar");
    const btnStockBajo = document.getElementById("btnStockBajo");
    const btnResumen = document.getElementById("btnResumen");
    
    const inputBuscar = document.getElementById("inputBuscar");
    const inputVentaNombre = document.getElementById("inputVentaNombre");
    const inputVentaCantidad = document.getElementById("inputVentaCantidad");
    const btnVender = document.getElementById("btnVender");

    if (btnMostrar) {
        btnMostrar.addEventListener("click", () => renderMenu());
    }

    if (btnAgregar) {
        btnAgregar.addEventListener("click", () => {
            mostrarMensaje("Agrega plato demo (si tienes agregarPlato, úsalo aquí) y luego renderiza.");
        });
    }

    if (btnBuscar) {
        btnBuscar.addEventListener("click", () => {
            const nombre = inputBuscar.value.trim();
            if (!nombre) return mostrarMensaje("Escribe un nombre para buscar.");

            const plato = buscarPlatoPorNombre(nombre);
            if (!plato) return mostrarMensaje("No encontrado.");

            renderLista("Resultado búsqueda", [`${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}`]);
        });
    }

    if (btnStockBajo) {
        btnStockBajo.addEventListener("click", () => {
            const lista = filtrarStockBajo(3).map(p => `${p.nombre} — Stock: ${p.stock}`);
            renderLista("Stock bajo (<=3)", lista.length ? lista : ["Sin resultados"]);
        });
    }

    if (btnResumen) {
        btnResumen.addEventListener("click", () => {
            const lista = obtenerResumenMenu();
            renderLista("Resumen del menú", lista);
        });
    }

    // Lógica añadida para la sección "Vender Plato"
    if (btnVender) {
        btnVender.addEventListener("click", () => {
            const nombre = inputVentaNombre.value.trim();
            const cantidad = parseInt(inputVentaCantidad.value);

            if (!nombre || isNaN(cantidad) || cantidad <= 0) {
                return mostrarMensaje("Por favor, ingresa un nombre y una cantidad válida.");
            }

            // Ejecuta la función lógica que importaste
            const mensajeResultado = venderPlato(nombre, cantidad);
            mostrarMensaje(mensajeResultado);
        });
    }
}
