import { useEffect, useState } from 'react';
import './style/feed.scss'
import Post from './Post';
import NovoPost from './NovoPost'
import PerfilInfo from  './PerfilInfo'
import PostAberto from './PostAberto';

import { userInfoDb } from './dbTeste';
import { postsInfoDb, donoPerfil } from './dbTeste';
import { v4 as uuidv4 } from 'uuid';


import { mostrarPerfil } from './functions/users';
import { toggleTelaPrincipal } from './functions/telas';

function Feed(props){


    const [attFeed, setAttFeed] = useState(false)
    // Informações do usuário apresentado no perfilInfo.jsx
    const [usuarioCarregado, setUsuarioCarregado] = useState(null);
    const [userPosts, setUserPosts] = useState([])

    const [postAbertoInfo, setPostAbertoInfo] = useState('');



    // gerar os posts do dono do perfil em perfilInfo.jsx se clicar no botão de perfil na sidebar
    useEffect(() =>{
        props.carregarDonoDoPerfil? setUserPosts(props.carregarDonoDoPerfil) : null
    }, [props.carregarDonoDoPerfil])


    const carregarUsuario = (username) => {
        const usuarioInfo = userInfoDb.find(user => user.username === username);

        let posts = mostrarPerfil(usuarioInfo)
    
        // info do usuario puxado
        setUserPosts(posts)
        setUsuarioCarregado(usuarioInfo);
    }

    const abrirPost = (postId) =>{

        console.log(postId)
        const postDetalhes = postsInfoDb.find(post => post.id == postId)

        toggleTelaPrincipal("postAberto")
        setPostAbertoInfo(postDetalhes)

        
    }

    const publicarPost = (data) =>{

        console.log(data)
        let txt = document.getElementById("criarTexto")

        // Impedir o usuário de postar se não tiver escrito nada
        if(txt.value.length > 1){

            let postId = uuidv4();
            console.log(postId)

            let postObj = {
                id: postId,
                username: donoPerfil.username,
                data: data,
                texto: txt.value,
                reposts: 0,
                comentarios: 0,
                likes: 0,
                repostado: false,
                curtido: false
            }

            // Adicionar o id no banco de dados do usuário para ser possível apagar o post futuramente
            donoPerfil.idPostsCriados.push(postId);
            // Encaminhar o post pra db
            postsInfo.push(postObj);
            // Apagar o texto inserido no campo de publicação
            txt.value="";

            setAttFeed(!attFeed)
            



        }
        

    }

    
    return(
        <main id='telaFeed'>
            <span id='telaPosts'>
                <NovoPost publicarPost={publicarPost}></NovoPost>
                

                <Post postsInfo={postsInfoDb} 
                abrirPost={abrirPost} carregarUsuario={carregarUsuario}></Post>
            </span>

            <PerfilInfo usuario={usuarioCarregado} carregarUsuario={carregarUsuario} userPosts={userPosts}></PerfilInfo>

            <PostAberto postAbertoInfo={postAbertoInfo}></PostAberto>



            
        </main>
    )
}

export default Feed;