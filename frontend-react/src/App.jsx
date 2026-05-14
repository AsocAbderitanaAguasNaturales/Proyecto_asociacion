import './styles/App2.css'
import { useEffect } from "react";
import { Routes, Route } from 'react-router-dom'
import RutaProtegida from './components/ruta_protegida'

import Header from './components/header'
import Footer from './components/footer'
import ScrollToTop from './components/scroll_to_top'

import Home from './pages/home'
import Noticias from './pages/noticias'
import Comentarios from './pages/comentarios'
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
import Nuevo_miembro from './pages/panel_control/nuevo_miembro'
import Modificar_miembro from './pages/panel_control/modificar_miembro'
import GestionarComentarios from './pages/panel_control/gestionar_comentarios'

import Gestionar_galeria from './pages/panel_control/gestionar_galeria'
import Nueva_foto from './pages/panel_control/nueva_foto'
import Modificar_foto from './pages/panel_control/modificar_foto'
import Gestionar_noticias from './pages/panel_control/gestionar_noticias'
import Nueva_noticia from './pages/panel_control/nueva_noticia'
import Modificar_noticia from './pages/panel_control/modificar_noticia'


function App() {
  useEffect(() => {
    fetch("/api/session", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log("SESSION:", data);
      });
  }, []);

  return (
    <div id="app-wrapper">
      <ScrollToTop />
      <Header></Header>

      <main id="main-content">
        <Routes>
          {/* Ruta Inicio */}
          <Route path="/" element={<Home />} />

          {/* Ruta Noticias */}
          <Route path="/noticias" element={<Noticias />} />

          {/* Ruta Comentarios */}
          <Route path="/comentarios" element={<Comentarios />} />

          {/* Ruta Galería*/}
          <Route path="/galeria" element={<Galeria />} />

          {/* Ruta Quienes Somos */}
          <Route path="/quienes_somos" element={<QuienesSomos />} />

          {/* Ruta Contacto */}
          <Route path="/contacto" element={<Contacto />} />

          {/* Ruta Login */}
          <Route path="/login" element={<Login />} />

          {/* Ruta Registro */}
          <Route path="/registro" element={<Registro />} />

          {/* Ruta Marco Legal */}
          <Route path="/legal" element={<Legal />} />

          {/* Ruta Información de Socio */}
          <Route path="/socio" element={<Socio />} />

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

          {/* Gestionar miembros */}
          <Route path="/admin/gestionar_miembros" element={
            <RutaProtegida rolRequerido="admin">
              <Gestionar_miembros />
            </RutaProtegida>
          } />


          {/* Ruta Crear miembro */}
          <Route path="/admin/gestionar_miembros/nuevo" element={
            <RutaProtegida rolRequerido="admin">
              <Nuevo_miembro />
            </RutaProtegida>
          } />

          {/* Ruta Modificar miembro */}
          <Route path="/admin/gestionar_miembros/:dni" element={
            <RutaProtegida rolRequerido="admin">
              <Modificar_miembro />
            </RutaProtegida>
          } />

          {/* Gestionar galería */}
          <Route path="/admin/gestionar_galeria" element={
            <RutaProtegida rolRequerido="admin">
              <Gestionar_galeria />
            </RutaProtegida>
          } />

          {/* Ruta Crear foto */}
          <Route path="/admin/gestionar_galeria/nuevo" element={
            <RutaProtegida rolRequerido="admin">
              <Nueva_foto />
            </RutaProtegida>
          } />

          {/* Ruta Modificar foto */}
          <Route path="/admin/gestionar_galeria/:id" element={
            <RutaProtegida rolRequerido="admin">
              <Modificar_foto />
            </RutaProtegida>
          } />

          {/* Gestionar noticias */}
          <Route path="/admin/gestionar_noticias" element={
            <RutaProtegida rolRequerido="admin">
              <Gestionar_noticias />
            </RutaProtegida>
          } />

          {/* Ruta Crear noticia */}
          <Route path="/admin/gestionar_noticias/nuevo" element={
            <RutaProtegida rolRequerido="admin">
              <Nueva_noticia />
            </RutaProtegida>
          } />

          {/* Ruta Modificar noticia */}
          <Route path="/admin/gestionar_noticias/:id" element={
            <RutaProtegida rolRequerido="admin">
              <Modificar_noticia />
            </RutaProtegida>
          } />

          {/* Gestionar comentarios */}
          <Route path="/admin/gestionar_comentarios" element={
            <RutaProtegida rolRequerido="admin">
              <GestionarComentarios />
            </RutaProtegida>
          } />



          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />


        </Routes>
      </main>

      <Footer></Footer>
    </div>
  )
}

export default App
