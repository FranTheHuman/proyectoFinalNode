'use strict'

import React from 'react';
  
const ComentariosU = (props) => (
    <div className="card-footer" id="perfil3"> 
        <h5>Comentarios</h5>
        { 
            props.err.message == "No comentarios found." ?
            null 
            :
            props.comentarios.map(comentario => {
                if(comentario.UsuarioId == props.id){
                    return(
                        <div key={comentario.id} className="card">
                            <div className="card-body" id="perfil"> 
                                {
                                    props.libros.map(libro => {
                                        if(libro.id == comentario.LibroId){
                                            return (
                                                <h5 key={libro.id} className="card-title">
                                                    {libro.titulo}
                                                </h5>
                                            )
                                        }
                                    })
                                    
                                }
                                <p className="card-text">{comentario.texto}</p>
                                <p className="card-text">{new Date(comentario.updatedAt).toString()}</p>
                                <button className="btn btn-danger mr-1" onClick={()=>{props.deleteComentario(comentario.id, props.id);}}><i className="fas fa-trash-alt"></i></button>
                                <button className="btn btn-warning ml-1" onClick={()=>props.setStateEdit(comentario.id)}><i className="fas fa-edit"></i></button>
                            </div>
                        </div>
                    )
                }   
        })}                     
    </div>
);

export default ComentariosU;
