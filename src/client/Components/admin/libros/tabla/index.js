'use strict'

import React from 'react';
import Search from './search/index';
import Paginacion from './paginacion/index';
  
const Tabla = (props) => (
    <div className="mt-5">
        <div className="row">
            <div className="col-sm-8 ml-5">
                <table className="table table-warning table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">TITULO</th>
                        <th scope="col">AUTOR</th>
                        <th scope="col">ISBN</th>
                      </tr>
                    </thead>
                    <tbody> 
                        {
                            props.libros.length == 0 ?
                            <tr><th scope="row">NO HAY LIBROS</th></tr>
                            : 
                            props.libros.map((libro, i) => { 
                                return(
                                    <tr key={libro.id || -1}>
                                        <th scope="row">{i+1}</th>
                                        <td>{libro.titulo || "no data"}</td>
                                        <td>{libro.isbn || "no data"}</td>
                                        <td>{libro.autor || "no data"}</td>
                                        <td>
                                            <button className="btn btn-danger mr-1" onClick={()=> { props.EliminarLibro(libro.isbn, libro.titulo);}}><i className="fas fa-trash-alt"></i></button>
                                            <button className="btn btn-warning ml-1" onClick={()=> { props.EditarLibro(libro);}}><i className="fas fa-edit"></i></button>
                                        </td>
                                    </tr> 
                                ) 
                            })
                        }
                    </tbody>
                </table>   
                <Paginacion
                    pages={props.pages}
                    current={props.current}
                />
            </div>
            <Search
                BuscarLibro={props.BuscarLibro}
                parametro={props.parametro}
                handleChangeBuscar={props.handleChangeBuscar}
            />
        </div>
    </div>
);

export default Tabla;



