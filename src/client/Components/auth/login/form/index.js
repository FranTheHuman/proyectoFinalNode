'use strict'

import React from 'react';

const formLogin = (props) => (
    <div className="card mt-5" id="LOGIN">
        <div className="card-body">
            <h1 className="text-center">
                <span className="fas fa-sign-in-alt">
                </span> Login
            </h1>        
                <div className="form-group">  
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={props.handleChange} placeholder="example@gmail.com" className="form-control" value={props.UserLogin.email} maxLength="50"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">  
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={props.handleChange}  value={props.UserLogin.password} className="form-control"/>
                </div>
                <button onClick={() => props.verificacion()} className="btn btn-dark btn-block">Ingresar</button> 
            <hr/>
            <div className="text-center">
                <p>¿Necesitas una cuenta? <a href="/signup">Signup</a></p> 
                <a href="/signup">¿Olvidaste tu constraseña?</a>
            </div>
        </div>
    </div>
);

export default formLogin;