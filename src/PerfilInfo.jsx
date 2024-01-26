import "./style/perfilInfo.scss"
import { BsPersonCircle } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";

import { carregarUserPosts } from './functions/users';
import Post from './Post';


function PerfilInfo(props){

    const [postsInfo, setPostsInfo] = useState([])

    useEffect(() =>{

        if(props.usuario){
            let posts = carregarUserPosts(props.usuario.username)

            setPostsInfo(posts)
            

        }


        
    }, [props.usuario])

   



    return (
        <div id="telaPerfilInfo">
            <header className="perfilInfoPrincipal">
                <BsPersonCircle className="foto"></BsPersonCircle>
                <h1 id="usernamePerfilDisplay">Nome de usuário</h1>
                

                <p id="recadoPerfilDisplay">Dono de tudo, se eu não gostar eu mudo</p>

                <button className="bordaGradient">Seguir
                </button>
            </header>
            

            <ul className="dados">
                <div className="seguidores">
                    <li>
                        <p>Seguidores <span id="seguidoresPerfilDisplay" className="dadosContagem">30</span></p>
                    </li>
                    <li>
                        <p>Seguindo <span id="seguindoPerfilDisplay" className="dadosContagem">15</span></p>
                    </li>
                </div>

                <li>
                    <p>Conta criada em <span className="dadosContagem" id="cadastroPerfilDisplay">20/01/2024</span></p>
                </li>
            </ul>

            <div className="perfilPosts">
                <h3>Posts</h3>

                {postsInfo.length>0? <Post postsInfo={postsInfo}></Post> : <div>nao</div>}


            </div>


        </div>
    )
}

export default PerfilInfo