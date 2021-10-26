import React from "react";
// import styles from "./Ventas.module.css";
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
const PATH_VENTAS = "ventas";

const Ventas = () => {

  const auth = getAuth();
  const [modalActualizar, setModalActualizar] = React.useState(false);
  const [modalInsertar, setModalInsertar] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const [newVal, setNewVal] = React.useState(0);
  const [sell, loading, error] = useAuthState(auth);
  const history = useHistory();

  const logout = () => {
    auth.signOut().then(function () {
      // Sign-out successful.
      history.replace("/");
      console.log("loggedout");
    }).catch((error) => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  };

  const [venta, setVenta] = React.useState({
    data: data,
    form: {
      valor_total: "",
      fecha_venta: "",
      documento_cliente: "",
      cliente: "",
      vendedor: "",
      estado: "",
    }
  });

  React.useEffect(() => {
    if (loading) return;
    if (!sell) return history.replace("/");
  }, [venta, loading]);

  React.useEffect(() => {
    if (!sell) return history.replace("/");
    sell.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(`${BASE_URL}${PATH_VENTAS}`, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setVenta({
              ...venta,
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
    setVenta((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [e.target.name]: e.target.value,
      }
    }));
  };

  const mostrarModalActualizar = (e) => {
    let arregloVentas = venta.data;
    let sellToModify;
    arregloVentas.map((registro) => {
      if (e.target.id === registro._id) {
        sellToModify = registro;
      }
    });
    setVenta({
      ...venta,
      form: sellToModify
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
    let ventaAModificar = { ...venta.form };
    actualizarVenta(ventaAModificar);
    setModalActualizar(false);
  };

  const eliminar = (e) => {
    let arregloVenta = venta.data;
    arregloVenta.map((registro) => {
      if (e.target.id === registro._id) {
        let opcion = window.confirm("¿Está seguro que desea eliminar la venta con valor de" + registro.valor_total + "?");
        if (opcion) {
          borrarVenta(registro._id);
        }
      }
    });
  };

  const insertar = () => {
    let ventaACrear = { ...venta.form };
    crearVenta(ventaACrear);
    setModalInsertar(false);
  }

  const crearVenta = (ventaACrear) => {
    sell.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ventaACrear)
      };
      fetch(`${BASE_URL}${PATH_VENTAS}`, requestOptions)
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

  const borrarVenta = (id) => {
    sell.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(`${BASE_URL}${PATH_VENTAS}/${id}`, requestOptions)
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

  const actualizarVenta = (venta) => {
    sell.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(venta)
      };
      fetch(`${BASE_URL}${PATH_VENTAS}/${venta._id}`, requestOptions)
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
            <h2>Modulo Ventas</h2>
            <p>En este módulo podras administrar las ventas.</p>
          </Col>
          <Col md="4" className="d-flex justify-content-end">
            <div className="align-self-end">
              <Button color="primary w-40" onClick={mostrarModalInsertar}>Crear</Button>
              <Button outline color="secondary" onClick={logout} block>Cerrar sesión</Button>
            </div>
          </Col>
        </Row>
        <div className="table-container">
          <Table>
            <thead>
              <tr>
                <th>Valor Total</th>
                <th>Fecha de venta</th>
                <th>Documento Cliente</th>
                <th>Nombre Cliente</th>
                <th>Vendedor</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {venta.data.map((dato) => (
                <tr key={dato._id}>
                  <td>{dato.valor_total}</td>
                  <td>{dato.fecha_venta}</td>
                  <td>{dato.documento_cliente}</td>
                  <td>{dato.cliente}</td>
                  <td>{dato.vendedor}</td>
                  <td>{dato.estado}</td>
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
              <h3>Actualizar Venta {venta.form._id}</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={venta.form._id}
              />
            </FormGroup>

            <FormGroup>
              <label>Valor Total:</label>
              <input
                className="form-control"
                name="valor_total"
                type="text"
                onChange={handleChange}
                required
                value={venta.form.valor_total}
              />
            </FormGroup>

            <FormGroup>
              <label>Fecha Venta:</label>
              <input
                className="form-control"
                name="fecha_venta"
                type="text"
                onChange={handleChange}
                value={venta.form.fecha_venta}
              />
            </FormGroup>

            <FormGroup>
              <label>Documento Cliente:</label>
              <input
                className="form-control"
                name="documento_cliente"
                type="text"
                onChange={handleChange}
                value={venta.form.documento_cliente}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre Cliente:</label>
              <input
                className="form-control"
                name="cliente"
                type="text"
                onChange={handleChange}
                value={venta.form.cliente}
              />
            </FormGroup>
            <FormGroup>
              <label>Vendedor:</label>
              <input
                className="form-control"
                name="vendedor"
                type="text"
                onChange={handleChange}
                value={venta.form.vendedor}
              />
            </FormGroup>
            <FormGroup>
              <label>Estado:</label>
              <input
                className="form-control"
                name="estado"
                type="text"
                onChange={handleChange}
                value={venta.form.estado}
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
              <h3>Crear Venta</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Valor Total:</label>
              <input
                className="form-control"
                name="valor_total"
                type="text"
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Fecha Venta:</label>
              <input
                className="form-control"
                name="fecha_venta"
                type="date"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Documento cliente:</label>
              <input
                className="form-control"
                name="documento_cliente"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre Cliente:</label>
              <input
                className="form-control"
                name="cliente"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Vendedor:</label>
              <input
                className="form-control"
                name="vendedor"
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

export default Ventas;
