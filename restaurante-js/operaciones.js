// ========================================
// OPERACIONES.JS
// Lógica de negocio del restaurante
// ========================================

import { menu } from "./menu.js";

// ========================================
// 1. CONSULTAS Y BÚSQUEDAS
// ========================================

export function contarPlatos() {
    return menu.length;
}

export function buscarPlatoPorNombre(nombre) {
    return menu.find(plato => 
        plato.nombre.toLowerCase() === nombre.toLowerCase()
    );
}

export function filtrarStockBajo() {
    return menu.filter(plato => plato.stock < 5);
}

export function obtenerResumenMenu() {
    return menu.map(plato => `${plato.nombre}: S/ ${plato.precio}`);
}


export class ErrorNegocio extends Error {
 constructor(mensaje) {
   super(mensaje);
   this.name = "ErrorNegocio";
 }
}

// ========================================
// 2. ESTADOS Y VERIFICACIONES
// ========================================

export function calcularEstadoPlato(plato) {
    if (plato.stock <= 0) return "agotado";
    if (plato.stock < 5) return "bajo";
    return "normal";
}

export function verificarEstadoGeneral() {
    const hayStockBajo = menu.some(plato => plato.stock < 5);
    return hayStockBajo ? "¡Atención: Hay platos con stock bajo!" : "Todo el inventario está bien.";
}

// ========================================
// 3. OPERACIONES ASÍNCRONAS
// ========================================

export function simularRespuestaServidor(resultado) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const falla = Math.random() < 0.3;
            if (falla) {
                reject("Error del servidor simulado.");
            } else {
                resolve(resultado);
            }
        }, 2000);
    });
}

export async function venderPlatoAsync(nombre, cantidad) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const plato = buscarPlatoPorNombre(nombre);
            
            if (!plato) {
                reject(new Error("Error: El plato no existe en el menú."));
            } else if (plato.stock < cantidad) {
                reject(new Error("Error: No hay suficiente stock para esta venta."));
            } else {
                plato.stock -= cantidad;
                resolve(`Venta exitosa: ${cantidad} x ${plato.nombre}. Stock restante: ${plato.stock}`);
            }
        }, 800);
    });
}