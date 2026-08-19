// ========================================
// DATOS DEL MENÚ
// ========================================

export let menu = [
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
// AGREGAR PLATO
// ========================================

export function agregarPlato(plato) {
    menu.push(plato);
}

// ========================================
// ACTUALIZAR STOCK
// ========================================

export function actualizarStock(nombre, nuevoStock) {

    for (let i = 0; i < menu.length; i++) {

        if (menu[i].nombre.toLowerCase() === nombre.toLowerCase()) {
            menu[i].stock = nuevoStock;
            return true;
        }

    }

    return false;
}

// ========================================
// AGREGAR PLATO DEMO
// ========================================

export function agregarPlatoDemo() {

    agregarPlato({
        nombre: "Causa Rellena",
        precio: 14,
        stock: 12
    });

}