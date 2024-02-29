import { useContext, useEffect, useState } from 'react';
import './style/feed.scss'
import Post from './Post';
import NovoPost from './NovoPost'
import { useLocation } from 'react-router-dom';
import { AuthGoogleContext } from './contexts/AuthGoogle';


function Feed(props){

    const { postsDisponiveis, usuarioLogado } = useContext(AuthGoogleContext);

    const url = useLocation();
    const [attFeed, setAttFeed] = useState(false);

    

  

  
    function prepararPost(){
        // publicarPost("post")
        setAttFeed(!attFeed);

    }

    
    return(
        <main id='telaFeed'>
            <span id='telaPosts'>
                <NovoPost 
                prepararPost={prepararPost}
                alterarURL={props.alterarURL}></NovoPost>
                

                <Post
                postsInfo={postsDisponiveis}
                abrirPost={props.abrirPost}
                alterarURL={props.alterarURL}
                abrirPerfil={props.abrirPerfil}
                mostrarPerfilPeloUsername="negar"
                origem="feed"
                autorizarAbrirPost="permitir"></Post>
            </span>
            
        </main>
    )
}

export default Feed;

