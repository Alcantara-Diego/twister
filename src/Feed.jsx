import { useEffect, useState } from 'react';
import './style/feed.scss'
import Post from './Post';
import NovoPost from './NovoPost'
import PerfilInfo from  './PerfilInfo'

import { userInfoDb } from './dbTeste';
import { postsInfo, donoPerfil } from './dbTeste';
import { v4 as uuidv4 } from 'uuid';


import { mostrarPerfil } from './functions/users';

function Feed(props){


    const [attFeed, setAttFeed] = useState(false)
    // Informações do usuário apresentado no perfilInfo.jsx
    const [usuarioCarregado, setUsuarioCarregado] = useState(null);
    const [userPosts, setUserPosts] = useState([])

    // gerar os posts do dono do perfil em perfilInfo.jsx se clicar no botão de perfil na sidebar
    useEffect(() =>{
        props.carregarDonoDoPerfil? setUserPosts(props.carregarDonoDoPerfil) : null
    }, [props.carregarDonoDoPerfil])


    const carregarUsuario = (username) => {
        const usuarioInfo = userInfoDb.find(user => user.username === username);

        let posts = mostrarPerfil(usuarioInfo)
    
        setUserPosts(posts)
        setUsuarioCarregado(usuarioInfo);
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
                

                <Post postsInfo={postsInfo} carregarUsuario={carregarUsuario}></Post>
            </span>

            <PerfilInfo usuario={usuarioCarregado} carregarUsuario={carregarUsuario} userPosts={userPosts}></PerfilInfo>



            
        </main>
    )
}

export default Feed;