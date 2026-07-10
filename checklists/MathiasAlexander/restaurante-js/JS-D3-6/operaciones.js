// ========================================
// OPERACIONES.JS
// Lógica del negocio
// ========================================

import { menu } from "./menu.js";


// ========================================
// ERROR PERSONALIZADO DE NEGOCIO
// ========================================

export class ErrorNegocio extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "ErrorNegocio";
    }
}

// ========================================
// CONTAR PLATOS
// ========================================

export function contarPlatos() {
    return menu.length;
}

// ========================================
// BUSCAR PLATO
// ========================================

export function buscarPlatoPorNombre(nombre) {
    return menu.find(plato =>
        plato.nombre.toLowerCase() === nombre.toLowerCase()
    );
}

// ========================================
// FILTRAR STOCK BAJO
// ========================================

export function filtrarStockBajo(limite = 3) {
    return menu.filter(plato =>
        plato.stock <= limite
    );
}

// ========================================
// RESUMEN DEL MENÚ
// ========================================

export function obtenerResumenMenu() {
    return menu.map(plato =>
        `${plato.nombre} - S/ ${plato.precio}`
    );
}
// ========================================
// CALCULAR ESTADO DEL PLATO
// ========================================

export function calcularEstadoPlato(plato) {
    if (plato.stock === 0) {

        return "agotado";
    }
    if (plato.stock <= 3) {

        return "bajo";
    }
    return "normal";
}

// ========================================
// VENDER PLATO NORMAL
// ========================================

export function venderPlato(nombre, cantidad) {

    const plato = buscarPlatoPorNombre(nombre);

    if (!plato) {
        return {
            ok: false,
            mensaje: "Plato no encontrado"
        };
    }

    if (plato.stock === 0) {
        return {
            ok: false,
            mensaje: "No disponible"
        };
    }

    if (cantidad <= 0) {
        return {
            ok: false,
            mensaje: "Cantidad inválida"
        };
    }

    if (plato.stock < cantidad) {
        return {

            ok: false,
            mensaje: "Stock insuficiente"

        };
    }
    plato.stock -= cantidad;
    return {
        ok: true,
        mensaje:
        `Venta realizada: ${plato.nombre} x${cantidad}`
    };
}

// ========================================
// ESTADO GENERAL
// ========================================

export function verificarEstadoGeneral() {

    let agotados = 0;
    let bajos = 0;
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].stock === 0) {
            agotados++;
        } else if (menu[i].stock <= 3) {
            bajos++;
        }
    }
    if (agotados > 0) {
        return "Hay platos agotados";
    }
    if (bajos > 0) {
       return "Hay platos con stock bajo";
    }
    return "Todo disponible";
}

// ========================================
// SIMULAR RESPUESTA DEL SERVIDOR
// ========================================

export function simularRespuestaServidor(resultado) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const falla = Math.random() < 0.3;
            if (falla) {
                reject(
                    new Error(
                        "Error del servidor simulado."
                    )
                );
            } else {
                resolve(resultado);
            }
        }, 2000);
    });
}
// ========================================
// VENDER PLATO ASYNC
// Estado consistente
// ========================================

export async function venderPlatoAsync(nombre, cantidad) {
    const plato = buscarPlatoPorNombre(nombre);
    // -----------------------------
    // VALIDACIONES NEGOCIO
    // -----------------------------
    if (!plato) {
        throw new ErrorNegocio(
            "Plato no encontrado"
        );
    }
    if (plato.stock === 0) {
        throw new ErrorNegocio(
            "No disponible"
        );
    }
    if (cantidad <= 0) {
        throw new ErrorNegocio(
            "Cantidad inválida"
        );
    }
    if (plato.stock < cantidad) {
        throw new ErrorNegocio(
            "Stock insuficiente"
        );
    }
    // Guardar estado original

    const stockAnterior = plato.stock;
    try {
        // Simular servidor primero
        const respuesta =
        await simularRespuestaServidor(
            `Venta realizada: ${plato.nombre} x${cantidad}`
        );
        // Cambiar stock solamente si todo salió bien
        plato.stock -= cantidad;
        return respuesta;
    } catch(error) {
        // Mantener estado original
        plato.stock = stockAnterior;
        throw error;
    }
}