import './style/main.scss'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom'
import Nav from "./Nav"
import Sidebar from "./Sidebar"
import Feed from './Feed'
import PostAberto from './PostAberto'
import Perfil from  './Perfil'
import { carregarPostPorId, carregarUsuarioPorUsername } from './functions/users'


function App() {

  const navigate = useNavigate();

  const [updateApp, setUpdateApp] = useState(false);
  const [postAbertoInfo, setPostAbertoInfo] = useState("vazio");
  const [usuarioInfo, setUsuarioInfo] = useState("vazio");

  function atualizarApp(){
    setUpdateApp(!updateApp)
  }

  function alterarURL(url){
    navigate(url);
    setUpdateApp(!updateApp);

  }
    

    useEffect(() => {
      let url = window.location.pathname;

      if(url.includes("post")){
        let post = tratarURL(url, "post");
        setPostAbertoInfo(post)


      } else if(url.includes("usuario")){
        let usuario = tratarURL(url, "usuario");
        setUsuarioInfo(usuario);
      }

  
  }, [updateApp]);

  // Checar os paramentros passados(Será removido após testes)
  useEffect(() =>{
    console.log(postAbertoInfo)
    console.log(usuarioInfo)

  }, [postAbertoInfo, usuarioInfo])



  // Carregar info do post ou usuario baseado no id da URL
  function tratarURL(url, tipo){

    let salvarId;
    let match;

    console.log("tratando url")

    switch (tipo) {

      case "post":
        salvarId = /\/post\/(.+)/;

        // match trás uma array. [0] é o pathname commpleto e [1] trás apenas o id do post
        match = url.match(salvarId);

        if (match) {
          const postId = match[1];
          console.log(tipo, postId);

          return carregarPostPorId(postId)
          
        } else {
          console.log("Erro na URL");
          navigate("/");
        }
        break;

      case "usuario":
        salvarId = /\/usuario\/(.+)/;

        // match trás uma array. [0] é o pathname commpleto e [1] trás apenas o id do post
        match = url.match(salvarId);

        if (match) {
          const username = match[1];
          console.log(tipo, username);

        
          let usuario = carregarUsuarioPorUsername(username);
          if (usuario) {
            return usuario            
          } else{
            return "vazio"
          }

          
        } else {
          console.log("Erro na URL");
          navigate("/");
        }
        break

      default:
        break;
    }
  }
  
  return (
    <div className="container">
      <Nav></Nav>
      <div className="conteudo">
        <Sidebar atualizarApp={atualizarApp} alterarURL={alterarURL}></Sidebar>

        <Routes>
          <Route path='/' element={<Feed alterarURL={alterarURL}/>} />

          <Route path='/usuario/:username' element={<Perfil usuarioInfo={usuarioInfo =="vazio"? "" : usuarioInfo}/>} />

          <Route path='/post/:id' element={
          <PostAberto  
          postAbertoInfo={postAbertoInfo == "vazio"? "" : postAbertoInfo} alterarURL={alterarURL}/>}/>

          

          
        </Routes>
        
      </div>
    </div>
  )
}

export default App
