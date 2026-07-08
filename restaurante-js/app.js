// ========================================
// ARRAY DEL MENÚ
// ========================================

const menu = [
    { nombre: "Arroz con Pollo", precio: 12, stock: 5 },
    { nombre: "Lomo Saltado", precio: 18, stock: 5 },
    { nombre: "Sopa Criolla", precio: 12, stock: 3 },
    { nombre: "Arroz con Leche", precio: 8, stock: 10 },
    { nombre: "Pollo a la Brasa", precio: 25, stock: 7 },
    { nombre: "Ceviche", precio: 28, stock: 4 },
    { nombre: "Anticuchos", precio: 22, stock: 2 },
    { nombre: "Seco de Res", precio: 20, stock: 1 }
];

// ========================================
// CONTAR PLATOS
// ========================================

function contarPlatos() {
    return menu.length;
}

// ========================================
// FUNCIÓN REUTILIZABLE
// ========================================

function renderLista(titulo, listaDeTextos) {

    const output = document.getElementById("output");

    if (!Array.isArray(listaDeTextos)) {
        output.innerHTML = "<h2>Error: datos inválidos</h2>";
        return;
    }

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

// ========================================
// MOSTRAR MENÚ
// ========================================

function renderMenu() {

    const output = document.getElementById("output");

    let html = `
        <h2>Menú del Restaurante</h2>
        <ul>
    `;

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
            </li>
            <br>
        `;
    }

    html += `
        </ul>

        <hr>

        <h3>Total de platos: ${contarPlatos()}</h3>
    `;

    output.innerHTML = html;
}

// ========================================
// AGREGAR PLATO
// ========================================

function agregarPlatoDemo() {

    const nuevoPlato = {
        nombre: "Causa Rellena",
        precio: 14,
        stock: 12
    };

    menu.push(nuevoPlato);
}
// ========================================
// BUSCAR PLATO
// ========================================

function buscarPlatoPorNombre(nombre) {

    const plato = menu.find(p =>
        p.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (!plato) {
        renderLista("Resultado de la búsqueda", [
            "Plato no encontrado"
        ]);
        return;
    }

    renderLista("Plato encontrado", [
        `Nombre: ${plato.nombre}`,
        `Precio: S/ ${plato.precio}`,
        `Stock: ${plato.stock}`
    ]);

}

// ========================================
// FILTRAR STOCK BAJO
// ========================================

function filtrarStockBajo() {

    const platos = menu.filter(plato => plato.stock <= 3);

    if (platos.length === 0) {

        renderLista("Stock bajo", [
            "No hay platos con stock bajo."
        ]);

        return;
    }

    const lista = platos.map(plato =>
        `${plato.nombre} - Precio: S/ ${plato.precio} - Stock: ${plato.stock}`
    );

    renderLista("Platos con Stock Bajo", lista);

}

// ========================================
// RESUMEN DEL MENÚ
// ========================================

function obtenerResumenMenu() {

    const resumen = menu.map(plato =>
        `${plato.nombre} - S/ ${plato.precio}`
    );

    resumen.push(`Total de platos: ${contarPlatos()}`);

    renderLista("Resumen del Menú", resumen);

}

// ========================================
// VENDER PLATO
// ========================================

function venderPlato(nombre, cantidad) {

    const plato = menu.find(p =>
        p.nombre.toLowerCase() === nombre.toLowerCase()
    );

    const output = document.getElementById("output");

    // Si el plato no existe
    if (!plato) {
        output.innerHTML = "<h2>Plato no encontrado</h2>";
        return;
    }

    // Si el plato está agotado
    if (plato.stock === 0) {
        output.innerHTML = "<h2>No disponible</h2>";
        return;
    }

    // Si no hay suficiente stock
    if (cantidad > plato.stock) {
        output.innerHTML = "<h2>Stock insuficiente</h2>";
        return;
    }

    // Descontar stock
    plato.stock -= cantidad;

    // Mostrar mensaje de venta
    output.innerHTML = `
        <h2>Venta realizada</h2>

        <p>Plato: ${plato.nombre}</p>

        <p>Cantidad vendida: ${cantidad}</p>

        <p>Stock restante: ${plato.stock}</p>
    `;

    // Volver a mostrar el menú actualizado
    renderMenu();

}

// ========================================
// VERIFICAR ESTADO GENERAL
// ========================================

function verificarEstadoGeneral() {

    let agotados = 0;
    let stockBajo = 0;

    // Bucle for tradicional
    for (let i = 0; i < menu.length; i++) {

        if (menu[i].stock === 0) {
            agotados++;
        } else if (menu[i].stock <= 3) {
            stockBajo++;
        }

    }

    const output = document.getElementById("output");

    if (agotados > 0) {
        output.innerHTML = "<h2>Hay platos agotados</h2>";
    } else if (stockBajo > 0) {
        output.innerHTML = "<h2>Hay platos con stock bajo</h2>";
    } else {
        output.innerHTML = "<h2>Todo disponible</h2>";
    }

}
// ========================================
// EVENTOS
// ========================================

// Mostrar menú
document.getElementById("btnMostrar").addEventListener("click", () => {
    renderMenu();
});

// Agregar plato demo
document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarPlatoDemo();
    renderMenu();
});

// Buscar plato
document.getElementById("btnBuscar").addEventListener("click", () => {

    const nombre = document.getElementById("inputBuscar").value;

    if (nombre.trim() === "") {
        document.getElementById("output").innerHTML = "<h2>Ingrese el nombre de un plato.</h2>";
        return;
    }

    buscarPlatoPorNombre(nombre);

});

// Ver stock bajo
document.getElementById("btnStockBajo").addEventListener("click", () => {
    filtrarStockBajo();
});

// Ver resumen
document.getElementById("btnResumen").addEventListener("click", () => {
    obtenerResumenMenu();
});

// Vender plato
document.getElementById("btnVender").addEventListener("click", () => {

    const nombre = document.getElementById("inputVentaNombre").value;
    const cantidad = Number(document.getElementById("inputVentaCantidad").value);

    if (nombre.trim() === "" || cantidad <= 0) {
        document.getElementById("output").innerHTML =
            "<h2>Ingrese un nombre y una cantidad válida.</h2>";
        return;
    }

    venderPlato(nombre, cantidad);

});

// Verificar estado general
document.getElementById("btnEstado").addEventListener("click", () => {
    verificarEstadoGeneral();
});

// Mostrar el menú automáticamente al abrir la página
renderMenu();