import "./style/perfil.scss"
import Post from './Post';
import { carregarUsuarioPorUsername } from "./functions/users";
import { BsPersonCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { donoPerfil, userInfoDb } from "./dbTeste";

function Perfil(props){

    // modelo evita bugs no componente caso os props não tenham chegados quando o componente tentar carregar as info. Ness caso, é passado os dados do modelo invés do props
    let modelo = {
        username: "username",
        seguidores: ["dcf"],
        seguindo: ["dfv"],
        sigo: true,
        recado: "Twister social media",
        cadastro: "01/01/2024",
        idPostsCriados: []
    }

    const [dados, setDados] = useState(modelo);
    const [posts, setPosts] = useState([]);

    const [editandoRecado, setEditandoRecado] = useState(false);
    const [recadoSalvo, setRecadoSalvo] = useState(dados.recado);

    const [updatePerfil, setUpdatePerfil] = useState(false);

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

    // Mostrar lista de seguidores ou seguindo se clicar em uma das 2 opções no perfil do usuário
    function exibirLista(conteudo){
        console.table(conteudo)

        let users = []
        conteudo.forEach(username => {
            let user = carregarUsuarioPorUsername(username);

            users.push(user)


            
        });


        console.log(users)
        props.setListaEditavelInfo(users);
        document.getElementById("listaEditavel").style.display="block";
        
    }


    function toggleSeguirSeguindo(seguindo, username){



        let usuario = carregarUsuarioPorUsername(username)

        if(donoPerfil.seguindo.includes(username)){
            donoPerfil.seguindo = donoPerfil.seguindo.filter(user => user !== username);

            usuario.seguidores = usuario.seguidores.filter(user => user !== donoPerfil.username);

        } else {
            donoPerfil.seguindo.push(username);

            usuario.seguidores.push(donoPerfil.username)
        }


        console.log(donoPerfil)
        console.log(usuario)
        setUpdatePerfil(!updatePerfil)
        
    }




    return (
        <div id="telaPerfilInfo">
            <header className="perfilInfoPrincipal">
                <BsPersonCircle className="foto"></BsPersonCircle>
                <h1 id="usernamePerfilDisplay">{dados.username}</h1>
                

                

                {editandoRecado? <input type="text" name="" id="recadoPerfilInput" value={recadoSalvo} onChange={(e) => setRecadoSalvo(e.target.value)} autoFocus/> : <p id="recadoPerfilDisplay">{dados.recado}</p>}
                

                {/* Se o usuário for dono do perfil.... */}
                {dados.username === donoPerfil.username?(

                editandoRecado?(
                    // Se ele estiver editando o próprio recado, mostrar botão de salvar mudanças
                    <button className="bordaGradient" onClick={salvarRecado}>Salvar
                    </button>)
                    :
                    // Mostrar botão de editar recado caso ele seja o dono e não esteja editando atualmente
                    (<button className="bordaGradient" onClick={autorizarEditarRecado}>Editar
                </button>))
                :
                // Se ele não for o dono do perfil, checa se ele segue o perfil apresentado
                (donoPerfil.seguindo.includes(dados.username)?(
                // Se seguir, mostra botão para parar de seguir
                <button className="bordaGradient" 
                onClick={() => toggleSeguirSeguindo(true,  dados.username)}>Seguindo
                </button>) 
                : 
                // Se não segue, botão para começar a seguir
                (<button className="bordaGradient" 
                onClick={() => toggleSeguirSeguindo(false, dados.username)}>Seguir
                </button>))}
                
            </header>
            

            <ul className="dados">
                <div className="seguidores">
                    <li className="btn" 
                    onClick={() =>{
                    exibirLista(dados.seguidores)
                }}>
                        <p>Seguidores <span id="seguidoresPerfilDisplay" className="dadosContagem">{dados && dados.seguidores.length}</span></p>
                    </li>
                    <li className="btn"
                    onClick={() =>{
                        exibirLista(dados.seguindo)
                        }}>
                        <p>Seguindo <span id="seguindoPerfilDisplay" className="dadosContagem">{dados && dados.seguindo.length }</span></p>
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
                alterarURL={props.alterarURL}
                ></Post> : <div>Usuário ainda não publicou nenhum post</div>}

            </div>


        </div>
    )
}

export default Perfil