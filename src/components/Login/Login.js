import React from "react";
import logo from "./../../logo.svg";
import { Button, Container, FormGroup, Form } from "reactstrap";
// import styles from "./Login.module.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container
        fluid
        className="wrapper d-flex flex-column justify-content-center align-items-center"
      >
        <img src={logo} alt="logo" width="180px" className="mb-5" />
        <Form className="col-lg-3 col-md-6 col-sm-11 py-5 px-4 bg-light rounded">
          <FormGroup>
            <label className="w-100">Usuario o correo electrónico:</label>

            <input
              className="form-control mt-2"
              name="user"
              type="text"
              required
            />
          </FormGroup>
          <FormGroup className="mt-4">
            <label className="w-100">Contraseña:</label>

            <input
              className="form-control mt-2"
              name="password"
              type="password"
              required
            />
          </FormGroup>
          <div class="d-flex justify-content-end my-3">
            <p>
              Olvidé mi <a href="#">contraseña</a>
            </p>
          </div>
          <Button color="primary w-100" onSubmit="">
            Iniciar Sesión
          </Button>
          <div class="d-flex justify-content-center mt-4">
            <a href="#" className="small">
              Términos y Condiciones
            </a>
          </div>
        </Form>
      </Container>
    );
  }
}

export default Login;
