import { useContext, useEffect, useState } from 'react';
import './style/feed.scss'
import Post from './Post';
import NovoPost from './NovoPost'
import { useLocation } from 'react-router-dom';

import { postsInfoDb } from './dbTeste';
import { AuthGoogleContext } from './contexts/AuthGoogle';


function Feed(props){

    const { postsDisponiveis, usuarioLogado } = useContext(AuthGoogleContext);

    const url = useLocation();
    const [attFeed, setAttFeed] = useState(false);

    

  

  
    function prepararPost(){
        // publicarPost("post")
        setAttFeed(!attFeed);

    }

    function abrirPerfil(username){
        const usuarioNaURL = url.pathname.includes(username)

        if(usuarioLogado){
            if(!usuarioNaURL){
            props.alterarURL(`usuario/${username}`);
            } else{
            console.log("Requisição não veio do feed")
            }
        } else{
            console.log("need login");
        }
        

    }

    
    return(
        <main id='telaFeed'>
            <span id='telaPosts'>
                <NovoPost prepararPost={prepararPost}></NovoPost>
                

                <Post
                postsInfo={postsDisponiveis}
                abrirPost={props.abrirPost}
                alterarURL={props.alterarURL}
                abrirPerfil={abrirPerfil}
                mostrarPerfilPeloUsername="negar"
                origem="feed"
                autorizarAbrirPost="permitir"></Post>
            </span>
            
        </main>
    )
}

export default Feed;

