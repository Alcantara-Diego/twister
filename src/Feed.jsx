import { useState } from 'react';
import './style/feed.scss'
import Post from './Post';
import NovoPost from './NovoPost'

import { postsInfoDb } from './dbTeste';
// import { publicarPost } from './functions/users';


function Feed(props){

    const [attFeed, setAttFeed] = useState(false);

   
  

  
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
                mostrarPerfilPeloUsername="negar"
                autorizarAbrirPost="permitir"></Post>
            </span>
            
        </main>
    )
}

export default Feed;

