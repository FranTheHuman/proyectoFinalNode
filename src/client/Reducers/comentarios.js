'use strict'

const initialState = {
    comentarios: [],
    nuevoComentario: { texto: '', UserId: '', LibroId: '' },
    editComentario: { id: '', texto: '', UserId: '' },
    idLibro: '',
    edit: false,
    err: { success: true, msg: ''}
};

const comentarios = (state = initialState, action) => { 
    if(action.type === "LOAD_COMENTARIOS"){
        if(action.comentarios[0] == undefined){
            return {
                ...state,
                comentarios: []
            }
        } else {
            return {
                ...state,
                comentarios: action.comentarios
            }
        }
    }
    if(action.type === "CLEAR_NEW_COMENTARIO"){
        return {
            ...state,
            nuevoComentario: { texto: '', UserId: '', LibroId: '' }
        }
    }
    if(action.type === "SET_ID_NEW_COMENTARIO"){
        return {
            ...state,
            idLibro: action.libro 
        } 
    }
    if(action.type === "SET_NEW_COMENTARIO"){
        return {
            ...state,
            nuevoComentario: { texto : action.payload.texto, UserId: action.payload.UserId, LibroId: state.idLibro } 
        }
    }
    if(action.type === "SET_STATE"){
        let comentarioo = ''; 
        state.comentarios.map(comentario => { 
            if(comentario.id == action.id){
                comentarioo = comentario
            }
        });
        return {
            ...state,
            edit: !state.edit,
            editComentario: { id : action.id, texto: comentarioo.texto }
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
 
export default comentarios;