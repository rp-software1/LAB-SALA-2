// restaurante.js — versión Bloque A
 
// Plato 1
const nombrePlato = "Lomo saltado";
const precioPlato = 18;
let stockPlato = 5;
 
// Plato 2
const nombrePlato2 = "Arroz con leche";
const precioPlato2 = 8;
let stockPlato2 = 10;
 
// Plato 3
const nombrePlato3 = "Sopa criolla";
const precioPlato3 = 12;
let stockPlato3 = 3;
 
console.log("Plato 1:", nombrePlato, "| Precio:", precioPlato, "| Stock:", stockPlato);
console.log("Plato 2:", nombrePlato2, "| Precio:", precioPlato2, "| Stock:", stockPlato2);
console.log("Plato 3:", nombrePlato3, "| Precio:", precioPlato3, "| Stock:", stockPlato3);


// Bloque C — objetos del restaurante
 
const plato1 = { nombre: "Lomo saltado", precio: 18, stock: 5 };
const plato2 = { nombre: "Arroz con leche", precio: 8, stock: 10 };
const plato3 = { nombre: "Sopa criolla", precio: 12, stock: 3 };
 
function describir(plato) {
  return plato.nombre + " — S/ " + plato.precio;
}
 
function estaDisponible(plato) {
  return plato.stock > 0;
}
 
function vender(plato) {
  plato.stock = plato.stock - 1;
  return plato.stock;
}
 
console.log(describir(plato1));       // "Lomo saltado — S/ 18"
console.log(estaDisponible(plato3));  // true
 
vender(plato1);
console.log(plato1.stock);            // 4

// commit 2.

// commit 3.

// commit B1

// commit B3

