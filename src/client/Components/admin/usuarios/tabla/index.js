'use strict'

import React from 'react';
  
const SearchU = (props) => (
    <table className="table table-warning table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">NOMBRE</th>
            <th scope="col">EMAIL</th> 
            <th scope="col">BAN</th> 
          </tr>
        </thead>
        <tbody>
          {
              props.users.length == 0 ?
              <tr><th scope="row">NO HAY USUARIOS</th></tr>
              : 
              props.users.map((user,i)=>{
                    if(user.admin){

                    } else {
                        if(!user.ban){
                            return(
                                <tr key={user.id}>
                                    <th scope="row">{i+1}</th>
                                    <td><a href={`/Perfil/${user.id}`}>{user.nombre}</a></td>
                                    <td>{user.email}</td> 
                                    <td>
                                        <button className="btn btn-danger" onClick={() => props.BanUser(user.id)} ><i className="fas fa-ban"></i></button> 
                                    </td>
                                </tr> 
                              )
                        } else {
                            var fechahoy = new Date(); 
                            var fechaBan = new Date(user.TiempoBan);
                            var diasdif= fechahoy.getTime()-fechaBan.getTime().toString();
                            const contdias = Math.round(diasdif/(1000*60*60*24));
        
                            return(
                                <tr className="bg-warning" key={user.id}>
                                    <th scope="row">{i+1}</th>
                                    <td><a href={`/Perfil/${user.id}`}>{user.nombre}</a></td>
                                    <td>{user.email}</td> 
                                    <td>
                                        <button className="btn btn-success" onClick={() => props.DesBanUser(user.id)} ><i className="fas fa-check-circle"></i></button> 
                                    </td>
                                    <td>Hace {contdias} Dias</td>
                                </tr> 
                            )
                        }
                    }
              })
          }
        </tbody>
    </table> 
);

export default SearchU;