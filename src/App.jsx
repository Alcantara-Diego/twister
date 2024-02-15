import './style/main.scss'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom'
import Nav from "./Nav"
import Sidebar from "./Sidebar"
import Feed from './Feed'
import PostAberto from './PostAberto'
import Perfil from  './Perfil'
import { carregarPostPorId, carregarPostsPorUsername, carregarUsuarioPorUsername } from './functions/users'


function App() {

  const navigate = useNavigate();

  const [updateApp, setUpdateApp] = useState(false);
  // Info que será passada para o component de PostAberto.JSX
  const [postAbertoInfo, setPostAbertoInfo] = useState("vazio");
  // Info que será passada para o component de Perfil.JSX
  const [usuarioInfo, setUsuarioInfo] = useState("vazio");
  const [usuarioPosts, setUsuarioPosts] = useState([]);

  function atualizarApp(){
    setUpdateApp(!updateApp)
  }

  // Alterar URL dentro de outros componentes e atualizar o app para processar dados de acordo com a URL atualizada
  function alterarURL(url){
    navigate(url);
    setUpdateApp(!updateApp);

  }
    

  // Identificar a requisição pela URL e saber o ID do post ou nome do usuário para puxar informações do banco de dados
    useEffect(() => {
      let url = window.location.pathname;

      if(url.includes("post")){
        let post = tratarURL(url, "post");
        setPostAbertoInfo(post)


      } else if(url.includes("usuario")){
        let usuario = tratarURL(url, "usuario");
      
        setUsuarioInfo(usuario[0]);

        setUsuarioPosts(usuario[1]);
      }

  
  }, [updateApp]);

  // Checar os paramentros passados(Será removido após testes)
  // useEffect(() =>{
  //   console.log(usuarioPosts)
  //   console.log(usuarioInfo)
  

  // }, [usuarioPosts, usuarioInfo])



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

        
          let usuario = []
          usuario[0] = carregarUsuarioPorUsername(username);

          usuario.push(carregarPostsPorUsername(username));
          


          if (usuario) {
            return usuario            
          } else{
            return ["vazio", []]
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
  
  // próxima etapa é abrir o post pelo perfil do usuário que ta dando erro
  return (
    <div className="container">
      <Nav></Nav>
      <div className="conteudo">
        <Sidebar atualizarApp={atualizarApp} alterarURL={alterarURL}></Sidebar>

        <Routes>
          <Route path='/' element={<Feed alterarURL={alterarURL}/>} />

          <Route path='/usuario/:username' 
          element={<Perfil 
          usuarioInfo={usuarioInfo =="vazio"? "" : usuarioInfo}
          usuarioPosts={usuarioPosts}
          />} />

          <Route path='/post/:id' element={
          <PostAberto  
          postAbertoInfo={postAbertoInfo == "vazio"? "" : postAbertoInfo} alterarURL={alterarURL}/>}/>

          
        </Routes>
        
      </div>
    </div>
  )
}

export default App
