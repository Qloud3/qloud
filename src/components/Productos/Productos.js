import React from "react";
import styles from "./Productos.module.css";
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
const PATH_PRODUCTOS = "productos";
class Productos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      modalActualizar: false,
      modalInsertar: false,
      form: {
        _id: "",
        nombre: "",
        descripcion: "",
        valor_unitario: "",
        disponible: "",
      },
    };
  }

  componentDidMount() {
    this.cargarProductos();
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
        nombre: "",
        descripcion: "",
        valor_unitario: "",
        disponible: "",
      },
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    this.actualizarProducto(dato);
    this.setState({ modalActualizar: false });
  };

  eliminar = (dato) => {
    let option = window.confirm(
      "¿Esta seguro de eliminar este producto ... " + dato.nombre + "?"
    );

    if (option) {
      this.borrarProducto(dato._id);
    }
  };

  insertar = () => {
    let newProducto = { ...this.state.form };

    this.crearProducto(newProducto);

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
            <h2>Modulo Productos</h2>
            <p>En este módulo podras administrar los productos.</p>
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
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Valor por unidad</th>
                <th>Disponible</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato._id}>
                  <td>{dato.nombre}</td>
                  <td>{dato.descripcion}</td>
                  <td>{dato.valor_unitario}</td>
                  <td>{dato.disponible}</td>
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
              <h3>Actualizar Producto</h3>
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
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                required
                value={this.state.form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Descripción:</label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.descripcion}
              />
            </FormGroup>

            <FormGroup>
              <label>Valor por unidad:</label>
              <input
                className="form-control"
                name="valor_unitario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.valor_unitario}
              />
            </FormGroup>

            <FormGroup>
              <label>Disponible:</label>
              <input
                className="form-control"
                name="disponible"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.disponible}
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
              <h3>Crear Producto</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Descripción:</label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Valor por unidad:</label>
              <input
                className="form-control"
                name="valor_unitario"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Disponible:</label>
              <input
                className="form-control"
                name="disponible"
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

  crearProducto(producto) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    };

    fetch(`${BASE_URL}${PATH_PRODUCTOS}`, requestOptions)
      .then((result) => result.json())
      .then(
        (result) => {
          this.cargarProductos();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  cargarProductos() {
    fetch(`${BASE_URL}${PATH_PRODUCTOS}`)
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

  borrarProducto(id) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${BASE_URL}${PATH_PRODUCTOS}/${id}`, requestOptions)
      .then((result) => result.json())
      .then(
        (result) => {
          this.cargarProductos();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  actualizarProducto(producto) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    };
    fetch(`${BASE_URL}${PATH_PRODUCTOS}/${producto._id}`, requestOptions)
      .then((result) => result.json())
      .then(
        (result) => {
          this.cargarProductos();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

export default Productos;
