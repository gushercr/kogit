import Inicio from'./vistas/Inicio';
import Login from'./vistas/login';
import Registro from'./vistas/registro';
import Perfil from'./vistas/perfilusuario';

import Header from'./componentes/header';
import Footer from'./componentes/footer';
import './css/styles.css';
function App() {
  return (
    <div id="body">
      <Header />
      <Perfil />
      <Footer />
    </div>
  );
}   

export default App;
