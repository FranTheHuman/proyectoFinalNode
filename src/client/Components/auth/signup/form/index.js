'use strict'

import React from 'react';

const formSignUp = (props) => (
    <div className="card mt-5" id="SIGNUP">
        <div className="card-body">
            <h1 className="text-center">
                <span className="fas fa-sign-in-alt">
                </span> SignUp
            </h1>       
                <div className="form-group">  
                    <label htmlFor="nombre">Name</label>
                    <input type="text" name="nombre" onChange={props.handleChange} value={props.UserLogin.nombre} className="form-control"/>
                    <small id="emailHelp" className="form-text text-muted">Min 6 characters.</small>
                </div>
                <div className="form-group">  
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={props.handleChange} value={props.UserLogin.email} className="form-control"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">  
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={props.handleChange} value={props.UserLogin.password} className="form-control"/>
                    <small id="passwordHelp" className="form-text text-muted">Min 6 characters, 1 capital letter, 1 lower case and 1 number.</small>
                </div>
                <div className="form-group">  
                    <label htmlFor="password2">Repeat Password</label>
                    <input type="password" name="passwordOwO" onChange={props.handleChange} value={props.UserLogin.passwordOwO} className="form-control"/>
                </div>
                <button onClick={() => props.verificacion() } className="btn btn-dark btn-block">Ingresar</button> 
            <hr/>
            <div className="text-center">
                <p>¿Ya tienes una cuenta? <a href="/Login">Login</a></p>  
            </div>
        </div>
    </div>
);

export default formSignUp;