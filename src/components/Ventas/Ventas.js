import React from "react";
import logo from "./../../logo.svg";
import { Form, FormGroup, Button, Label, Input, Container } from 'reactstrap';

class Ventas extends React.Component {
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
        <Form className="col-lg-4 py-4 px-4 bg-light rounded">
          <FormGroup>
            <Label for="ValorVenta">Valor total de venta</Label>
            <Input
              type="number"
              name="ValorVenta"
              id="ValorVenta"
              placeholder="Ingrese valor de la venta"
            />
          </FormGroup>
          <FormGroup>
            <Label for="FechaVenta">Fecha de venta</Label>
            <Input
              type="Date"
              name="FechaVenta"
              id="FechaVenta"
              placeholder="Ingrese la fecha de venta"
            />
          </FormGroup>
          <FormGroup>
            <Label for="DocID">Documento de identificación</Label>
            <Input
              type="number"
              name="DocID"
              id="DocID"
              placeholder="Digite el documento"
            />
          </FormGroup>
          <FormGroup>
            <Label for="NombreCliente">Nombre del cliente</Label>
            <Input
              type="text"
              name="NombreCliente"
              id="NombreCliente"
              placeholder="Ingrese el nombre del cliente"
            />
          </FormGroup>
          <FormGroup>
            <Label for="selectVendedor">Vendedores</Label>
            <Input type="select" name="selectVendedor" id="selectVendedor">
              <option>Seleccione Vendedor</option>
              <option>Vendedor 1</option>
              <option>Vendedor 2</option>
              <option>Vendedor 3</option>
              <option>Vendedor 4</option>
            </Input>
          </FormGroup>
          <Button color="primary w-100 mt-2" onSubmit="">Registrar</Button>
        </Form>
      </Container>
    );
  }
}

export default Ventas;
