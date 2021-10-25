import React from 'react';
import {
  Alert,
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,  
  Spinner,
  ModalBody,
  FormGroup,
  ModalFooter,
  Row,
  Col
} from "reactstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { getAuth } from "firebase/auth";

const data = [

];

const BASE_URL = process.env.REACT_APP_API_URL;
const PATH_USUARIOS = "usuarios";

const Usuarios = () => {

  const auth = getAuth();
  const [modalActualizar, setModalActualizar] = React.useState(false);
  const [modalInsertar, setModalInsertar] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const [newVal, setNewVal] = React.useState(0);
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const logout = () => {
    auth.signOut().then(function () {
      // Sign-out successful.
      console.log("loggedout");
    }).catch((error) => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  };

  const [usuario, setUsuario] = React.useState({
    data: data,
    form: {
      nombre: "",
      cedula: "",
      telefono: "",
      estado: "",
      rol: ""
    }
  });

  React.useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
  }, [usuario, loading]);

  React.useEffect(() => {
    if (!user) return history.replace("/");
    user.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(`${BASE_URL}${PATH_USUARIOS}`, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setUsuario({
              ...usuario,
              data: result
            });
          },
          (error) => {
            setIsLoaded(true);
            setErrors(error);
          }
        )
    });
  }, [newVal]);

  const handleChange = (e) => {
    setUsuario((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [e.target.name]: e.target.value,
      }
    }));
  };

  const mostrarModalActualizar = (e) => {
    let arregloUsuarios = usuario.data;
    let userToModify;
    arregloUsuarios.map((registro) => {
      if (e.target.id === registro._id) {
        userToModify = registro;
      }
    });
    setUsuario({
      ...usuario,
      form: userToModify
    });
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const editar = () => {
    let usuarioAModificar = { ...usuario.form };
    actualizarUsuario(usuarioAModificar);
    setModalActualizar(false);
  };

  const eliminar = (e) => {
    let arregloUsuario = usuario.data;
    arregloUsuario.map((registro) => {
      if (e.target.id == registro._id) {
        let opcion = window.confirm("¿Está seguro que desea eliminar el valor " + registro.nombre + "?");
        if (opcion) {
          borrarUsuario(registro._id);
        }
      }
    });
  };

  const insertar = () => {
    let usuarioACrear = { ...usuario.form };
    crearUsuario(usuarioACrear);
    setModalInsertar(false);
  }

  const crearUsuario = (usuarioACrear) =>{
    user.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(usuarioACrear)
      };
      fetch(`${BASE_URL}${PATH_USUARIOS}`, requestOptions)
        .then(
          (response) => {
            response.json();
            setNewVal(newVal + 1);
          },
          (error) => {
            setIsLoaded(true);
            setErrors(error);
          })
    });
  }

  const borrarUsuario = (id) => {
    user.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(`${BASE_URL}${PATH_USUARIOS}/${id}`, requestOptions)
        .then(result => result.json())
        .then(
          (result) => {
            setNewVal(newVal + 1);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }

  const actualizarUsuario = (usuario) => {
    user.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(usuario)
      };
      fetch(`${BASE_URL}${PATH_USUARIOS}/${usuario._id}`, requestOptions)
        .then(result => result.json())
        .then(
          (result) => {
            setNewVal(newVal + 1);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }
  if (error) {
    return <Alert color="danger">
      Error: {error.message}
    </Alert>;
  } else {
    return (

      <Container>
        <br />
        <Row className="section-title">
          <Col md="8">
            <h2>Modulo Usuarios</h2>
            <p>En este módulo podras administrar los usuarios.</p>
          </Col>
          <Col md="4" className="d-flex justify-content-end">
            <div className="align-self-end">
              <Button color="success" onClick={mostrarModalInsertar}>Crear</Button>
              <Button outline color="secondary" onClick={logout} block>Cerrar sesión</Button>
            </div>
          </Col>
        </Row>
        <div className="table-container">
          <Table>
{/*             {this.state.mostrarCargando ? (
              <Spinner size="xl" type="grow" color="primary" />
            ) : null} */}
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
              {usuario.data.map((dato) => (
                <tr key={dato._id}>
                  <td>{dato.nombre}</td>
                  <td>{dato.cedula}</td>
                  <td>{dato.telefono}</td>
                  <td>{dato.estado}</td>
                  <td>{dato.rol}</td>
                  <td>
                    <Button
                      color="primary" id={dato._id}
                      onClick={mostrarModalActualizar}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" id={dato._id} onClick={eliminar}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <Modal isOpen={modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Actualizar Usuario {usuario.form._id}</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={usuario.form._id}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={handleChange}
                required
                value={usuario.form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Cedula:</label>
              <input
                className="form-control"
                name="cedula"
                type="text"
                onChange={handleChange}
                value={usuario.form.cedula}
              />
            </FormGroup>

            <FormGroup>
              <label>Telefono:</label>
              <input
                className="form-control"
                name="telefono"
                type="text"
                onChange={handleChange}
                value={usuario.form.telefono}
              />
            </FormGroup>

            <FormGroup>
              <label>Estado:</label>
              <input
                className="form-control"
                name="estado"
                type="text"
                onChange={handleChange}
                value={usuario.form.estado}
              />
            </FormGroup>
            <FormGroup>
              <label>Rol:</label>
              <input
                className="form-control"
                name="rol"
                type="text"
                onChange={handleChange}
                value={usuario.form.rol}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={editar}
            >
              Actualizar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={cerrarModalActualizar}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalInsertar}>
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
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Cedula:</label>
              <input
                className="form-control"
                name="cedula"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Telefono:</label>
              <input
                className="form-control"
                name="telefono"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Estado:</label>
              <input
                className="form-control"
                name="estado"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Rol:</label>
              <input
                className="form-control"
                name="rol"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={insertar}>
              Crear
            </Button>
            <Button
              className="btn btn-danger"
              onClick={cerrarModalInsertar}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}
export default Usuarios;
