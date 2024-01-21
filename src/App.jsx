import './style/main.scss'

import Nav from "./Nav"
import Sidebar from "./Sidebar"
import Feed from './Feed'
import UsuarioInfo from  './UsuarioInfo'
function App() {
  
  return (
    <div className="container">
      <Nav></Nav>
      <div className="conteudo">
        <Sidebar></Sidebar>
        <Feed></Feed>
        <UsuarioInfo></UsuarioInfo>
      </div>
    </div>
  )
}

export default App
