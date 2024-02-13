import './style/main.scss'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom'
import Nav from "./Nav"
import Sidebar from "./Sidebar"
import Feed from './Feed'
import PostAberto from './PostAberto'
import PerfilInfo from  './Perfil'
import { carregarPostPorId } from './functions/users'


function App() {

  const navigate = useNavigate();

  const [updateApp, setUpdateApp] = useState(false);
  const [postAbertoInfo, setPostAbertoInfo] = useState("vazio")

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

        let post = prepararPost(url);
        setPostAbertoInfo(post)
      }

  
  }, [updateApp]);

  useEffect(() =>{
    console.log(postAbertoInfo)

  }, [postAbertoInfo])



  // Carregar info do post baseado no id da URL
  function prepararPost(url){

    const salvarId = /\/post\/(.+)/;
    // match trás uma array. [0] é o pathname commpleto e [1] trás apenas o id do post
    const match = url.match(salvarId);

    if (match) {
      const postId = match[1];
      console.log("Post ID:", postId);

      return carregarPostPorId(postId)

      
    } else {
      console.log("Erro na URL");
      navigate("/");
    }

  }
  
  return (
    <div className="container">
      <Nav></Nav>
      <div className="conteudo">
        <Sidebar atualizarApp={atualizarApp}></Sidebar>

        <Routes>
          <Route path='/' element={<Feed alterarURL={alterarURL}/>} />

          <Route path='/perfil' element={<PerfilInfo/>} />

          <Route path='/post/:id' element={
          <PostAberto  
          postAbertoInfo={postAbertoInfo == "vazio"? "" : postAbertoInfo} alterarURL={alterarURL}/>}/>

          

          
        </Routes>
        
      </div>
    </div>
  )
}

export default App
