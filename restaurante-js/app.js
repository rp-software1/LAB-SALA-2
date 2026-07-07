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
    let html = "<h2>Menú Completo</h2><ul>";
    for (const plato of menu) {
        html += `<li>${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
    }
    html += "</ul>";
    output.innerHTML = html;
}

function renderLista(titulo, listaDeTextos) {
    const output = document.getElementById("output");
    let html = `<h2>${titulo}</h2>`;
    
    if (listaDeTextos.length === 0) {
        html += "<p>No hay elementos para mostrar</p>";
    } else {
        html += "<ul>";
        for (const texto of listaDeTextos) {
            html += `<li>${texto}</li>`;
        }
        html += "</ul>";
    }
    output.innerHTML = html;
}

// 3) LÓGICA DE NEGOCIO
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
    const total = menu.length;
    renderLista("Resumen del Menú", [`Total de platos registrados: ${total}`]);
}

function venderPlato(nombre, cantidad) {
    const plato = menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    if (plato && plato.stock >= cantidad) {
        plato.stock -= cantidad;
        renderMenu(); // Actualiza la pantalla para ver el stock nuevo
        alert("¡Venta realizada con éxito!");
    } else {
        alert("Error: Plato no encontrado o stock insuficiente.");
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
document.getElementById("btnVender").addEventListener("click", () => {
    const nombre = document.getElementById("inputVentaNombre").value;
    const cantidad = Number(document.getElementById("inputVentaCantidad").value);
    if (nombre.trim() !== "" && cantidad > 0) {
        venderPlato(nombre, cantidad);
    } else {
        alert("Ingrese datos válidos para la venta.");
    }
});
