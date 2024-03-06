import { useContext, useEffect, useState } from 'react';
import './style/feed.scss'
import Post from './Post';
import NovoPost from './NovoPost'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthGoogleContext } from './contexts/AuthGoogle';
import { ImNewspaper } from "react-icons/im";


function Feed(props){

    const { postsDisponiveis, usuarioLogado } = useContext(AuthGoogleContext);

    const url = useLocation();
    const navigate = useNavigate();
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

                <div className='timelineBtn' onClick={()=>{navigate("/timeline")}}><ImNewspaper />
                Clique aqui para acessar a timeline</div>
                

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

