import { useEffect, useState } from 'react';
import './style/feed.scss'
import Post from './Post';
import { BsPersonCircle } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";
import PerfilInfo from  './PerfilInfo'

import { userInfoDb } from './dbTeste';
import { postsInfo } from './dbTeste';

import { mostrarPerfil } from './functions/users';

function Feed(){

    const [usuarioCarregado, setUsuarioCarregado] = useState(null);

    const carregarUsuario = (username) => {
        // console.log(username)
        const usuarioInfo = userInfoDb.find(user => user.username === username);
        // console.log(usuarioInfo)

        mostrarPerfil(usuarioInfo)

    

        setUsuarioCarregado(usuarioInfo);
    }

    
    return(
        <main id='telaFeed'>
            <span id='telaPosts'>
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

                <Post postsInfo={postsInfo} carregarUsuario={carregarUsuario}></Post>
            </span>

            <PerfilInfo usuario={usuarioCarregado}></PerfilInfo>



            
        </main>
    )
}

export default Feed;