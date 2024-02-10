import './style/main.scss'

import Nav from "./Nav"
import Sidebar from "./Sidebar"
import Feed from './Feed'
import PerfilInfo from  './PerfilInfo'
import { useState } from 'react'
function App() {

  const [carregarDonoDoPerfil, setCarregarDonoDoPerfil] = useState(null);

  const [updateApp, setUpdateApp] = useState(false)

  function atualizarApp(){
    setUpdateApp(!updateApp)
  }
  
  return (
    <div className="container">
      <Nav></Nav>
      <div className="conteudo">
        <Sidebar setCarregarDonoDoPerfil={setCarregarDonoDoPerfil} atualizarApp={atualizarApp}></Sidebar>
        <Feed carregarDonoDoPerfil={carregarDonoDoPerfil} setCarregarDonoDoPerfil={setCarregarDonoDoPerfil}></Feed>
        
      </div>
    </div>
  )
}

export default App
