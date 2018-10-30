'use stric'

import React from 'react';

const SearchLU = (props) => (
    <div className="row p-3 ml-2">
        <nav className="navbar navbar-light bg-light">
            <div className="form-inline">
              <input className="form-control mr-sm-2" type="search" onChange={props.handleChangeBuscar} value={props.parametro} placeholder="Titulo/Autor/ISBN"/>
              <button className="btn btn-success" onClick={()=>{props.BuscarLibro(props.parametro)}}>Search</button>
            </div>
        </nav>
    </div> 
);

export default SearchLU;