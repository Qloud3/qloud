import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Login from "./components/Login/Login";
import Ventas from "./components/Ventas/Ventas";
import Productos from "./components/Productos/Productos";
import Usuarios from "./components/Usuarios/Usuarios";
import Register from './components/Register/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/ventas" component={Ventas} />
          <Route exact path="/productos" component={Productos} />
          <Route exact path="/usuarios" component={Usuarios} />
          {/* <Route component={PaginaNoEncontrada} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
