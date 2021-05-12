import Header from '../componentes/header';
import Slider from '../componentes/slider';
import TarjetaP from '../componentes/tarjeta-presentacion';
import Anuncios from '../componentes/tarjetas-anuncios';
import Footer from '../componentes/footer';
function inicio() {
    return (
      <div id="body">
        <Header />
        <Slider/>
        <TarjetaP/>
        <Anuncios/>
        <Footer/>
      </div>
    );
  }
  
  export default inicio;
  