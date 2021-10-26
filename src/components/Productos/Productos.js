import React from "react";
// import styles from "./Productos.module.css";
import {
  Alert,
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,  
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
const PATH_PRODUCTOS = "productos";

const Productos = () => {

  const auth = getAuth();
  const [modalActualizar, setModalActualizar] = React.useState(false);
  const [modalInsertar, setModalInsertar] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const [newVal, setNewVal] = React.useState(0);
  const [product, loading, error] = useAuthState(auth);
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

  const [producto, setProducto] = React.useState({
    data: data,
    form: {
      nombre: "",
      descripcion: "",
      valor_unitario: "",
      disponible: "",
    }
  });

  React.useEffect(() => {
    if (loading) return;
    if (!product) return history.replace("/");
  }, [producto, loading]);

  React.useEffect(() => {
    if (!product) return history.replace("/");
    product.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(`${BASE_URL}${PATH_PRODUCTOS}`, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setProducto({
              ...producto,
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
    setProducto((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [e.target.name]: e.target.value,
      }
    }));
  };

  const mostrarModalActualizar = (e) => {
    let arregloProductos = producto.data;
    let productToModify;
    arregloProductos.map((registro) => {
      if (e.target.id === registro._id) {
        productToModify = registro;
      }
    });
    setProducto({
      ...producto,
      form: productToModify
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
    let productoAModificar = { ...producto.form };
    actualizarProducto(productoAModificar);
    setModalActualizar(false);
  };

  const eliminar = (e) => {
    let arregloProducto = producto.data;
    arregloProducto.map((registro) => {
      if (e.target.id === registro._id) {
        let opcion = window.confirm("¿Está seguro que desea eliminar el producto " + registro.nombre + "?");
        if (opcion) {
          borrarProducto(registro._id);
        }
      }
    });
  };

  const insertar = () => {
    let productoACrear = { ...producto.form };
    crearProducto(productoACrear);
    setModalInsertar(false);
  }

  const crearProducto = (productoACrear) => {
    product.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productoACrear)
      };
      fetch(`${BASE_URL}${PATH_PRODUCTOS}`, requestOptions)
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

  const borrarProducto = (id) => {
    product.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(`${BASE_URL}${PATH_PRODUCTOS}/${id}`, requestOptions)
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

  const actualizarProducto = (producto) => {
    product.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(producto)
      };
      fetch(`${BASE_URL}${PATH_PRODUCTOS}/${producto._id}`, requestOptions)
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
            <h2>Modulo Productos</h2>
            <p>En este módulo podras administrar los productos.</p>
          </Col>
          <Col md="4" className="d-flex justify-content-end">
            <div class="align-self-end">
              <Button color="primary w-40" onClick={mostrarModalInsertar}>Crear</Button>
              <Button outline color="secondary" onClick={logout} block>Cerrar sesión</Button>
            </div>
          </Col>
        </Row>
        <div className="table-container">
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Valor unitario</th>
                <th>Disponible</th>
              </tr>
            </thead>

            <tbody>
              {producto.data.map((dato) => (
                <tr key={dato._id}>
                  <td>{dato.nombre}</td>
                  <td>{dato.descripcion}</td>
                  <td>{dato.valor_unitario}</td>
                  <td>{dato.disponible ? 'Si' : 'No'}</td>
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
              <h3>Actualizar Producto {producto.form._id}</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={producto.form._id}
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
                value={producto.form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Descripción:</label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={handleChange}
                value={producto.form.descripcion}
              />
            </FormGroup>

            <FormGroup>
              <label>Valor unitario:</label>
              <input
                className="form-control"
                name="valor_unitario"
                type="text"
                onChange={handleChange}
                value={producto.form.valor_unitario}
              />
            </FormGroup>

            <FormGroup>
              <label>Disponible:</label>
              <input
                className="form-control"
                name="disponible"
                type="text"
                onChange={handleChange}
                value={producto.form.disponible}
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
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Descripción:</label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Valor unitario:</label>
              <input
                className="form-control"
                name="valor_unitario"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Disponible:</label>
              <input
                className="form-control"
                name="disponible"
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

export default Productos;