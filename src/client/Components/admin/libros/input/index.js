'use strict'

import React from 'react';
  
const Input = (props) => (
    <div className="container mt-5"> 
        {props.isLoading()}
        <h1 className="text-center">Nuevo - Editar Libro</h1> 
        <div className="form-group">
              <input type="text" className="form-control" placeholder="Titulo" onChange={props.handleChange} value={props.nuevoLibro.titulo} name="titulo" />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Autor" onChange={props.handleChange} value={props.nuevoLibro.autor} name="autor"/>
            </div>  
            <div className="form-group">
                <input type="number" className="form-control" placeholder="ISBN" onChange={props.handleChange} value={props.nuevoLibro.isbn} name="isbn" />
            </div> 
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Genero" onChange={props.handleChange} value={props.nuevoLibro.genero} name="genero" />
            </div> 
            <div className="form-group">
                <input type="file" className="form-control-file" name="libroImage" onChange={props.fileSelecterHandler} />
            </div> 
            {
            props.editState == false ? 
                <button onClick={()=> { props.AddLibro();  }} className="btn btn-dark btn-block">Guardar</button>
                :
                <button onClick={()=> { props.editarLibroo(); }} className="btn btn-dark btn-block">Editar</button>
            }  
    </div>
);

export default Input;