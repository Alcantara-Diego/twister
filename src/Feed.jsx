import { useContext, useEffect, useState } from 'react';
import './style/feed.scss'
import Post from './Post';
import NovoPost from './NovoPost'

import { postsInfoDb } from './dbTeste';
import { AuthGoogleContext } from './contexts/AuthGoogle';


function Feed(props){

    const [attFeed, setAttFeed] = useState(false);

    const { postsDisponiveis, usuarioLogado } = useContext(AuthGoogleContext);

  

  
    function prepararPost(){
        // publicarPost("post")
        setAttFeed(!attFeed);

    }

    
    return(
        <main id='telaFeed'>
            <span id='telaPosts'>
                <NovoPost prepararPost={prepararPost}></NovoPost>
                

                <Post postsInfo={postsInfoDb}
                abrirPost={props.abrirPost}
                alterarURL={props.alterarURL}
                mostrarPerfilPeloUsername="negar"
                autorizarAbrirPost="permitir"></Post>
            </span>
            
        </main>
    )
}

export default Feed;

