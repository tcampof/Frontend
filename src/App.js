import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { table } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const url = "https://localhost:44345/api/cliente";
class App extends React.Component {
  state = {
    data: [],
    modalInsertar: false,
    modalCliente: false,
    form: {
      CliId: '',
      CliIdent: '',
      CliNombre: '',
      CliTelefono: '',
      tipoModal: ''

    }
  }

  constructor(props) {
    super(props)
    this.modalInsertar = this.modalInsertar.bind(this);
  }

  peticionGet = () => {
    axios.get(url).then(response => {
      this.setState({ data: response.data });
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPost = async () => {
    delete this.state.form.id;
    await axios.post(url, this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPut = () => {
    axios.put(url + this.state.form.id, this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    })
  }

  componentDidMount() {
    this.peticionGet();
  }

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }

  modalCliente = () => {
    this.setState({ modalCliente: !this.state.modalCliente });
  }

  guardarCliente = () => {
    this.setState({ modalInsertar: false })
  }

  seleccionarCliente = (cliente) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        CliId: cliente.id,
        CliNombre: cliente.nombre,
        CliIdentificacion: cliente.identificacion,
        CliTelefono: cliente.telefono
      }
    })
  }

  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }

  render() {
    const { form } = this.state;
    return (
      <>
        <div className="container">
          <div id="layoutSidenav_content">
            <main>
              <div className="container mt-4">
                <div className="card invoice">
                  <div className="card-header p-4 p-md-5 border-bottom-0 bg-gradient-primary-to-secondary ">
                    <div className="row justify-content-between align-items-center">
                      <div className="col-12 col-lg-auto mb-5 mb-lg-0 text-center text-lg-left">
                        <h2>Factura Electronica</h2>
                      </div>
                      <div className="col-12 col-lg-auto text-center text-lg-right">
                        <div className="h3 ">Factura</div>
                                        #29301
                                        <br />
                      </div>
                    </div>
                    <div className="row justify-content-between align-items-center">
                      <div className="col-12 col-lg-auto mb-5 mb-lg-0 text-center text-lg-left">
                        <Button color="primary" className="btn-sm" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalCliente() }} >Buscar Cliente</Button>
                        <br />
                        <br />
                        <div className="form-inline">
                          <label for="">Identificación</label>
                          <input className="form-control" type="text" name="CliIdent" onChange={this.handleChange} readOnly />
                          <label for="">Nombre</label>
                          <input className="form-control" type="text" name="CliNombre" onChange={this.handleChange} readOnly />
                          <label for="">Telefono</label>
                          <input className="form-control" type="text" name="CliTelefono" onChange={this.handleChange} readOnly />

                        </div>
                      </div>
                      <div className="col-12 col-lg-auto text-center text-lg-right">
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-4 p-md-5">
                    <div className="table-responsive">
                      <table className="table table-borderless mb-0" size="sm">
                        <thead className="border-bottom">
                          <tr className="small text-uppercase text-muted">
                            <th scope="col">Codigo Producto</th>
                            <th className="text-right" scope="col">Nombre</th>
                            <th className="text-right" scope="col">Cantidad</th>
                            <th className="text-right" scope="col">Precio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.data.map(item => {
                            return (
                              <tr className="border-bottom">
                                <td>
                                  <div className="font-weight-bold">{}</div>
                                </td>
                                <td className="text-right font-weight-bold">{}</td>
                                <td className="text-right font-weight-bold">{}</td>
                                <td className="text-right font-weight-bold">0.00</td>
                              </tr>
                            )
                          })}

                          <tr>
                            <td className="text-right pb-0" colspan="3"><div className="text-uppercase small font-weight-700 text-muted">Subtotal:</div></td>
                            <td className="text-right pb-0"><div className="h5 mb-0 font-weight-700">0.00</div></td>
                          </tr>
                          <tr>
                            <td className="text-right pb-0" colspan="3"><div className="text-uppercase small font-weight-700 text-muted">Iva:</div></td>
                            <td className="text-right pb-0"><div className="h5 mb-0 font-weight-700">0.00</div></td>
                          </tr>
                          <tr>
                            <td className="text-right pb-0" colspan="3"><div className="text-uppercase small font-weight-700 text-muted">Total :</div></td>
                            <td className="text-right pb-0"><div className="h5 mb-0 font-weight-700 text-green">0.00</div></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>


        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            Agregar Cliente
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <input className="form-control" type="text" name="CliId" onChange={this.handleChange} value={form ? form.identificacion : ''} />
              <label for="">Identificación</label>
              <input className="form-control" type="text" name="CliIdent" onChange={this.handleChange} value={form ? form.identificacion : ''} />
              <label for="">Nombre</label>
              <input className="form-control" type="text" name="CliNombre" onChange={this.handleChange} value={form ? form.nombre : ''} />
              <label for="">Telefono</label>
              <input className="form-control" type="text" name="CliTelefono" onChange={this.handleChange} value={form ? form.telefono : ''} />
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.tipoModal == 'insertar' ?
              <button className="btn btn-success" onClick={() => this.peticionPost()}>
                Insertar
                  </button> : <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                Actualizar
                  </button>
            }
            <Button color="secondary" onClick={() => this.modalInsertar()}>Cerrar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalCliente}>
          <ModalHeader>
            Seleccionar Cliente
          </ModalHeader>
          <ModalBody>

            <Button color="success" className="btn-sm" onClick={() => this.modalInsertar()} >Agregar Cliente</Button>
            <table className="table table-borderless mb-0" size="sm">
              <thead>
                <tr>
                  <th>Cédula</th>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(item => {
                  return (
                    <tr>
                      <td>
                        <div>{item.CliIdent}</div>
                      </td>
                      <td className="text-right">{item.CliNombre}</td>
                      <td className="text-right">{item.CliTelefono}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => { this.seleccionarCliente(item); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                        {"   "}
                        <button className="btn btn-danger" onClick={() => { this.seleccionarCliente(item); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={() => this.peticionPost()}>Guardar</Button> */}
            <Button color="secondary" onClick={() => this.modalCliente()}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default App;
