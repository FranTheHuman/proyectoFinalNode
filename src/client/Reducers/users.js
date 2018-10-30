'use strict'

const initialState = {
    users: [], 
    current: '', // Datos para la paginacion
    pages: '', // Datos para la paginacion
    parametro: '', // Parametro para la busqueda
    UserLogin: { nombre: '', email: '', password: '', passwordOwO: '' }, // Datos para el inicio/registro de session
    isAuthenticated: false, // Determina si esta autenticado
    userDetails: {},  // detalles del usuario de la sesion
    err: { success: true, message: ''}, // Objeto para el manejo de errores
};

const user = (state = initialState, action) => { 
    if(action.type === "LOAD_USERS") {
        return {
            ...state,
            users: action.users 
        }
    }
    if(action.type === "LOAD_USERS_PAGINATION"){
        return {
            ...state,
            users: action.payload.users,
            current: action.payload.current,
            pages: action.payload.pages 
        }
    } 
    if(action.type === "SEARCH_USER") {
        return {
            ...state,
            users: action.users 
        };
    }
    if(action.type === "SAVE_NEW_LOGIN"){
        return {
            ...state, 
            UserLogin: action.user
        }; 
    }
    if(action.type === "LOGIN_USER") { 
        var status = false;
        if(action.user){
            status = true;
        }
        return { 
            ...state,  
            isAuthenticated: status,
            userDetails: action.user,
            UserLogin: { nombre: '', email: '', password: '', passwordOwO: '' }
        }; 
    } 
    if(action.type === "SIGN_UP_USER") { 
        var status = false;
        if(action.user){
            status = true;
        } 
        return { 
            ...state,  
            isAuthenticated: status,
            userDetails: action.user,
            UserLogin: { nombre: '', email: '', password: '', passwordOwO: '' }
        }; 
    } 
    if(action.type === "LOGOUT") {  
        return {  
            ...state,
            isAuthenticated: false,
            users: [], 
            current: '', 
            pages: '', 
            parametro: '', 
            UserLogin: { nombre: '', email: '', password: '', passwordOwO: '' },
            userDetails: {}
        }; 
    }
    if(action.type === "SET_CURRENT_USER") {
        return { 
            ...state,  
            isAuthenticated: true,
            userDetails: action.user  
        }; 
    }
    if(action.type === "SAVE_PARAMETRO_USER"){
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

export default user;