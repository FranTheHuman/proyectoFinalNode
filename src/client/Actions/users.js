'use strict'
 
import jwt from 'jsonwebtoken'; 

export const BanUser = (id) => {   
    return dispatch => { 
        return fetch(`/UserBan/${id}/api/v1`, { 
                    method: 'PUT', 
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
                            dispatch(loadUsers()); 
                        }  
                    })
                    .catch(err => console.log(err));
        };  
};

export const DesBanUser = (id) => { 
    return dispatch => { 
        return fetch(`/UserDesBan/${id}/api/v1`, { 
                    method: 'PUT', 
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
                            dispatch(loadUsers()); 
                        }  
                    })
                    .catch(err => console.log(err));
        }; 
};

export const loadUsers = () => { 
    return dispatch => { 
        return fetch(`/Users/api/v1`, { 
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
                           const users = data; 
                           dispatch(deErrorDispatch()); 
                           dispatch(loadUsersDispatch(users)); 
                        }  
                    })
                    .catch(err => console.log(err));
        }; 
}; 

export const loadNombresUsers = () => {
    return dispatch => { 
        return fetch(`/UsersNames/api/v1`, { 
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
                           const users = data; 
                           dispatch(deErrorDispatch()); 
                           dispatch(loadUsersDispatch(users)); 
                        }  
                    })
                    .catch(err => console.log(err));
        };
}

export const buscarUser = (parametro) => { 
    return dispatch => { 
        return fetch(`/Users/${parametro}/api/v1`, { 
                        method: 'GET',  
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('jwtToken')
                        }
                    })  
                        .then(res => res.json())
                        .then(data => {  
                            const users = data;
                            console.log(data);
                            dispatch(buscarUserDispatch(users));

                        })
                        .catch(err => console.log(err));  
        } 
};

export const saveParametro = (parametro) => { 
    return {
        type: "SAVE_PARAMETRO_USER",
        parametro
    }
};
export const loadUsersPagination = (page) => { 
    return dispatch => { 
        return fetch(`/UsersPaginacion/${page}/api/v1`, { 
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
                            dispatch(loadUsersPagDispatch(data.usuarios, data.current, data.pages));
                         } 
                    })
                    .catch(err => console.log(err));
        };    
};
  
const loadUsersPagDispatch = (users, current, pages) => { 
    return {
        type: "LOAD_USERS_PAGINATION",
        payload: {
            users,
            current,
            pages
        }
    }
};

const buscarUserDispatch = (users) => { 
    return {
        type: "SEARCH_USER",
        users
    }
};

const loadUsersDispatch = (users) => {
    return {
        type: "LOAD_USERS",
        users
    }
};

/* 
|--------------------------------------------------------------------------
| AUTORIZATION 
|--------------------------------------------------------------------------
*/

export const saveNewLogin = (user) => {
    return {
        type: "SAVE_NEW_LOGIN",
        user
    }
}

export const fetchlOGIN = (user) => {   
    return dispatch => { 
        return fetch(`/Login`, { method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })  
                    .then(res => res.json())
                    .then(data => {  
                        if(data.success == false){
                            dispatch(ErrorDispatch(data.message));
                        } else {
                            const token = data.token;
                            const user = jwt.decode(data.token);
                            localStorage.setItem('jwtToken', token) 
                            dispatch(deErrorDispatch());
                            dispatch(LoadLoginDispatch(user)); 
                        }
                    })
                    .catch(err => console.log(err));
        };   
}

const LoadLoginDispatch = (user) => {  
    return {
        type: "LOGIN_USER",
        user
    }
}

export const fetchSIGNUP = (user) => {   
    return dispatch => { 
        return fetch(`/Signup`, { method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })  
                    .then(res => res.json())
                    .then(data => {  
                        if(data.success == false){
                            dispatch(ErrorDispatch(data.message));
                        } else {
                            const token = data.token;
                            const user = jwt.decode(data.token);
                            localStorage.setItem('jwtToken', token) 
                            dispatch(deErrorDispatch());
                            dispatch(LoadSignupDispatch(user));  
                        } 
                        
                    })
                    .catch(err => console.log(err));
        };   
}

const LoadSignupDispatch = (user) => {  
    return {
        type: "SIGN_UP_USER",
        user
    }
}

export const ErrorDispatch = (err) => {  
    return {
        type: "SET_ERROR",
        err
    }
}

export const deErrorDispatch = () => {
    return {
        type: "DE_SET_ERROR" 
    }
};

export const Logout = () => {
    localStorage.removeItem('jwtToken');
    return dispatch => { 
        return fetch(`/Logout`, { method: 'GET', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })  
                    .then(res => res.json())
                    .then(data => {  
                        dispatch(deErrorDispatch());
                        dispatch(LogoutDispatch()); 
                    })
                    .catch(err => {
                        console.log(err); 
                    });
        };  

}   

export const LogoutDispatch = () => {  
    return {
        type: "LOGOUT" 
    }
}

export const setCurrentUser = (user) => {  
    return {
        type: "SET_CURRENT_USER",
        user
    }
}

 