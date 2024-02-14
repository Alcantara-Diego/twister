import { useState } from 'react';
import './style/feed.scss'
import Post from './Post';
import NovoPost from './NovoPost'

import { postsInfoDb } from './dbTeste';
import { publicarPost } from './functions/users';


function Feed(props){

    const [attFeed, setAttFeed] = useState(false);

   
    const abrirPost = (postId) =>{

        const postDetalhes = postsInfoDb.find(post => post.id == postId)
        props.alterarURL(`/post/${postDetalhes.id}`);
        
    }

  
    function prepararPost(){
        publicarPost("post")
        setAttFeed(!attFeed);

    }

    
    return(
        <main id='telaFeed'>
            <span id='telaPosts'>
                <NovoPost prepararPost={prepararPost}></NovoPost>
                

                <Post postsInfo={postsInfoDb} 
                abrirPost={abrirPost}></Post>
            </span>
            
        </main>
    )
}

export default Feed;

