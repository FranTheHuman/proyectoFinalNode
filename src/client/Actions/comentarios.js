'use strict'

import validator from '../libs/Validators/index';

export const loadComentarios = (user) => { 
    return dispatch => { 
        return fetch(`/ComentariosA/${user}/api/v1`, { 
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
                            console.log(data.message);  
                            dispatch(ErrorDispatch(data.message));
                         } else {   
                            const comentarios = data;
                            console.log(comentarios);
                            dispatch(deErrorDispatch()); 
                            dispatch(loadComentarioDispatch(comentarios));
                         } 
                    })
                    .catch(err => console.log(err));
        };    
};
export const loadAllComentarios = () => { 
    return dispatch => { 
        return fetch(`/Comentarios/api/v1`, { 
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
                            console.log(data.message);  
                            dispatch(ErrorDispatch(data.message));
                         } else {   
                            const comentarios = data;
                            console.log(comentarios);
                            dispatch(deErrorDispatch()); 
                            dispatch(loadComentarioDispatch(comentarios));
                         } 
                    })
                    .catch(err => console.log(err));
        };    
};
export const loadComentariosL = (libro) => { 
    return dispatch => { 
        return fetch(`/ComentariosL/${libro}/api/v1`, { 
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
                            if(data.message == 'No data found.'){
                                dispatch(deErrorDispatch()); 
                                const comentarios = [];
                                dispatch(setIdNewComentario(libro));
                                dispatch(loadComentarioDispatch(comentarios));
                            } else {
                                console.log(data.message);  
                                dispatch(ErrorDispatch(data.message));
                            }
                         } else {   
                            const comentarios = data;
                            console.log(comentarios);
                            dispatch(deErrorDispatch()); 
                            dispatch(setIdNewComentario(libro));
                            dispatch(loadComentarioDispatch(comentarios));
                         } 
                    })
                    .catch(err => console.log(err));
        };    
};

export const editComentario = (comentario) => { 
    if(!validator.verificarTexto(comentario.texto)){
        return dispatch => {
            return dispatch(ErrorDispatch('Formato de texto no valido'));
        } 
    } else {
        return dispatch => { 
            return fetch(`/Comentarios/${comentario.id}/api/v1`, { 
                        method: 'PUT', 
                        body: JSON.stringify(comentario),
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
                            dispatch(deErrorDispatch()); 
                            dispatch(setStateEdit("-1"));
                            dispatch(loadComentarios(comentario.UserId));
                            dispatch(clearComentario()); 
                         } 
                    })
                        .catch(err => console.log(err.message));
            }; 
    }
}

export const setNewComentario = (texto, usuario) => {
    return {
        type: "SET_NEW_COMENTARIO",
        payload: {
            texto,
            UserId : usuario
        }
    }
    
}

export const Comentar = (comentario) => {
    const body = {}
    body.texto = validator.MaysPrimera(comentario.texto.replace(/\s+/gi,' ').trim());
    body.UsuarioId = comentario.UserId;
    body.LibroId = comentario.LibroId;
    return dispatch => { 
        return fetch(`/Comentarios/api/v1`, { 
                    method: 'POST', 
                    body: JSON.stringify(body),
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
                            const libro = data;
                            console.log(libro);
                            dispatch(deErrorDispatch()); 
                            dispatch(loadComentariosL(comentario.LibroId));
                            dispatch(clearComentario()); 
                         } 
                    })
                    .catch(err => console.log(err));
        }; 
}

export const deleteComentario = (id, user) => {  
    return dispatch => { 
        return fetch(`/Comentarios/${id}/api/v1`, { 
                    method: 'DELETE', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('jwtToken')
                    }
                })  
                    .then(res => {
                        dispatch(deErrorDispatch());
                        dispatch(loadComentarios(user)); 
                    })
                    .catch(err => console.log(err.message));
        };
}

export const setStateEdit = (id) => {
    return {
        type: "SET_STATE",
        id
    }
};

const setIdNewComentario = (libro) => {
    return {
        type: "SET_ID_NEW_COMENTARIO",
        libro
    }
}

const loadComentarioDispatch = (comentarios) => {
    return {
        type: "LOAD_COMENTARIOS",
        comentarios
    }
};
 
const clearComentario = () => {
    return {
        type: "CLEAR_NEW_COMENTARIO"
        
    } 
}

const ErrorDispatch = (err) => {  
    return {
        type: "SET_ERROR",
        err
    }
};

const deErrorDispatch = () => {
    return {
        type: "DE_SET_ERROR" 
    }
};