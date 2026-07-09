// ========================================
// OPERACIONES.JS
// ========================================
import { menu } from "./menu.js";

// Clase para manejar errores específicos de negocio
export class ErrorNegocio extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "ErrorNegocio";
    }
}

// Búsqueda de platos
export const buscarPlatoPorNombre = (nombre) => 
    menu.find(plato => plato.nombre.toLowerCase() === nombre.toLowerCase());

// Venta asíncrona segura
export async function venderPlatoAsync(nombre, cantidad) {
    // 1. Validaciones iniciales
    if (!nombre || cantidad <= 0) {
        throw new ErrorNegocio("Datos inválidos: ingresa un nombre y una cantidad válida.");
    }

    const plato = buscarPlatoPorNombre(nombre);
    
    // 2. Validación de existencia y stock
    if (!plato) {
        throw new ErrorNegocio("El plato no existe en el menú.");
    }
    if (plato.stock < cantidad) {
        throw new ErrorNegocio("Stock insuficiente para realizar la venta.");
    }

    // 3. Modificación del estado (solo se ejecuta si no hay errores previos)
    plato.stock -= cantidad;
    return `Venta exitosa: ${cantidad} x ${plato.nombre}. Stock restante: ${plato.stock}`;
}

// Funciones adicionales
export const contarPlatos = () => menu.length;
export const filtrarStockBajo = () => menu.filter(plato => plato.stock < 5);
export const obtenerResumenMenu = () => menu.map(plato => `${plato.nombre}: S/ ${plato.precio}`);
export const calcularEstadoPlato = (plato) => {
    if (plato.stock <= 0) return "agotado";
    if (plato.stock < 5) return "bajo";
    return "normal";
};
export const verificarEstadoGeneral = () => 
    menu.some(p => p.stock < 5) ? "¡Atención: Hay platos con stock bajo!" : "Todo el inventario está bien.";