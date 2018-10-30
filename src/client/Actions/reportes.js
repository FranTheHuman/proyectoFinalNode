'use strict'
 
export const loadRep1 = () => {
    return dispatch => { 
        return fetch(`/LibrosMasComentados/api/v1`, { 
                    method: 'GET', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('jwtToken')
                    }
                })  
                    .then(res => res.json())
                    .then(data => {  
                        if(data.success == false){ 
                            dispatch(ErrorDispatch(data.message)); 
                        } else {   
                           const libros = data; 
                           dispatch(deErrorDispatch()); 
                           dispatch(loadRep1Dispatch(libros)); 
                        }  
                    })
                    .catch(err => console.log(err));
        };
}

export const loadRep2 = () => {
    return dispatch => { 
        return fetch(`/UsuariosMasComentaron/api/v1`, { 
                    method: 'GET', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('jwtToken')
                    }
                })  
                    .then(res => res.json())
                    .then(data => {  
                        if(data.success == false){ 
                            dispatch(ErrorDispatch(data.message)); 
                        } else {   
                           const usuarios = data; 
                           dispatch(deErrorDispatch()); 
                           dispatch(loadRep2Dispatch(usuarios)); 
                        }  
                    })
                    .catch(err => console.log(err));
        };
}
export const loadRep3 = () => {
    return dispatch => { 
        return fetch(`/TotalComentarios/api/v1`, { 
                    method: 'GET', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('jwtToken')
                    }
                })  
                    .then(res => res.json())
                    .then(data => {  
                        if(data.success == false){ 
                            dispatch(ErrorDispatch(data.message)); 
                        } else {   
                           const totalComentarios = data; 
                           dispatch(deErrorDispatch()); 
                           dispatch(loadRep3Dispatch(totalComentarios)); 
                        }  
                    })
                    .catch(err => console.log(err));
        };
}
export const loadRep4 = () => {
    return dispatch => { 
        return fetch(`/TotalLibros/api/v1`, { 
                    method: 'GET', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('jwtToken')
                    }
                })  
                    .then(res => res.json())
                    .then(data => {  
                        if(data.success == false){ 
                            dispatch(ErrorDispatch(data.message)); 
                        } else {   
                           const totalLibros = data; 
                           dispatch(deErrorDispatch()); 
                           dispatch(loadRep4Dispatch(totalLibros)); 
                        }  
                    })
                    .catch(err => console.log(err));
        };
}
export const loadRep5 = () => {
    return dispatch => { 
        return fetch(`/TotalUsuarios/api/v1`, { 
                    method: 'GET', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('jwtToken')
                    }
                })  
                    .then(res => res.json())
                    .then(data => {  
                        if(data.success == false){ 
                            dispatch(ErrorDispatch(data.message)); 
                        } else {   
                           const totalUsuarios = data; 
                           dispatch(deErrorDispatch()); 
                           dispatch(loadRep5Dispatch(totalUsuarios)); 
                        }  
                    })
                    .catch(err => console.log(err));
        };
}
export const loadRep6 = () => {
    return dispatch => { 
        return fetch(`/LibrosMasViejos/api/v1`, { 
                    method: 'GET', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('jwtToken')
                    }
                })  
                    .then(res => res.json())
                    .then(data => {  
                        if(data.success == false){ 
                            dispatch(ErrorDispatch(data.message)); 
                        } else {   
                           const LibrosViejos = data; 
                           dispatch(deErrorDispatch()); 
                           dispatch(loadRep6Dispatch(LibrosViejos)); 
                        }  
                    })
                    .catch(err => console.log(err));
        };
}
export const loadRep7 = () => {
    return dispatch => { 
        return fetch(`/LibrosMasNuevos/api/v1`, { 
                    method: 'GET', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('jwtToken')
                    }
                })  
                    .then(res => res.json())
                    .then(data => {  
                        if(data.success == false){ 
                            dispatch(ErrorDispatch(data.message)); 
                        } else {   
                           const LibrosNuevos = data; 
                           dispatch(deErrorDispatch()); 
                           dispatch(loadRep7Dispatch(LibrosNuevos)); 
                        }  
                    })
                    .catch(err => console.log(err));
        };
}
export const loadRep8 = () => {
    return dispatch => { 
        return fetch(`/ComentariosMasViejos/api/v1`, { 
                    method: 'GET', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('jwtToken')
                    }
                })  
                    .then(res => res.json())
                    .then(data => {  
                        if(data.success == false){ 
                            dispatch(ErrorDispatch(data.message)); 
                        } else {   
                           const ComentariosViejos = data; 
                           dispatch(deErrorDispatch()); 
                           dispatch(loadRep8Dispatch(ComentariosViejos)); 
                        }  
                    })
                    .catch(err => console.log(err));
        };
}
export const loadRep9 = () => {
    return dispatch => { 
        return fetch(`/UsuariosBaneados/api/v1`, { 
                    method: 'GET', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('jwtToken')
                    }
                })  
                    .then(res => res.json())
                    .then(data => {  
                        if(data.success == false){ 
                            dispatch(ErrorDispatch(data.message)); 
                        } else {   
                           const UsuariosBaneados = data; 
                           dispatch(deErrorDispatch()); 
                           dispatch(loadRep9Dispatch(UsuariosBaneados)); 
                        }  
                    })
                    .catch(err => console.log(err));
        };
}

const loadRep1Dispatch = (libros) => {
    return {
        type: "SET_REP1",
        libros
    }
}
const loadRep2Dispatch = (usuarios) => {
    return {
        type: "SET_REP2",
        usuarios
    }
}
const loadRep3Dispatch = (totalComentarios) => {
    return {
        type: "SET_REP3",
        totalComentarios
    }
}
const loadRep4Dispatch = (totalLibros) => {
    return {
        type: "SET_REP4",
        totalLibros
    }
}
const loadRep5Dispatch = (totalUsuarios) => {
    return {
        type: "SET_REP5",
        totalUsuarios
    }
}
const loadRep6Dispatch = (LibrosViejos) => {
    return {
        type: "SET_REP6",
        LibrosViejos
    }
}
const loadRep7Dispatch = (LibrosNuevos) => {
    return {
        type: "SET_REP7",
        LibrosNuevos
    }
}
const loadRep8Dispatch = (ComentariosViejos) => {
    return {
        type: "SET_REP8",
        ComentariosViejos
    }
}
const loadRep9Dispatch = (UsuariosBaneados) => {
    return {
        type: "SET_REP9",
        UsuariosBaneados
    }
}


export const ErrorDispatch = (err) => {  
    return {
        type: "SET_ERROR",
        err
    }
};

export const deErrorDispatch = () => {
    return {
        type: "DE_SET_ERROR" 
    }
};