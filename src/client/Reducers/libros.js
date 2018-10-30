'use strict'

const initialState = {
    libros: [], 
    current: '', // Datos para la paginacion
    pages: '', // Datos para la paginacion
    newLibro: { id: '', titulo: '', isbn: '', autor: '', genero: '', libroImage: '' }, // Datos para la creacion y edicion de libros
    edit: false, // Bandera que determina si se esta editando o creando un libro 
    parametro: '', // Parametro para la busqueda de un libro
    err: { success: true, message: ''}, // Objeto para el manejo de errores
    loading: false
};

const libros = (state = initialState, action) => {
    if(action.type === "LOAD_LIBROS_PAGINATION"){
        return {
            ...state,
            libros: action.payload.libros,
            current: action.payload.current,
            pages: action.payload.pages,
            newLibro: { id: '', titulo: '', isbn: '', autor: '', genero: '', libroImage: '' }
        }
    }
    if(action.type === "LOAD_LIBROS"){
        state.merge({
            visibility: true,
            mediaId: action.payload.mediaId
        });
        return {
            ...state,
            libros: action.libros
        }
    }
    if(action.type === "SET_LOADING"){
        return {
            ...state,
            loading: !state.loading
        }
    }
    if(action.type === "ADD_LIBRO") {    
        return {
            ...state   
        }; 
    }  
    if(action.type === "SEARCH_LIBRO") {
        return {
            ...state,
            libros: action.libros 
        };
    }
    if(action.type === "SAVE_NEW_LIBRO"){
        return {
            ...state,
            newLibro: action.libro
        };  
    }
    if(action.type === "SET_STATE"){
        return {
            ...state,
            edit: !state.edit
        }; 
    }
    if(action.type === "SAVE_PARAMETRO"){
        return {
            ...state,
            parametro: action.parametro
        };  
    }
    if(action.type === "SET_ERROR"){
        return { 
            ...state,
            err: { success: false, message: action.err.toString()}
        };  
    }
    if(action.type === "DE_SET_ERROR"){
        return { 
            ...state,
            err: { success: true, message: ''}
        };    
    }
    return state;
}

export default libros;