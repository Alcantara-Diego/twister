import { useEffect, useId, useState } from 'react';
import './style/feed.scss'
import Post from './Post';
import NovoPost from './NovoPost'
import { BsPersonCircle } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";
import PerfilInfo from  './PerfilInfo'

import { userInfoDb } from './dbTeste';
import { postsInfo, donoPerfil } from './dbTeste';

import { mostrarPerfil } from './functions/users';

function Feed(){


    const [attFeed, setAttFeed] = useState(false)
    // Informações do usuário apresentado no perfil
    const [usuarioCarregado, setUsuarioCarregado] = useState(null);

    const carregarUsuario = (username) => {
        const usuarioInfo = userInfoDb.find(user => user.username === username);

        mostrarPerfil(usuarioInfo)

    

        setUsuarioCarregado(usuarioInfo);
    }

    const publicarPost = () =>{


        let txt = document.getElementById("criarTexto")

        // Impedir o usuário de postar se não tiver escrito nada
        if(txt.value.length > 1){

            

            let postId = 11

            console.log(postId)

            let postObj = {
                id: postId,
                username: donoPerfil.username,
                data: "44/01/2024",
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

            <PerfilInfo usuario={usuarioCarregado}></PerfilInfo>



            
        </main>
    )
}

export default Feed;