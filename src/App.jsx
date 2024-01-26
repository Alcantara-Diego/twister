import './style/main.scss'

import Nav from "./Nav"
import Sidebar from "./Sidebar"
import Feed from './Feed'
import PerfilInfo from  './PerfilInfo'
function App() {
  
  return (
    <div className="container">
      <Nav></Nav>
      <div className="conteudo">
        <Sidebar></Sidebar>
        <Feed></Feed>
        
      </div>
    </div>
  )
}

export default App
