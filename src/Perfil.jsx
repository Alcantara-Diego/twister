import "./style/perfil.scss"
import Post from './Post';
import { BsPersonCircle } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { donoPerfil } from "./dbTeste";

function Perfil(props){

    let modelo = {
        username: "username",
        seguidores: 0,
        seguindo: 0,
        sigo: true,
        recado: "Twister social media",
        cadastro: "01/01/2024",
        idPostsCriados: []
    }

    const [dados, setDados] = useState(modelo);
    const [posts, setPosts] = useState([]);

    const [editandoRecado, setEditandoRecado] = useState(false)
    const [recadoSalvo, setRecadoSalvo] = useState(dados.recado)

    // Atualizar info do usuário e posts criados
    useEffect(() =>{
        if(props.usuarioInfo!="vazio"){  
            setDados(props.usuarioInfo);
            setPosts(props.usuarioPosts)
            
        } else{
            
            setDados(modelo);
        } 

        

    }, [props.usuarioInfo, props.usuarioPosts]);

    function autorizarEditarRecado(){
        setEditandoRecado(!editandoRecado);
        
    }

    function salvarRecado(){
        donoPerfil.recado = recadoSalvo;
        setEditandoRecado(!editandoRecado);


    }

    return (
        <div id="telaPerfilInfo">
            <header className="perfilInfoPrincipal">
                <BsPersonCircle className="foto"></BsPersonCircle>
                <h1 id="usernamePerfilDisplay">{dados.username}</h1>
                

                

                {editandoRecado? <input type="text" name="" id="recadoPerfilInput" value={recadoSalvo} onChange={(e) => setRecadoSalvo(e.target.value)} autoFocus/> : <p id="recadoPerfilDisplay">{dados.recado}</p>}
                

                {dados.username === donoPerfil.username?(

                editandoRecado?(
                    <button className="bordaGradient" onClick={salvarRecado}>Salvar
                    </button>)
                    :
                    (<button className="bordaGradient" onClick={autorizarEditarRecado}>Editar
                </button>))
                :
                (<button className="bordaGradient">Seguir
                </button>)}
                
            </header>
            

            <ul className="dados">
                <div className="seguidores">
                    <li>
                        <p>Seguidores <span id="seguidoresPerfilDisplay" className="dadosContagem">{dados.seguidores}</span></p>
                    </li>
                    <li>
                        <p>Seguindo <span id="seguindoPerfilDisplay" className="dadosContagem">{dados.seguindo}</span></p>
                    </li>
                </div>

                <li>
                    <p>Conta criada em <span className="dadosContagem" id="cadastroPerfilDisplay">{dados.cadastro}</span></p>
                </li>
            </ul>

            <div className="perfilPosts">
                <h3>Posts</h3>

                {posts.length>0? <Post 
                postsInfo={posts} 
                abrirPost={props.abrirPost}
                mostrarPerfilPeloUsername="negar"
                autorizarAbrirPost="permitir"
                alterarURL={props.alterarURL}></Post> : <div>Usuário ainda não publicou nenhum post</div>}

            </div>


        </div>
    )
}

export default Perfil