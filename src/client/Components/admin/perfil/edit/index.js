'use strict'

import React, {Fragment} from 'react';
  
const Edit = (props) => (
    <Fragment>
        {
            props.comentarios.edit == true ?
            <div className="container mt-5">
                <div className="form-group">
                    <textarea type="text" className="form-control" onChange={props.handleChange} placeholder="Texto" name="titulo" defaultValue={props.comentarios.newComentario.texto}/> 
                </div>
                <button onClick={()=> { this.props.editComentario(props.comentarios.newComentario);  }} className="btn btn-dark btn-block">Editar</button>
            </div>
            :
            null
        }
    </Fragment>
);

export default Edit;
