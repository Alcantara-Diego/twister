import { useEffect } from 'react';
import './style/feed.scss'
import Post from './Post';
import { BsPersonCircle } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";

import { postsInfo } from './dbTeste';

function Feed(){

    useEffect(()=>{
        console.log(postsInfo)

    }, [])

    

    
    return(
        <main id='telaFeed'>
            <div className="criarPost postConfigPadrao bordaGradient">
            <header>
                    <BsPersonCircle className='userFoto'></BsPersonCircle>

                    <div className="conteudo">
                        <h3>Você</h3>
                        <textarea name="criarTexto" id="criarTexto" cols="min-width" rows="3" placeholder='Crie seu post!'></textarea>              
                    </div>
                         
            </header>
                <footer>
                    <button className='publicarPostBtn '>Publicar <BiSolidPencil /></button>
                </footer>

            </div>


            <Post postsInfo={postsInfo}></Post>



            
        </main>
    )
}

export default Feed;