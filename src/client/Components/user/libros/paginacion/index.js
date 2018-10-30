'use stric'

import React from 'react';

const PaginacionLU = (props) => (
    <nav aria-label="Page navigation example">
        { 
            props.pages > 0 ?  // SI hay paginas se muestra la paginacion
                /*  PREVIUS/FIRST ITEM */ 
                props.current == 1 &&  props.pages == 1 ?// Si la pagina es la primera se muestrala siguiente paginacion
                <ul className="pagination justify-content-center"> 
                    <li className="page-item"><a className="page-link" href={`/LibrosU/${props.current}`}><strong>1</strong></a></li>
                </ul>
                :
                props.current == 1 &&  props.pages > 2 ?// Si la pagina es la primera se muestrala siguiente paginacion
                <ul className="pagination justify-content-center">
                    <li className="page-item disabled"> <a className="page-link" href="#" >Previous</a> </li> 
                    <li className="page-item"><a className="page-link" href={`/LibrosU/${props.current}`}><strong>1</strong></a></li>
                    <li className="page-item"><a className="page-link" href={`/LibrosU/${props.current+1}`}>2</a></li>
                    <li className="page-item"><a className="page-link" href={`/LibrosU/${props.current+2}`}>3</a></li> 
                    <li className="page-item"><a className="page-link" href={`/LibrosU/${props.pages}`}>Last</a></li> 
                </ul>
                // si la pagina no es la primera se pregunta si es la ultima o mayor
                :
                props.current >= props.pages ? // si es la ultima se muestra la siguiente paginacion
                <ul className="pagination justify-content-center">
                    <li class="page-item"> <a className="page-link" href={`/LibrosU/1`}>First</a> </li> 
                    <li class="page-item"> <a className="page-link" href={`/LibrosU/${props.current-1}`}>Previous</a></li> 
                    <li class="page-item disabled"> <a className="page-link" href="#">Last</a> </li>
                </ul>
                : // si no es la ultima ni la primera se muestra la siguiente paginacion
                // si la cantidad de paginas menos la pagina actual da 3 o mas se muestra lo siguiente 
                (props.pages-props.current) >= 3 ?
                <ul className="pagination justify-content-center">
                    <li className="page-item"> <a className="page-link" href={`/LibrosU/1`}>First</a> </li> 
                    <li className="page-item"> <a className="page-link" href={`/LibrosU/${props.current-1}`} >Previous</a> </li> 
                    <li className="page-item"><a className="page-link" href={`/LibrosU/${props.current}`}><strong>{props.current}</strong></a></li>
                    <li className="page-item"><a className="page-link" href={`/LibrosU/${props.current+1}`}>{props.current+1}</a></li>
                    <li className="page-item"><a className="page-link" href={`/LibrosU/${props.current+2}`}>{props.current+2}</a></li> 
                    <li className="page-item"><a className="page-link" href={`/LibrosU/${props.current+3}`}>{props.current+3}</a></li>
                    <li className="page-item"><a className="page-link" href={`/LibrosU/${props.pages}`}>Last</a></li>   
                </ul>  
                : // si la cantidad de paginas menos la pagina actual da menos de 3 se muestra lo siguiente
                <ul className="pagination justify-content-center">
                    <li className="page-item"> <a className="page-link" href={`/LibrosU/1`}>First</a> </li> 
                    <li className="page-item"> <a className="page-link" href={`/LibrosU/${props.current-1}`} >Previous</a> </li> 
                    <li className="page-item"><a className="page-link" href={`/LibrosU/${props.current}`}><strong>{props.current}</strong></a></li>
                    <li className="page-item"><a className="page-link" href={`/LibrosU/${props.current+1}`}>{props.current+1}</a></li>
                    <li className="page-item"><a className="page-link" href={`/LibrosU/${props.current+2}`}>{props.current+2}</a></li> 
                </ul>                     
            :   // si no hay pagnas no se muestra nada
                null
        } 
    </nav>
);

export default PaginacionLU;