'use strict'

import React from 'react';
  
const SearchU = (props) => (
    <div className="col-3 mt-2">
        <div className="form-group"> 
            <input type="text" className="form-control" onChange={props.handleChangeBuscar} value={props.parametro} placeholder="Email/Nombre"/>
        </div> 
        <button onClick={() => props.buscarUser(props.parametro)} className="btn btn-dark btn-block">Buscar</button>
    </div>
);

export default SearchU;