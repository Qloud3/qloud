import React from "react";
import styles from "./Ventas.module.css";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
  Table,
} from "reactstrap";

const BASE_URL = process.env.REACT_APP_API_URL;
const PATH_VENTAS = "venta";
class Ventas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data,
      modalActualizar: false,
      modalInsertar: false,
      form: {
        _id: "",
        valor_total: "",
        fecha_venta: "",
        documento_cliente: "",
        nombre_cliente: "",
        vendedor: "",
        estado: ""
      },
    };
  }

  componentDidMount() {
    this.cargarVentas();
  }

  mostrarModalActualizar = (dato) => {
    this.setState({ modalActualizar: true, form: dato });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
      form: {
        valor_total: "",
        fecha_venta: "",
        documento_cliente: "",
        nombre_cliente: "",
        vendedor: "",
        estado: "",
      },
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    this.actualizarVenta(dato);
    this.setState({ modalActualizar: false });
  };

  eliminar = (dato) => {
    let option = window.confirm(
      "¿Esta seguro de eliminar la venta: " + dato._id + "?"
    );

    if (option) {
      this.borrarVenta(dato._id);
    }
  };

  insertar = () => {
    let newVenta = { ...this.state.form };

    this.crearventas(newVenta);

    this.setState({ modalInsertar: false });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <Container>
        <br />
        <Row className="section-title">
          <Col md="8">
            <h2>Modulo Ventas</h2>
            <p>En este módulo podras administrar las venta.</p>
          </Col>
          <Col md="4" className="d-flex justify-content-end">
            <div class="align-self-end">
              <Button
                color="primary w-100"
                onClick={() => this.mostrarModalInsertar()}
              >
                Crear
              </Button>
            </div>
          </Col>
        </Row>

        <br />
        <br />
        <div className="table-container">
          <Table>
            {this.state.mostrarCargando ? (
              <Spinner size="xl" type="grow" color="primary" />
            ) : null}
            <thead>
              <tr>
                <th>Valor Total</th>
                <th>Fecha de venta</th>
                <th>Documento Cliente</th>
                <th>Nombre Cliente</th>
                <th>Vendedor</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato._id}>
                  <td>{dato.valor_total}</td>
                  <td>{dato.fecha_venta}</td>
                  <td>{dato.documento_cliente}</td>
                  <td>{dato.nombre_cliente}</td>
                  <td>{dato.vendedor}</td>
                  <td>{dato.estado}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Actualizar Venta</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form._id}
              />
            </FormGroup>

            <FormGroup>
              <label>Valor Total:</label>
              <input
                className="form-control"
                name="valor-total"
                type="text"
                onChange={this.handleChange}
                required
                value={this.state.form.valor_total}
              />
            </FormGroup>

            <FormGroup>
              <label>Fecha Venta:</label>
              <input
                className="form-control"
                name="fecha-venta"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fecha_venta}
              />
            </FormGroup>

            <FormGroup>
              <label>Documento Cliente:</label>
              <input
                className="form-control"
                name="documento-cliente"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.documento_cliente}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre Cliente:</label>
              <input
                className="form-control"
                name="nombre-cliente"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre_cliente}
              />
            </FormGroup>
            <FormGroup>
              <label>Vendedor:</label>
              <input
                className="form-control"
                name="vendedor"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.vendedor}
              />
            </FormGroup>
            <FormGroup>
              <label>Estado:</label>
              <input
                className="form-control"
                name="estado"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.estado}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Actualizar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Crear Venta</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Valor Total:</label>
              <input
                className="form-control"
                name="valor-total"
                type="text"
                onChange={this.handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Fecha Venta:</label>
              <input
                className="form-control"
                name="fecha-venta"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Documento cliente:</label>
              <input
                className="form-control"
                name="documento-cliente"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre Cliente:</label>
              <input
                className="form-control"
                name="nombre-cliente"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Vendedor:</label>
              <input
                className="form-control"
                name="vendedor"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Estado:</label>
              <input
                className="form-control"
                name="estado"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
            Crear
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }

  crearVenta(venta) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(venta),
    };

    fetch(`${BASE_URL}${PATH_VENTAS}`, requestOptions)
      .then((result) => result.json())
      .then(
        (result) => {
          this.cargarVentas();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  cargarVentas() {
    fetch(`${BASE_URL}${PATH_VENTAS}`)
      .then((result) => result.json())
      .then(
        (result) => {
          this.setState({
            data: result,
          });
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          console.log(error);
        }
      );
  }

  borrarVenta(id) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${BASE_URL}${PATH_VENTAS}/${id}`, requestOptions)
      .then((result) => result.json())
      .then(
        (result) => {
          this.cargarVentas();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  actualizarVenta(venta) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(venta),
    };
    fetch(`${BASE_URL}${PATH_VENTAS}/${venta._id}`, requestOptions)
      .then((result) => result.json())
      .then(
        (result) => {
          this.cargarVentas();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

export default Ventas;
