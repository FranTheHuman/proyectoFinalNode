'use strict'

import validator from '../libs/Validators/index';

export const loadLibrosPagination = (page) => { 
    return dispatch => { 
        return fetch(`/LibrosPaginacion/${page}/api/v1`, { 
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
                            console.log(libros);
                            dispatch(deErrorDispatch());
                            dispatch(loadLibrosPagDispatch(data.libros, data.current, data.pages));
                         } 
                    })
                    .catch(err => console.log(err));
        };    
};

export const loadLibros = () => { 
    return dispatch => { 
        dispatch(setLoading());
        return fetch(`/Libros/api/v1`, { 
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
                            console.log(libros);
                            dispatch(deErrorDispatch());
                            dispatch(setLoading());
                            dispatch(loadLibrosDispatch(libros));
                         } 
                    })
                    .catch(err => console.log(err));
        };    
};

export const uploadImage = (image, page, isbn) => {
    var formData = new FormData(); 
    formData.append('libroImage', image);
    return dispatch => { 
        dispatch(setLoading());
        return fetch(`/LibroImage/${isbn}/api/v1`, { 
                    method: 'PUT', 
                    body: formData,
                    headers: { 
                        'Authorization': localStorage.getItem('jwtToken')
                    }
                })  
                    .then(res => res.json())
                    .then(data => {  
                        if(data.success == false){ 
                            dispatch(ErrorDispatch(data.message));
                            dispatch(setLoading());
                         } else {  
                            dispatch(deErrorDispatch()); 
                            dispatch(setLoading());
                            dispatch(loadLibrosPagination(page));
                         } 
                    })
                    .catch(err => console.log(err));
        };  
}

export const nuevoLibro = (libro, page) => {  
    // Le damos formato a los datos.
    // 1. Borramos espacios en blancos posibles en el isbn. replace(/\s+/gi,'')
    // 2. Quitamos posibles espacios en blanco al final y comienzo. trim()
    // 3. Formateamos la primera letra en mayusculas las demas en minusculas. MaysPrimera()
    // 4. Borramos posibles espacios en blanco seguidos. replace(/\s+/gi,' ')
    const body = {}
    body.titulo = validator.MaysPrimera(libro.titulo.replace(/\s+/gi,' ').trim());
    body.genero = validator.MaysPrimera(libro.genero.replace(/\s+/gi,' ').trim());
    body.autor = validator.MaysPrimera(libro.autor.replace(/\s+/gi,' ').trim())
    body.isbn = libro.isbn.replace(/\s+/gi,'').trim();
    return dispatch => { 
        return fetch(`/Libros/api/v1`, { 
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
                            const response = data; 
                            dispatch(deErrorDispatch());
                            dispatch(saveLibroDispatch(response));
                            dispatch(uploadImage(libro.libroImage, page, body.isbn));
                         } 
                    })
                    .catch(err => console.log(err));
        };  
};
 
export const editarLibro = (libro, page) => { 
    const body = {}
    body.titulo = validator.MaysPrimera(libro.titulo.replace(/\s+/gi,' ').trim());
    body.genero = validator.MaysPrimera(libro.genero.replace(/\s+/gi,' ').trim());
    body.autor = validator.MaysPrimera(libro.autor.replace(/\s+/gi,' ').trim())
    body.isbn = libro.isbn.replace(/\s+/gi,'').trim();    
    return dispatch => { 
        return fetch(`http://localhost:5000/Libros/${libro.id}/api/v1`, { 
                    method: 'PUT', 
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
                            dispatch(deErrorDispatch());
                            dispatch(loadLibrosPagination(page)); 
                        }  
                    })
                    .catch(err => console.log(err));
        };  
}; 

export const eliminarLibro = (isbn, page) => { 
    return dispatch => { 
    return fetch(`http://localhost:5000/Libros/${isbn}/api/v1`, { 
                    method: 'DELETE',  
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
                            dispatch(loadLibrosPagination(page)); 
                         }  
                    })
                    .catch(err => console.log(err));  
    } 
};


export const buscarLibro = (parametro) => { 
    if(parametro.replace(/\s+/gi,' ').trim() == " " || parametro == ""){
        return dispatch => { 
            return dispatch(loadLibrosPagination(1));
        }
    } else {
        return dispatch => { 
            return fetch(`/Libros/${parametro}/api/v1`, { 
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
                                    dispatch(searchLibroDispatch(libros));
                                 }
                            })
                            .catch(err => console.log(err));  
            }
    }
};

export const buscarLibroId = (id) => {  
        return dispatch => { 
            return fetch(`/LibrosId/${id}/api/v1`, { 
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
                                    dispatch(deErrorDispatch());
                                    dispatch(searchLibroDispatch(data));
                                 }
                            })
                            .catch(err => console.log(err));  
            } 
};

export const saveNewLibro = (libro) => { 
    return {
        type: "SAVE_NEW_LIBRO",
        libro: libro
    }
};

export const saveParametro = (parametro) => { 
    return {
        type: "SAVE_PARAMETRO",
        parametro
    }
};

export const setStateEdit = () => {
    return {
        type: "SET_STATE"
    }
};


const loadLibrosPagDispatch = (libros, current, pages) => { 
    return {
        type: "LOAD_LIBROS_PAGINATION",
        payload: {
            libros,
            current,
            pages
        }
    }
};

const loadLibrosDispatch = (libros) => { 
    return {
        type: "LOAD_LIBROS",
        libros
    }
};

const saveLibroDispatch = (libro) => { 
    return {
        type: "ADD_LIBROS",
        libro
    }
};

const searchLibroDispatch = (libros) => {
    return {
        type: "SEARCH_LIBRO",
        libros
    }
}

const setLoading = () => {
    return {
        type: 'SET_LOADING'
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