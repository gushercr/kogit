import Inicio from'./vistas/Inicio';
import Login from'./vistas/login';
import Registro from'./vistas/registro';
import Perfil from'./vistas/perfilusuario';
import Header from'./componentes/header';
import Footer from'./componentes/footer';
import PageNotFound from './vistas/PageNotFound';
import './css/styles.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div id="body">
      
      <Router>
        <Header />
        <Switch>
          <Route path="/Registro" component={Registro}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Perfil" component={Perfil}/>
          <Route path="/" component={Inicio} exact/>
          <Route path="*" component={PageNotFound}/>         
        </Switch>
        <Footer />
      </Router>
      
      
    </div>
  );
}   

export default App;
