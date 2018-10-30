'use strict'

import React, {Component, Fragment} from 'react'; 
import * as actions from '../../../Actions/reportes';
import {connect} from 'react-redux';
import PdfConverter from 'jspdf';
import autoTable from 'jspdf-autotable';
import ReactToExcel from 'react-html-table-to-excel';
import {Redirect} from 'react-router-dom'
 
import Navegacion from '../navegacion/index'; 
import RenderError from '../../RenderError/index';

const style = {width: '18rem'};

class Reportes extends Component {

    componentDidMount(){
        this.props.loadRep1();
        this.props.loadRep2();
        this.props.loadRep3();
        this.props.loadRep4();
        this.props.loadRep5();
        this.props.loadRep6();
        this.props.loadRep7();
        this.props.loadRep8();
        this.props.loadRep9();
    }

    redirect = () => {  
        // guardamos el token q deberia encontrarse alli
        const token = localStorage.getItem('jwtToken'); 
        if(
            !token || // si el token es false (no esta definido o no posee nada)
            //props.users.userDetails == undefined || // o los datos del usuario no estan definidos
            this.props.users.userDetails.user.admin == false || // o los datos del usuario autenticado no es de un administrador
            this.props.users.err.message == "authentication failed." 
        ){
            // removemos el posible token q se encuentre en loclastorage
            //localStorage.removeItem('jwtToken');
            // Redireccionamos al login
            return <Redirect to='/Login'/>
        } 
    }

    onPrint = async (num) => {

        var doc = new PdfConverter('p','pt','c6');
        const Reporte = `Rep${num}`;
        const reporte = this.props.reportes[Reporte];
        
        if (num == 6) {
            doc.setFontSize(18);
            doc.setFont('times')
            doc.setFontType('bold')
            doc.text(40, 40, `LOS 10 LIBROS MAS VIEJOS`);
            doc.setFontType('normal')
            var columns = ["#", "Libro"];
            var rows = [];
            reporte.map((titulo, i) => {
                rows.push([i+1, titulo.titulo]); 
            }) 
            console.log(rows)
            doc.autoTable(columns, rows, {
                margin: {top: 50}
            });
            doc.save("test.pdf");

        } else if (num == 7) {
            doc.setFontSize(18);
            doc.setFont('times')
            doc.setFontType('bold')
            doc.text(40, 40, `LOS 10 LIBROS MAS NUEVOS`);
            doc.setFontType('normal')
            var columns = ["#", "Libro"];
            var rows = [];
            reporte.map((titulo, i) => {
                rows.push([i+1, titulo.titulo]); 
            }) 
            console.log(rows)
            doc.autoTable(columns, rows, {
                columnStyles: {
                    id: {fillColor: 255}
                },
                margin: {top: 50}
            });
            doc.save("test.pdf");

        } else if(num == 1) {
            doc.setFontSize(18);
            doc.setFont('times')
            doc.setFontType('bold')
            doc.text(40, 40, `10 LIBROS MAS COMENTADOS`);
            doc.setFontType('normal')
            var columns = ["#", "Libro", "Cantidad"];
            var rows = [];
            reporte.map((rep, i) => {
                rows.push([i+1, rep.Libro.titulo, rep.Cantidad]); 
            }) 
            console.log(rows)
            doc.autoTable(columns, rows, {
                columnStyles: {
                    id: {fillColor: 255}
                },
                margin: {top: 50}
            });
            doc.save("test.pdf");
        } else if (num == 2) {
            doc.setFontSize(18);
            doc.setFont('times')
            doc.setFontType('bold')
            doc.text(40, 40, `10 USUARIOS QUE MAS COMENTARON`);
            doc.setFontType('normal')
            var columns = ["#", "Usuario", "Cantidad"];
            var rows = [];
            reporte.map((rep, i) => {
                rows.push([i+1, rep.Usuario.nombre, rep.Cantidad]); 
            }) 
            console.log(rows)
            doc.autoTable(columns, rows, {
                columnStyles: {
                    id: {fillColor: 255}
                },
                margin: {top: 50}
            });
            doc.save("test.pdf");
        } else if (num == 8) {
            doc.setFontSize(18);
            doc.setFont('times')
            doc.setFontType('bold')
            doc.text(40, 40, `10 COMENTARIOS MAS VIEJOS`);
            doc.setFontType('normal')
            var columns = ["#", "Libro", "Texto"];
            var rows = [];
            reporte.map((rep, i) => {
                rows.push([i+1, rep.Libro.titulo, rep.texto]); 
            }) 
            console.log(rows)
            doc.autoTable(columns, rows, {
                columnStyles: {
                    id: {fillColor: 255}
                },
                margin: {top: 50}
            });
            doc.save("test.pdf");
        }
    }     

    render(){
        return(
           <Fragment>
               {this.redirect()}
               <Navegacion/>
                <div className="row mt-2 ml-4">
                    <RenderError
                        errC={{success: true}}
                        errU={{success: true}}
                        errL={{success: true}}
                    />
                    <div className="p-1">
                        <div className="card" style={style}>
                            <div className="card-header text-center">
                                <h5 className="card-title">TOTAL DE COMENTARIOS</h5>
                            </div>
                            {
                                this.props.reportes.Rep3 ? 
                                <div className="card-body text-center">
                                    <h5>{this.props.reportes.Rep3}</h5>
                                </div> 
                                :
                                <div className="card-body text-center">
                                    <h5>NO DATA</h5>
                                </div> 
                            } 
                        </div>
                    </div>  
                    <div className="p-1"> 
                        <div className="card" style={style}>
                            <div className="card-header  text-center">
                                <h5 className="card-title">TOTAL DE LIBROS ALMACENADOS</h5>
                            </div>
                            {
                                this.props.reportes.Rep4 ? 
                                <div className="card-body text-center">
                                    <h5>{this.props.reportes.Rep4}</h5>
                                </div> 
                                :
                                <div className="card-body text-center">
                                    <h5>NO DATA</h5>
                                </div> 
                            } 
                        </div>
                    </div> 
                    <div className="p-1">
                        <div className="card" style={style}>
                            <div className="card-header  text-center">
                                <h5 className="card-title">TOTAL DE USUARIOS REGISTRADOS</h5>
                            </div>
                            {
                                this.props.reportes.Rep5 ? 
                                <div className="card-body text-center">
                                    <h5>{this.props.reportes.Rep5}</h5>
                                </div> 
                                :
                                <div className="card-body text-center">
                                    <h5>NO DATA</h5>
                                </div> 
                            } 
                        </div>
                    </div>
                    <div className="p-1">
                        <div className="card" style={style}>
                            <div className="card-header  text-center">
                                <h5 className="card-title">CANTIDAD DE USUARIOS BANEADOS</h5>
                            </div>
                            {
                                this.props.reportes.Rep9 ? 
                                <div className="card-body text-center">
                                    <h5>{this.props.reportes.Rep9}</h5>
                                </div> 
                                :
                                <div className="card-body text-center">
                                    <h5>NO DATA</h5>
                                </div> 
                            } 
                        </div>
                    </div>
                </div>
                {/* SEGUNDA FILA */}
                <div className="row mt-2 ml-4">
                    <div className="p-1">
                        <div className="card">
                            <div className="card-header  text-center">
                                <h5 className="card-title">10 LIBROS MAS VIEJOS</h5>
                            </div>
                            <div className="card-body">
                                <table className="table" id="table1">
                                    <thead>
                                      <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Libro</th>  
                                      </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.reportes.Rep6 != null ?
                                            this.props.reportes.Rep6.map((rep, i) => {
                                                return(
                                                    <tr key={i+1}>
                                                        <th scope="row">{i+1}</th>
                                                        <td>{rep.titulo}</td> 
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>No Data</tr>
                                        }
                                    </tbody>
                                </table> 
                            </div>
                            <div className="card-footer">
                                <button  type="button" onClick={()=>{this.onPrint(6)}} className="btn btn-info btn-block">Descargar Pdf</button>
                                <ReactToExcel 
                                    className="btn btn-info btn-block"
                                    table="table1"
                                    filename="excelFile"
                                    sheet="sheet 1"
                                    buttonText= "Descargar Excel"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-1">
                        <div className="card">
                            <div className="card-header  text-center">
                                <h5 className="card-title">10 LIBROS MAS NUEVOS</h5>
                            </div>
                            <div className="card-body">
                            <table className="table" id="table2">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Libro</th>  
                                  </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.reportes.Rep7 != null ?
                                        this.props.reportes.Rep7.map((rep, i) => {
                                            return(
                                                <tr key={i+1}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{rep.titulo}</td> 
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>No Data</tr>
                                    }
                                </tbody>
                            </table>
                            </div>
                            <div className="card-footer">
                                <button  type="button" onClick={()=>{this.onPrint(7)}} class="btn btn-info btn-block">Descargar Pdf</button>
                                <ReactToExcel 
                                    className="btn btn-info btn-block"
                                    table="table2"
                                    filename="excelFile"
                                    sheet="sheet 1"
                                    buttonText= "Descargar Excel"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-1">
                        <div className="card">
                            <div className="card-header text-center">
                                <h5 className="card-title">10 LIBROS MAS COMENTADOS</h5>
                            </div>
                            <div className="card-body">
                                <table className="table" id="table3">
                                    <thead>
                                      <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Libro</th> 
                                        <th scope="col">Cantidad</th> 
                                      </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.reportes.Rep1 != null ?
                                            this.props.reportes.Rep1.map((rep, i) => {
                                                return(
                                                    <tr key={rep.Libro.id}>
                                                        <th scope="row">{i+1}</th>
                                                        <td>{rep.Libro.titulo}</td>
                                                        <td className="text-center">{rep.Cantidad}</td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>No Data</tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                                <button  type="button" onClick={()=>{this.onPrint(1)}} class="btn btn-info btn-block">Descargar Pdf</button>
                                <ReactToExcel 
                                    className="btn btn-info btn-block"
                                    table="table3"
                                    filename="excelFile"
                                    sheet="sheet 1"
                                    buttonText= "Descargar Excel"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-1">
                        <div className="card">
                            <div className="card-header  text-center">
                                <h5 className="card-title">10 USUARIOS QUE MAS COMENTARON</h5>
                            </div>
                            <div className="card-body">
                                <table className="table" id="table4">
                                    <thead>
                                      <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Usuario</th> 
                                        <th scope="col">Cantidad</th> 
                                      </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.reportes.Rep2 != null ?
                                            this.props.reportes.Rep2.map((rep, i) => {
                                                return(
                                                    <tr key={rep.Usuario.id}>
                                                        <th scope="row">{i+1}</th>
                                                        <td>{rep.Usuario.nombre}</td>
                                                        <td className="text-center">{rep.Cantidad}</td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>No Data</tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                                <button  type="button" onClick={()=>{this.onPrint(2)}} class="btn btn-info btn-block">Descargar Pdf</button>
                                <ReactToExcel 
                                    className="btn btn-info btn-block"
                                    table="table4"
                                    filename="excelFile"
                                    sheet="sheet 1"
                                    buttonText= "Descargar Excel"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-1">
                        <div className="card">
                            <div className="card-header  text-center">
                                <h5 className="card-title">10 COMENTARIOS MAS VIEJOS</h5>
                            </div>
                            <div className="card-body">
                            <table className="table" id="table5">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Libro</th> 
                                    <th scope="col">Texto</th> 
                                  </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.reportes.Rep8 != null ?
                                        this.props.reportes.Rep8.map((rep, i) => {
                                            return(
                                                <tr key={i+1}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{rep.Libro.titulo}</td> 
                                                    <td>{rep.texto}</td> 
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>No Data</tr>
                                    }
                                </tbody>
                            </table>
                            </div>
                            <div className="card-footer">
                                <button  type="button" onClick={()=>{this.onPrint(8)}} class="btn btn-info btn-block">Descargar Pdf</button>
                                <ReactToExcel 
                                    className="btn btn-info btn-block"
                                    table="table5"
                                    filename="excelFile"
                                    sheet="sheet 1"
                                    buttonText= "Descargar Excel"
                                />
                            </div>
                        </div>
                    </div>
                </div>
           </Fragment>  
        )
    }
};

const mapStateToProps = state => {
    return {
        reportes: state.reportes,
        users: state.users
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadRep1() {
            dispatch(actions.loadRep1());
        },
        loadRep2() {
            dispatch(actions.loadRep2());
        },
        loadRep3() {
            dispatch(actions.loadRep3());
        },
        loadRep4() {
            dispatch(actions.loadRep4());
        },
        loadRep5() {
            dispatch(actions.loadRep5());
        },
        loadRep6() {
            dispatch(actions.loadRep6());
        },
        loadRep7() {
            dispatch(actions.loadRep7());
        },
        loadRep8() {
            dispatch(actions.loadRep8());
        },
        loadRep9() {
            dispatch(actions.loadRep9());
        }  
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Reportes); 