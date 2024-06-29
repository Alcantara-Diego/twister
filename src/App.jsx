import './style/main.scss'
import { useState, useEffect, useContext } from 'react'
import { Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import Nav from "./Nav"
import Sidebar from "./Sidebar"
import Feed from './Feed'
import PostAberto from './PostAberto'
import Perfil from  './Perfil'
import Login from './login'
import Cadastro from './Cadastro'
import ListaEditavel from './ListaEditavel'
import Alerta from './Alerta'
import FeedbackMsg from './FeedbackMsg'
import { PrivateRoute } from './RotasPrivadas'
import { AuthGoogleContext } from './contexts/AuthGoogle'

import { buscarPostPorId, buscarPostsPorIdentificador, buscarUsuarioPorIdentificador } from './pastaFirebase/getData'
import Timeline from './Timeline'

function App() {

  const url = useLocation();
  const navigate = useNavigate();
  
  const { usuarioLogado, 
    primeiroAcesso, postsDisponiveis,
    mensagemAlerta } = useContext(AuthGoogleContext);

  const [updateApp, setUpdateApp] = useState(false);
  // Info que será passada para o componente de PostAberto.JSX
  const [postAbertoInfo, setPostAbertoInfo] = useState("vazio");
  // Info que será passada para o componente de Perfil.JSX
  const [usuarioInfo, setUsuarioInfo] = useState("vazio");
    // Info que será passada para o componente de Post.JSX
  const [usuarioPosts, setUsuarioPosts] = useState([]);
    // Info que será passada para o componente de ListaEditavel.JSX
  const [listaEditavelInfo, setListaEditavelInfo] = useState([[], "teste"]);

  // const [notificacoes, setNotificacoes] = useState([])


// Mostrar comentarios assim que forem feitos no postAbertoInfo.JSX
  useEffect(()=>{
    // console.log(postsDisponiveis)

    // Se o usuario está com um post aberto sendo visualizado....
    if(url.pathname.includes("/post")){

      // Procurar o Id do post visualizado para atualizar o props enviado ao PostAberto.JSX
      postsDisponiveis?.forEach((post) => {
        if (url.pathname.includes(post.localId)) {

          // Atualizar os dados do post exibido ao usuario
          setPostAbertoInfo(post);

          //Evitar leitura de outros posts se o Id já foi encontrado
          return
        }
      });


    }

  }, [postsDisponiveis]);


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

      async function atualizarDados(){

        let url = window.location.pathname;

        if(url.includes("post")){
          let post = await tratarURL(url, "post");
          setPostAbertoInfo(post)


        } else if(url.includes("usuario")){
          let usuario = await tratarURL(url, "usuario");

          // console.log(usuario)
        
          setUsuarioInfo(usuario[0]);

          setUsuarioPosts(usuario[1]);
        }

      }

      atualizarDados();


      

  
  }, [updateApp]);


  // Carregar info do post ou usuario baseado no id da URL
  async function tratarURL(url, tipo){

    let salvarId;
    let match;

    switch (tipo) {

      case "post":
        salvarId = /\/post\/(.+)/;

        // match trás uma array. [0] é o pathname commpleto e [1] trás apenas o id do post
        match = url.match(salvarId);

        if (match) {
          const postId = match[1];

          let post = await buscarPostPorId(postId);
          return post

          
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

          usuario[0] = await buscarUsuarioPorIdentificador("username", username)
          
          let posts = await buscarPostsPorIdentificador("username", username);
          // console.log(posts);
          Array.isArray(posts) && usuario.push(posts)


          if (usuario[0] != null) {
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


function abrirPerfil(username){
  const usuarioNaURL = url.pathname.includes(username)

  if(usuarioLogado && !usuarioNaURL){

    alterarURL(`usuario/${username}`);
  
  } else{
      console.log("need login");
  }
}








  return (
    <div className="container">
      <Nav></Nav>
      <FeedbackMsg mensagem={mensagemAlerta}></FeedbackMsg>

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
              abrirPerfil={abrirPerfil}
              alterarURL={alterarURL}/>} />

              <Route path='/usuario/:username'
              element={<Perfil
              usuarioInfo={usuarioInfo =="vazio"? "vazio" : usuarioInfo}
              usuarioPosts={usuarioPosts}
              alterarURL={alterarURL}
              setListaEditavelInfo={setListaEditavelInfo}
              />} />

              <Route path='/post/:id' element={
              <PostAberto
              postAbertoInfo={postAbertoInfo == "vazio"? null : postAbertoInfo}
              abrirPerfil={abrirPerfil}
              mostrarPerfilPeloUsername="permitir"
              alterarURL={alterarURL}/>}/>

              <Route path='/notificacoes' element={<Timeline alterarURL={alterarURL}/>} />

              <Route path='/login' element={
                <PrivateRoute primeiroAcesso={primeiroAcesso}>
                  <Login></Login>
                </PrivateRoute>
              }/>
              <Route path='/cadastro' element={
                <PrivateRoute primeiroAcesso={primeiroAcesso}>
                  <Cadastro></Cadastro>
                </PrivateRoute>
              }/>
             
      
            </Routes>
          </div>
      
      
        </div>
      
    </div>
     
 

    
  )
}

export default App
