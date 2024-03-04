import "./style/perfil.scss"
import Post from './Post';
import { carregarUsuarioPorUsername } from "./functions/users";
import { useContext, useEffect, useState } from "react";
import { donoPerfil, userInfoDb } from "./dbTeste";
import { AuthGoogleContext } from "./contexts/AuthGoogle";
import { BsPersonCircle } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { buscarUsuarioPorIdentificador } from "./pastaFirebase/getData";
import { updateUsuario, updateSeguidores } from "./pastaFirebase/updateData";

function Perfil(props){

    // modelo evita bugs no componente caso os props não tenham chegados quando o componente tentar carregar as info. Ness caso, é passado os dados do modelo invés do props
    let modelo = {
        username: "username",
        seguidores: ["dcf"],
        seguindo: ["dfv"],
        sigo: true,
        recado: "Twister social media",
        cadastro: {data: "01/01/2024"},
        idPostsCriados: []
    }

    const { usuarioLogado } = useContext(AuthGoogleContext);
    const [dados, setDados] = useState(modelo);
    const [posts, setPosts] = useState([]);

    const [editandoRecado, setEditandoRecado] = useState(false);
    const [recadoSalvo, setRecadoSalvo] = useState(dados.recado);

    const [updatePerfil, setUpdatePerfil] = useState(false);

    // Atualizar info do usuário e posts criados
    useEffect(() =>{
        if(props.usuarioInfo!="vazio"){  
            setDados(props.usuarioInfo);
            Array.isArray(props.usuarioPosts) && setPosts(props.usuarioPosts)

            console.log(props.usuarioInfo)

            
        } else{
            
            setDados(modelo);
        } 

        

    }, [props.usuarioInfo, props.usuarioPosts]);

    function autorizarEditarRecado(){
        setEditandoRecado(!editandoRecado);
    }

    async function salvarRecado(){
        
        dados.recado=recadoSalvo;

        updateUsuario(usuarioLogado.username, "recado", recadoSalvo)
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


    // Apepnas visual ainda, precisa puxar para db(possibilidade de spam)
    async function toggleSeguirSeguindo(usuario){

        if(usuarioLogado.seguindo.includes(usuario.username)){
            // Remover os usuários da lista de seguidores e seguindo um do outro
            usuarioLogado.seguindo = usuarioLogado.seguindo.filter(user => user !== usuario.username);

            usuario.seguidores = usuario.seguidores.filter(user => user !== usuarioLogado.username);            

        } else {
            // Adicionar os usuários da lista de seguidores e seguindo um do outro
            usuarioLogado.seguindo.push(usuario.username);

            usuario.seguidores.push(usuarioLogado.username);            
        }

 
            const resultado = await updateSeguidores(usuarioLogado.username, usuario.username);

            resultado=="sucesso"? console.log("lista de seguidores atualizada") : console.log("Erro ao atualizar lista de seguidores");


            
      


        setUpdatePerfil(!updatePerfil)
        
    }




    return (
        <div id="telaPerfilInfo">
            <header className="perfilInfoPrincipal">
                <div className="fotoNomeRecadoContainer">
                    {/* <BsPersonCircle className="foto"></BsPersonCircle> */}
                    <div className="fotoContainer"><img className="fotoDePerfil" src={dados.fotoURL} alt="" /></div>
                    <h1>{dados.displayName}</h1>
                    <h3 className="usernameInfo">{dados.username}</h3>

                    <div>
                        <p className="secundario dataInfo">
                            <BsCalendar2CheckFill /> - 
                            Conta criada em {dados.cadastro.data}</p>
                    </div>
                    
                    
                    {editandoRecado? <input type="text" name="recadoPerfilInput" id="recadoPerfilInput" value={recadoSalvo} onChange={(e) => setRecadoSalvo(e.target.value)} autoFocus/> : <p className="recadoInfo">{dados.recado}</p>}
                    
                    {/* Se o usuário for dono do perfil.... */}
                    {usuarioLogado && dados.username === usuarioLogado.username?(
                    editandoRecado?(
                        // Se ele estiver editando o próprio recado, mostrar botão de salvar mudanças
                        <button className="bordaGradient" onClick={salvarRecado}>Salvar <FaCheck />


                        </button>)
                        :
                        // Mostrar botão de editar recado caso ele seja o dono e não esteja editando atualmente
                        (<button className="bordaGradient" onClick={autorizarEditarRecado}>Editar <BsPencilFill />

                    </button>))
                    :
                    // Se ele não for o dono do perfil, checa se ele segue o perfil apresentado
                    (usuarioLogado?.seguindo.includes(dados.username)?(
                    // Se seguir, mostra botão para parar de seguir
                    <button className="bordaGradient"
                    onClick={() => toggleSeguirSeguindo(dados)}>Seguindo
                    </button>)
                    :
                    // Se não segue, botão para começar a seguir
                    (<button className="bordaGradient"
                    onClick={() => toggleSeguirSeguindo(dados)}>Seguir
                    </button>))}
                </div>

                <ul className="dados">
                <div className="seguidores">


                    <li className="btn" 
                    onClick={() =>{
                    exibirLista(dados.seguidores)
                }}>
                        <div>

                        <span className="dadosContagem">
                            {dados && dados.seguidores.length }
                        </span>

                        <p>Seguidores</p>

                        </div>
                    </li>
                    <li className="btn"
                    onClick={
                        () =>{exibirLista(dados.seguindo)}}>
                        <div>

                            <span className="dadosContagem">
                                {dados && dados.seguindo.length }
                            </span>

                            <p>Seguindo</p>

                        </div>

                        

                    </li>
                </div>

            </ul>
                
            </header>
            


            <div className="perfilPosts">
                <h3>Posts</h3>

                {posts.length>0? <Post 
                postsInfo={posts} 
                abrirPost={props.abrirPost}
                origem="perfil"
                mostrarPerfilPeloUsername="negar"
                autorizarAbrirPost="permitir"
                alterarURL={props.alterarURL}
                ></Post> : <div>Usuário ainda não publicou nenhum post</div>}

            </div>


        </div>
    )
}

export default Perfil