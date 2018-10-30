'use strict'

const initialState = {
    Rep1: [], // 1. OBTENER LOS 10 LIBROS MAS COMENTADOS
    Rep2: [], // 2. LOS 10 USUARIOS QUE MAS COMENTARIOS HICIERON
    Rep3: '', // 3. TOTAL DE COMENTARIOS
    Rep4: '', // 4. TOTAL DE LIBROS
    Rep5: '', // 5. TOTAL DE USUARIOS
    Rep6: [], // 6. LOS 10 LIBROS MAS VIEJOS
    Rep7: [], // 7. LOS 10 LIBROS MAS NUEVOS
    Rep8: [], // 8. LOS 10 COMENTARIOS MAS VIEJOS 
    Rep9: '', // 9. CANTIDAD DE USUARIOS BANEADOS
};

const reportes = (state = initialState, action) => {
    if(action.type === "SET_REP1"){
        return {
            ...state,
            Rep1: action.libros
        }
    } 
    if(action.type === "SET_REP2"){
        return {
            ...state,
            Rep2: action.usuarios
        }
    }
    if(action.type === "SET_REP3"){
        return {
            ...state,
            Rep3: action.totalComentarios
        }
    }
    if(action.type === "SET_REP4"){
        return {
            ...state,
            Rep4: action.totalLibros
        }
    }
    if(action.type === "SET_REP5"){
        return {
            ...state,
            Rep5: action.totalUsuarios
        }
    }
    if(action.type === "SET_REP6"){
        return {
            ...state,
            Rep6: action.LibrosViejos
        }
    }
    if(action.type === "SET_REP7"){
        return {
            ...state,
            Rep7: action.LibrosNuevos
        }
    }
    if(action.type === "SET_REP8"){
        return {
            ...state,
            Rep8: action.ComentariosViejos
        }
    }
    if(action.type === "SET_REP9"){
        return {
            ...state,
            Rep9: action.UsuariosBaneados
        }
    }
    return state;
}

export default reportes;