//import { useState, useEffect } from 'react'
import './styles/App.css'
import { Routes, Route } from 'react-router-dom'

import Header from './components/header'
import Nav from './components/nav'
import Footer from './components/footer'

import Home from './pages/home'
import Noticias from './pages/noticias'
import NotFound from './pages/notFound'

function App() {
  
  
  return (
    <>
        <Header></Header>

        <Nav></Nav>

        <Routes>
          {/* Ruta principal */}
        <Route path="/" element={<Home />} />

          {/* Ruta usuarios */}
          <Route path="/noticias" element={<Noticias />} />

          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      
        <Footer></Footer>

      
    </>
  )
}

export default App
