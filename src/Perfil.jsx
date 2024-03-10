import "./style/perfil.scss"
import Post from './Post';
import { useContext, useEffect, useState } from "react";
import { AuthGoogleContext } from "./contexts/AuthGoogle";
import { BsPencilFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { BsCalendar2CheckFill } from "react-icons/bs";

import { updateUsuario, updateSeguidores } from "./pastaFirebase/updateData";
import { avaliarNotificacaoSeguidores } from "./functions/notificacoes";

function Perfil(props){

    // modelo evita bugs no componente caso os props não tenham chegados quando o componente tentar carregar as info. Nesse caso, é passado os dados do modelo invés do props
    let modelo = {
        username: "username",
        seguidores: ["dcf"],
        seguindo: ["dfv"],
        sigo: true,
        recado: "Twister social media",
        cadastro: {data: "01/01/2024"},
        idPostsCriados: []
    }

    const { usuarioLogado, usuariosDisponiveis } = useContext(AuthGoogleContext);
    // Info que sera renderizada no componente
    const [dados, setDados] = useState(modelo);
    const [posts, setPosts] = useState([]);

    const [editandoRecado, setEditandoRecado] = useState(false);
    const [recadoSalvo, setRecadoSalvo] = useState(dados.recado);

    // Impedir spam de leitura na DB ao seguir o usuario
    const [seguirContagem, setSeguirContagem] = useState(1);
    const [contagemBloqueada, setContagemBloqueada] = useState(false);

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
    function exibirLista(conteudo, tipo){

        let users = []
      
        usuariosDisponiveis.forEach(usuario => {
            conteudo.forEach(nomeSalvo => {
                if (usuario.username === nomeSalvo) {
                    users.push(usuario);
                }
            });
        });
        
        props.setListaEditavelInfo([users, tipo]);
        document.getElementById("listaEditavel").style.display="block";
        
    }


    async function toggleSeguirSeguindo(usuario){
        console.log(seguirContagem)
        contagemBloqueada && console.log("Seguir/Seguindo não registrado devido a SPAM");
        

        // Atualizar perfil visualmente
        if(usuarioLogado.seguindo.includes(usuario.username)){
            // Remover os usuários da lista de seguidores e seguindo um do outro
            usuarioLogado.seguindo = usuarioLogado.seguindo.filter(user => user !== usuario.username);

            usuario.seguidores = usuario.seguidores.filter(user => user !== usuarioLogado.username);            

        } else {
            // Adicionar os usuários da lista de seguidores e seguindo um do outro
            usuarioLogado.seguindo.push(usuario.username);

            usuario.seguidores.push(usuarioLogado.username);            
        }

 
        if (contagemBloqueada) {
            console.log("Botão de seguidores bloqueado");
            // Continuar aumentando contagem para atualizar o componente e dar feedback visual
            setSeguirContagem(seguirContagem+1)
            return
        }

        // Atualizar perfil na DB
        const resultado = await updateSeguidores(usuarioLogado.username, usuario.username);

        // Aumentar a contagem para travar o botão em caso de spam
        setSeguirContagem(seguirContagem+1)


        if (resultado == "sucesso") {
        
            // Verificar se o usuario deve ser notificado da atualizacao nos seguidores
            usuario.seguidores.includes(usuarioLogado.username)? avaliarNotificacaoSeguidores(usuario.username, usuarioLogado):null;


            console.log("lista de seguidores atualizada");
            // Se a contagem de cliques no botao for maior que 2, nao gravar na DB proximos cliques
            seguirContagem>2? setContagemBloqueada(true):null;
            return

        } 
        
        console.log("Erro na DB ao atualizar lista de seguidores");
      
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
                    exibirLista(dados.seguidores, "Seguidores")
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
                        () =>{exibirLista(dados.seguindo, "Seguindo")}}>
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