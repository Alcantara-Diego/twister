import './style/main.scss'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom'
import Nav from "./Nav"
import Sidebar from "./Sidebar"
import Feed from './Feed'
import PostAberto from './PostAberto'
import Perfil from  './Perfil'
import ListaEditavel from './ListaEditavel'
import Alerta from './Alerta'
import { carregarPostPorId, carregarPostsPorUsername, carregarUsuarioPorUsername } from './functions/users'
import { postsInfoDb } from './dbTeste'

function App() {

  const navigate = useNavigate();

  const [updateApp, setUpdateApp] = useState(false);
  // Info que será passada para o componente de PostAberto.JSX
  const [postAbertoInfo, setPostAbertoInfo] = useState("vazio");
  // Info que será passada para o componente de Perfil.JSX
  const [usuarioInfo, setUsuarioInfo] = useState("vazio");
  const [usuarioPosts, setUsuarioPosts] = useState([]);

  const [listaEditavelInfo, setListaEditavelInfo] = useState([]);

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


  // Carregar info do post ou usuario baseado no id da URL
  function tratarURL(url, tipo){

    let salvarId;
    let match;

    switch (tipo) {

      case "post":
        salvarId = /\/post\/(.+)/;

        // match trás uma array. [0] é o pathname commpleto e [1] trás apenas o id do post
        match = url.match(salvarId);

        if (match) {
          const postId = match[1];

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


  function abrirPost(postId){

    const postDetalhes = postsInfoDb.find(post => post.id == postId)
    alterarURL(`/post/${postDetalhes.id}`);
    
}


  return (
    <div className="container">
      <Nav></Nav>

        <div className="conteudo">

          <Sidebar
          atualizarApp={atualizarApp}
          alterarURL={alterarURL}>
          </Sidebar>
          
          <div>

            <ListaEditavel
            alterarURL={alterarURL}
            conteudo={listaEditavelInfo}
            ></ListaEditavel>

            <Alerta></Alerta>
            
            <Routes>

              <Route path='/' element={<Feed
              alterarURL={alterarURL}
              abrirPost={abrirPost}/>} />

              <Route path='/usuario/:username'
              element={<Perfil
              usuarioInfo={usuarioInfo =="vazio"? "" : usuarioInfo}
              usuarioPosts={usuarioPosts}
              abrirPost={abrirPost}
              alterarURL={alterarURL}
              setListaEditavelInfo={setListaEditavelInfo}
              />} />

              <Route path='/post/:id' element={
              <PostAberto
              postAbertoInfo={postAbertoInfo == "vazio"? "" : postAbertoInfo}
              mostrarPerfilPeloUsername="permitir"
              alterarURL={alterarURL}/>}/>
      
            </Routes>
          </div>
      
      
        </div>
      
    </div>
     
 

    
  )
}

export default App
