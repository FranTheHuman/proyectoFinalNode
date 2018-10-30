'use stric'

import React from 'react';

const TablaLibrosUser = (props) => (
    <div className="row p-3"> 
    {
        props.libros.map(libro => {
            return(
                <div key={libro.id} className="col-md-3 mt-2">
                    <div className="card">
                        <img className="card-img-top" alt="" src={libro.libroImagen}/>
                    <div className="card-body text-center">
                        <h5 className="card-title">{libro.titulo}</h5>
                        <p className="card-text"><strong>ISBN:</strong> {libro.isbn}</p>
                        <p className="card-text"><strong>GENERO:</strong> {libro.genero}</p>
                        <p className="card-text"><strong>AUTOR:</strong> {libro.autor}</p>
                        <button  type="button" onClick={(e)=>{props.loadComentariosL(libro.id); props.loadNombresUsers(); e.preventDefault();}} className="btn btn-primary" data-toggle="modal" data-target="#ModalComentarios">¿Que te parecio este libro?</button> 
                      </div>
                    </div>
                </div>
            )
        })
    }
    </div> 
);

export default TablaLibrosUser;