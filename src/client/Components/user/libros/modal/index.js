'use strict'

import React from 'react';

const Modal = (props) => (
    <div className="modal fade bd-example-modal-lg" id="ModalComentarios" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLabel">Comentarios</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body"> 
            {
                props.comentarios.length == 0 ? 
                    <p>No hay comentarios aún</p>
                :
                props.comentarios.map(comentario => {  
                    let usuario = "";
                    props.users.map(user => { if(user.id == comentario.UsuarioId){ usuario = user.nombre}  });  
                    return(
                        <div key={comentario.id} className="form-group p-1">
                            <textarea className="form-control" value={comentario.texto} readOnly disabled/>
                            <div className="row">  
                                <div className="col text-center">  
                                    <input type="text" className="form-control-plaintext" defaultValue={usuario} readOnly disabled/>  
                                </div>
                                <div className="col text-center">  
                                    <input type="text" className="form-control-plaintext" defaultValue={`${new Date(comentario.createdAt).getMonth()+1}/${new Date(comentario.createdAt).getDate()}/${new Date(comentario.createdAt).getFullYear()}-${new Date(comentario.createdAt).getHours()}hs`} readOnly disabled/>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
                </div>
                <div className="modal-footer">  
                    <div className="container mt-2"> 
                        {props.Error()}
                        <div className="form-group"> 
                          <textarea className="form-control" onChange={props.handleChange} value={props.nuevoComentario.texto} name="texto"></textarea>
                        </div>
                        <button type="button" onClick={()=>{props.EnviarComentario()}} className="btn btn-primary btn-block">Comentar</button>
                    </div> 
                </div>
            </div>
        </div>
    </div>
);

export default Modal;