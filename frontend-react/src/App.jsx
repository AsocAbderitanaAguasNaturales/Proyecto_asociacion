import './styles/App2.css'
import { Routes, Route } from 'react-router-dom'

import Header from './components/header'
import Nav from './components/nav'
import Footer from './components/footer'

import Home from './pages/home'
import Noticias from './pages/noticias'
import Galeria from './pages/galeria'
import QuienesSomos from './pages/quienes_somos'
import Contacto from './pages/contacto'
import Login from './pages/login'
import Registro from './pages/registro'
import Legal from './pages/legal'
import Socio from './pages/socio'
import NotFound from './pages/notFound'


function App() {
  
  
  return (
    <>
        <Header></Header>

        <Nav></Nav>

        <Routes>
          {/* Ruta Inicio */}
        <Route path="/" element={<Home />} />

          {/* Ruta Noticias */}
          <Route path="/noticias" element={<Noticias />} />

          {/* Ruta Galería*/ }
          <Route path="/galeria" element={<Galeria/>}/>

          {/* Ruta Quienes Somos */}
          <Route path="/quienes_somos" element={<QuienesSomos/>}/>

          {/* Ruta Contacto */}
          <Route path="/contacto" element={<Contacto/>}/>

          {/* Ruta Login */}
          <Route path="/login" element={<Login/>}/>

          {/* Ruta Registro */}
          <Route path="/registro" element={<Registro/>}/>

          {/* Ruta Marco Legal */}
          <Route path="/legal" element={<Legal/>}/>

          {/* Ruta Información de Socio */}
          <Route path="/socio" element={<Socio/>}/>

          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      
        <Footer></Footer>

      
    </>
  )
}

export default App
