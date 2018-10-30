'use strict'

import React, {Fragment} from 'react';
  
const EditCU = (props) => (
    <Fragment>
        {
            props.edit == true ?
            <div className="container mt-5">
                <div className="form-group">
                    <textarea type="text" className="form-control" onChange={props.handleChange} placeholder="Texto" name="titulo" defaultValue={props.editComentario.texto}/> 
                </div>
                <button onClick={()=> { props.EditComentario(props.editComentario);  }} className="btn btn-dark btn-block">Editar</button>
            </div>
            :
            null
        }
    </Fragment>
);

export default EditCU;
