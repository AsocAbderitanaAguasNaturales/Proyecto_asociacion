import './styles/App2.css'
import { useEffect} from "react";
import { Routes, Route } from 'react-router-dom'
import RutaProtegida from './components/ruta_protegida'

import Header from './components/header'
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

import Admin from './pages/admin'
import Miembro from './pages/miembro'

import Gestionar_miembros from './pages/panel_control/gestionar_miembros'
import Gestionar_galeria from './pages/panel_control/gestionar_galeria'
import Gestionar_noticias from './pages/panel_control/gestionar_noticias'


function App() {
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/session", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log("SESSION:", data);
      });
  }, []);
  
  return (
    <>
        <Header></Header>

    

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

          {/* Ruta Miembro */}
          <Route path="/miembro" element={
            <RutaProtegida rolRequerido="miembro">
            <Miembro />
          </RutaProtegida>}
          />

          {/* Ruta Admin */}
          <Route path="/admin" element={
            <RutaProtegida rolRequerido="admin">
            <Admin />
            </RutaProtegida>}
            />

          {/* Ruta Gestionar miembros */}
          <Route path="/admin/gestionar_miembros" element={<Gestionar_miembros/>}/>

          {/* Ruta Gestionar galería */}
          <Route path="/admin/gestionar_galeria" element={<Gestionar_galeria/>}/>

          {/* Ruta Gestionar noticias */}
          <Route path="/admin/gestionar_noticias" element={<Gestionar_noticias/>}/>

          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />

          
        </Routes>
      
        <Footer></Footer>

      
    </>
  )
}

export default App
