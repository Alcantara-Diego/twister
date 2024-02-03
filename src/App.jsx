import './style/main.scss'

import Nav from "./Nav"
import Sidebar from "./Sidebar"
import Feed from './Feed'
import PerfilInfo from  './PerfilInfo'
import { useState } from 'react'
function App() {

  const [carregarDonoDoPerfil, setCarregarDonoDoPerfil] = useState(null);
  
  return (
    <div className="container">
      <Nav></Nav>
      <div className="conteudo">
        <Sidebar setCarregarDonoDoPerfil={setCarregarDonoDoPerfil}></Sidebar>
        <Feed carregarDonoDoPerfil={carregarDonoDoPerfil}></Feed>
        
      </div>
    </div>
  )
}

export default App
