import React from "react";
// import styles from "./Usuarios.module.css";
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
const PATH_USUARIOS = "usuarios";
class Usuarios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      modalActualizar: false,
      modalInsertar: false,
      form: {
        _id: "",
        nombre: "",
        cedula: "",
        telefono: "",
        estado: "",
        rol: "",
      },
    };
  }

  componentDidMount() {
    this.cargarUsuarios();
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
        cedula: "",
        telefono: "",
        estado: "",
        rol: "",
      },
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    this.actualizarUsuario(dato);
    this.setState({ modalActualizar: false });
  };

  eliminar = (dato) => {
    let option = window.confirm(
      "¿Esta seguro de eliminar el usuario: " + dato.nombre + "?"
    );

    if (option) {
      this.borrarUsuario(dato._id);
    }
  };

  insertar = () => {
    let newUsuario = { ...this.state.form };

    this.crearUsuario(newUsuario);

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
            <h2>Modulo Usuarios</h2>
            <p>En este módulo podras administrar los usuarios.</p>
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
                <th>Cedula</th>
                <th>Telefono</th>
                <th>Estado</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato._id}>
                  <td>{dato.nombre}</td>
                  <td>{dato.cedula}</td>
                  <td>{dato.telefono}</td>
                  <td>{dato.estado}</td>
                  <td>{dato.rol}</td>
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
              <h3>Actualizar Usuario</h3>
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
              <label>Cedula:</label>
              <input
                className="form-control"
                name="cedula"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.cedula}
              />
            </FormGroup>

            <FormGroup>
              <label>Telefono:</label>
              <input
                className="form-control"
                name="telefono"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.telefono}
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
            <FormGroup>
              <label>Rol:</label>
              <input
                className="form-control"
                name="rol"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.rol}
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
              <h3>Crear usuario</h3>
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
              <label>Cedula:</label>
              <input
                className="form-control"
                name="cedula"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Telefono:</label>
              <input
                className="form-control"
                name="telefono"
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

            <FormGroup>
              <label>Rol:</label>
              <input
                className="form-control"
                name="rol"
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

  crearUsuario(usuario) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    };

    fetch(`${BASE_URL}${PATH_USUARIOS}`, requestOptions)
      .then((result) => result.json())
      .then(
        (result) => {
          this.cargarUsuarios();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  cargarUsuarios() {
    fetch(`${BASE_URL}${PATH_USUARIOS}`)
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

  borrarUsuario(id) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${BASE_URL}${PATH_USUARIOS}/${id}`, requestOptions)
      .then((result) => result.json())
      .then(
        (result) => {
          this.cargarUsuarios();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  actualizarUsuario(usuario) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    };
    fetch(`${BASE_URL}${PATH_USUARIOS}/${usuario._id}`, requestOptions)
      .then((result) => result.json())
      .then(
        (result) => {
          this.cargarUsuarios();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

export default Usuarios;
