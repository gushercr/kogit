import Inicio from'./vistas/Inicio';
import Login from'./vistas/login';
import Header from'./componentes/header';
import Footer from'./componentes/footer';
import './css/styles.css';
function App() {
  return (
    <div id="body">
      <Header />
      <Login />
      <Footer />
    </div>
  );
}   

export default App;
