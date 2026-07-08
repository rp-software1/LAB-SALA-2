// 1) DATA
let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Pollo a la brasa", precio: 20, stock: 4 },
    { nombre: "Ceviche", precio: 15, stock: 6 },
];

// 2) FUNCIONES DE RENDERIZADO
function renderMenu() {
    const output = document.getElementById("output");
    let html = "<h2>Menú del Restaurante</h2><ul>";
    
    for (const plato of menu) {
        let estado = "";
        let clase = "";
        
        if (plato.stock === 0) {
            estado = "AGOTADO";
            clase = "agotado";
        } else if (plato.stock <= 3) {
            estado = "Stock bajo";
            clase = "bajo";
        } else {
            estado = "Disponible";
            clase = "normal";
        }
        
        html += `
            <li class="${clase}">
                <strong>${plato.nombre}</strong><br>
                Precio: S/ ${plato.precio}<br>
                Stock: ${plato.stock}<br>
                Estado: ${estado}
            </li><br>
        `;
    }
    html += `</ul><hr><h3>Total de platos: ${contarPlatos()}</h3>`;
    output.innerHTML = html;
}

function renderLista(titulo, listaDeTextos) {
    const output = document.getElementById("output");
    let html = `<h2>${titulo}</h2><ul>`;
    if (listaDeTextos.length === 0) {
        html += "<p>No hay elementos para mostrar</p>";
    } else {
        for (const texto of listaDeTextos) {
            html += `<li>${texto}</li>`;
        }
    }
    html += "</ul>";
    output.innerHTML = html;
}

// 3) LÓGICA DE NEGOCIO
function contarPlatos() {
    return menu.length;
}

function agregarPlatoDemo() {
    menu.push({ nombre: "Causa", precio: 5, stock: 7 });
}

function filtrarStockBajo() {
    const platos = menu.filter(p => p.stock <= 3);
    const lista = platos.map(p => `${p.nombre} — Stock actual: ${p.stock}`);
    renderLista("Platos con stock bajo", lista.length > 0 ? lista : ["No hay platos con stock bajo"]);
}

function buscarPlatoPorNombre(nombre) {
    const plato = menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    if (!plato) {
        renderLista("Resultado", ["Plato no encontrado"]);
        return;
    }
    renderLista("Plato encontrado", [`${plato.nombre} — Precio: S/ ${plato.precio} — Stock: ${plato.stock}`]);
}

function obtenerResumenMenu() {
    renderLista("Resumen del Menú", [`Total de platos registrados: ${menu.length}`]);
}

function venderPlato(nombre, cantidad) {
    const plato = menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    if (plato && plato.stock >= cantidad) {
        plato.stock -= cantidad;
        renderMenu();
        alert("¡Venta realizada con éxito!");
    } else {
        alert("Error: Plato no encontrado o stock insuficiente.");
    }
}

// FUNCIÓN CORREGIDA (Ahora está fuera de venderPlato)
function verificarEstadoGeneral() {
    let agotados = 0;
    let stockBajo = 0;

    for (let i = 0; i < menu.length; i++) {
        if (menu[i].stock === 0) {
            agotados++;
        } else if (menu[i].stock <= 3) {
            stockBajo++;
        }
    }

    const output = document.getElementById("output");
    if (agotados > 0) {
        output.innerHTML = "<h2>¡Atención: Hay platos agotados!</h2>";
    } else if (stockBajo > 0) {
        output.innerHTML = "<h2>Hay platos con stock bajo</h2>";
    } else {
        output.innerHTML = "<h2>Todo disponible</h2>";
    }
}

// 4) EVENTOS
document.getElementById("btnMostrar").addEventListener("click", renderMenu);
document.getElementById("btnAgregar").addEventListener("click", () => { agregarPlatoDemo(); renderMenu(); });
document.getElementById("btnBuscar").addEventListener("click", () => {
    const nombre = document.getElementById("inputBuscar").value;
    if (nombre.trim()) buscarPlatoPorNombre(nombre);
});
document.getElementById("btnStockBajo").addEventListener("click", filtrarStockBajo);
document.getElementById("btnResumen").addEventListener("click", obtenerResumenMenu);

// Botón nuevo para verificar estado general (agregado)
// Nota: Asegúrate de tener un botón con id="btnVerificar" en tu HTML
// document.getElementById("btnVerificar").addEventListener("click", verificarEstadoGeneral);
// Cambio para el commit.

document.getElementById("btnVender").addEventListener("click", () => {
    const nombre = document.getElementById("inputVentaNombre").value;
    const cantidad = Number(document.getElementById("inputVentaCantidad").value);
    if (nombre.trim() !== "" && cantidad > 0) {
        venderPlato(nombre, cantidad);
    } else {
        alert("Ingrese datos válidos.");
    }
});