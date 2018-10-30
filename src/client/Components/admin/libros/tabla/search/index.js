'use strict'

import React from 'react';
  
const Search = (props) => (
    <div className="col-3 mt-2">
        <div className="form-group"> 
            <input type="text" onChange={props.handleChangeBuscar} value={props.parametro} className="form-control" id="input" placeholder="Titulo/Autor/ISBN"/>
        </div> 
        <button onClick={()=>{props.BuscarLibro(props.parametro);}} className="btn btn-dark btn-block">Buscar</button>
    </div>
);

export default Search;

