import PropTypes from 'prop-types';
import './style/post.scss'
import { exibirAlerta, solicitarPostAbertoRender } from './functions/telas';

import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";


import { postsInfoDb, donoPerfil } from './dbTeste';

import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { AuthGoogleContext } from './contexts/AuthGoogle';
import { temporizador } from './functions/extras';
import { updateLikesDoPost } from './pastaFirebase/updateData';



function Post(props){

    const { usuarioLogado } = useContext(AuthGoogleContext);

    const [geradorDePosts, setGeradorDePosts] = useState(null);
    // Usado para impedir que o usuário force várias leituras na Db através dos likes
    const [contagemDeLikes, setContagemDeLikes] = useState(0);
    const [monitorarLikes, setMonitorarLikes] = useState(false);

    // Identificar a origem dos posts para identificar como apresenta-los
   useEffect(()=>{
  
    if(props.origem=="postAberto" && props.postsInfo.length > 1){
        // Deve ser carregado apenas um post e seus subcomentarios na tela PostAberto.jsx
        throw new Error("Mais de um post está sendo carregado no PostAberto.jsx");
  
    }
   }, []);


    // Controlar contagem de likes para evitar spam
    useEffect(() =>{

        function zerarContagem(){
            setContagemDeLikes(0);
            setMonitorarLikes(false);
        }

        // Se o monitoramento for ligado...
        if (monitorarLikes) {
            // ligar temporizador para zerar contagem depois de um tempo para diminuir o spam
            temporizador(25, zerarContagem);
        }

    }, [monitorarLikes]);


    async function alterarLikes(id){

        sessionStorage.removeItem("Firebase:posts");

        // Se o comentario for um subcomentario de outro post...
        if(props.comentarioPai && usuarioLogado){
            // Ligar monitoramento de likes para evitar spam do botao
            !monitorarLikes && setMonitorarLikes(true);

            // Achar o index do post dentro dos subcomentarios do post principal
            let index = props.comentarioPai.comentariosArray.findIndex(post => post.id == id)
            
            // invés de chamar o props tem que chamar a DB direto para salvar a troca(Funçao pode ser alterada devido a isso)
            let usuarioAtual = donoPerfil.username

            let acharUsuarioNosLikes = props.comentarioPai.comentariosArray[index].likes.indexOf(usuarioAtual)

                    if(acharUsuarioNosLikes == -1){
                        props.comentarioPai.comentariosArray[index].likes.push(usuarioAtual)


                    }else{
                        props.comentarioPai.comentariosArray[index].likes.splice(acharUsuarioNosLikes, 1)
                    }

                    console.log(postsInfoDb[index].likes)

        }
        else if(usuarioLogado){
            // Ligar monitoramento de likes para evitar spam do botao
            !monitorarLikes && setMonitorarLikes(true);

            // Encontrar o post pelo ID
            let index = geradorDePosts.findIndex(post => post.localId == id)

            // Verificar se o usuário está na lista de likes do post
            let acharUsuarioNosLikes = geradorDePosts[index].likes.indexOf(usuarioLogado.username);
            // Adiciona o usuário nos likes se ele não está, e remove se já está
            acharUsuarioNosLikes == -1? geradorDePosts[index].likes.push(usuarioLogado.username) : geradorDePosts[index].likes.splice(acharUsuarioNosLikes, 1);

            setContagemDeLikes(contagemDeLikes+1);

            // Impedir a leitura do banco de dados se o usuário spammar o botão 
            if (contagemDeLikes > 20) {
                console.log("LIKES BLOQUEADO")
              
            } else{
                
                // Array com os likes atualizados
                const likesAtualizados = geradorDePosts[index].likes
                console.log(likesAtualizados);
                let resultado = await updateLikesDoPost(id, usuarioLogado.username);


                resultado !== "sucesso"? console.log(resultado) : console.log("Like contabilizado na db");
            }

        } else{
            console.log("Need login")

        }
    }


   

 
   
    // Ter controle da quantidade de render durante produção
    // console.log("------POST RENDERIZADO------");


  

    function prepararAlerta(mainId, paiId){
        if(paiId){
            exibirAlerta(mainId, paiId);

        }else{
            exibirAlerta(mainId, null);
        }

    }

    // Após o comentario/post ser deletado, identificar o tipo para tomar próxima ação
    // const identificarTipoDoDelete = (tipo) =>{
    //     // O param tipo deve trazer uma array de 2 valores. [0] mostra se foi apagado comentario ou post. [1] trás o username do post que foi deletado 
        

    //     // Se o usuário apagou o post dele, fecha o componente PostAberto.JSX e o redireciona para o perfil dele
    //     if(tipo[0] === "post"){
    //         props.alterarURL(`usuario/${tipo[1]}`)
            

    //     } else { // Se o usuário apagou algum comentário, apenas atualiza o post com os comentários atualizados
    //         props.atualizarPostAberto();
    //     }

        
        


    // }

    // solicitarPostAbertoRender(identificarTipoDoDelete);



    // Identificar onde o usuário clicou para evitar que o post abra ao tentar executar outra função
    const validarAberturaDoPost = (event, id) =>{
        const tagClicada = event.target.tagName;

        console.log(tagClicada)

        // elementos responsáveis por outras funções
        const elementosBloqueados = ["IMG", "SVG", "BUTTON", "PATH"];

        // Se foi clicado em um elemento responsável por outra função, o post não deve abrir
        if(!elementosBloqueados.includes(tagClicada.toUpperCase())){
            console.log("trigger");
            props.alterarURL(`post/${id}`)
        }
    }


    // useEffect(() =>{
    //     console.log(props.postsInfo);

    // }, [props.postsInfo]);

    return (
    // Se mudar estrutura do post, deve verificar se não afetará a função validarAberturaDoPost devido as tags
        <span>
            {props.postsInfo && props.postsInfo.length > 0 ? (
                props.postsInfo.map((info) => (
                    <div className="post postConfigPadrao" key={info.localId}
                    onClick={(event) => validarAberturaDoPost(event, info.localId)}>

                <span className='alinhamento'>

                    {info.fotoURL?(
                    <img src={info.fotoURL} className="fotoDePerfil" alt="foto de perfil"
                    onClick={() =>{props.origem=="feed"?props.abrirPerfil(info.username) : null}} />) : 

                    (<BsPersonCircle className='userFoto'
                    onClick={() =>{props.origem=="feed"?props.abrirPerfil(info.username) : null}}></BsPersonCircle>)}

                    <header className="conteudo">

                        <div className='nomeTextoContainer'>
                            <span className='linha1'>
                                <div>
                                    <h3 className='userName'>
                                        {info.displayName}
                                    </h3>
                                    <h4 className='secundario'>
                                        {info.username}
                                    </h4>
                                </div>
                                <p className='data'>{info.data.data}</p>
                            </span>


                            <p className='texto'>{info.texto}</p>
                        </div>

                      
                        {/* Checar se o post foi aberto e o usuário é dono do post/comentario para poder liberar o botão de apagar */}
                        {props.origem=="postAberto" && ( 
                         info.username == donoPerfil.username ||props.comentarioPai && props.comentarioPai.username === donoPerfil.username)?( 

                        
                        // Se for o comentario de um post, a função passa o id do post principal como parâmetro junto do id do comentario para poder achar-lo e questionar se pretende apaga-lo
                        props.comentarioPai?(
                        <button className='deletarPostBtn' onClick={()=>{prepararAlerta(info.localId,  props.comentarioPai.localId)}}><FaRegTrashCan></FaRegTrashCan></button>)

                        : 
                        // Se for o post em sí, o parâmetro de comentário pai não é necessário
                        ( 
                        <button className='deletarPostBtn' onClick={()=>{prepararAlerta(info.localId)}}><FaRegTrashCan></FaRegTrashCan></button>))
                        
                        
                        : null}

                    </header>

                    

                </span>

                


                <footer>


                    {info.comentarios? 
                        <button>
                        <FaRegComment />{info.comentarios.length}
                        </button>
                : null}


                    <button className={usuarioLogado?.username && info.likes.includes(usuarioLogado.username) ? "postCurtido likeBtn" : "likeBtn"} 
                    id={`likeBtn${info.localId}`} 
                    onClick={() => alterarLikes(info.localId)}>

                        {/* Alterar visual dos likes apenas se estiver logado */}
                        {usuarioLogado?.username && info.likes.includes(usuarioLogado.username) ? <FaHeart /> : <FaRegHeart />}
                        {info.likes.length}
            
                    </button> 
                       
                </footer>

               
                </div>
                ))
                ) : null}


            {/* {props.postsInfo.slice().reverse().map((info) => (


                <div className="post postConfigPadrao" key={info.id}>

                <span className='alinhamento'  onClick={props.autorizarAbrirPost =="permitir"? () => {props.abrirPost(info.id)}: null}>
                    <BsPersonCircle className='userFoto'></BsPersonCircle>

                    <header className="conteudo">

                        <div className='nomeTextoContainer'>
                            <span className='linha1'>
                            <h3 className='userName' onClick={props.mostrarPerfilPeloUsername == "permitir"? ()=>{props.alterarURL(`usuario/${info.username}`)} : null}>{info.username}</h3>
                            <p className='data'>{info.data}</p>
                            </span>
                            <p className='texto'>{info.texto}</p>
                        </div>

                      
                        {props.origem=="postAberto" && ( 
                         info.username == donoPerfil.username ||props.comentarioPai && props.comentarioPai.username === donoPerfil.username)?( 

                        
                        props.comentarioPai?(
                        <button className='deletarPostBtn' onClick={()=>{prepararAlerta(info.id,  props.comentarioPai.id)}}><FaRegTrashCan></FaRegTrashCan></button>)

                        : 
                        ( 
                        <button className='deletarPostBtn' onClick={()=>{prepararAlerta(info.id)}}><FaRegTrashCan></FaRegTrashCan></button>))
                        
                        
                        : null}

                    </header>

                    

                </span>

                


                <footer>


                    {info.comentariosArray? 
                        <button>
                        <FaRegComment />{info.comentariosArray.length}
                        </button>
                : null}


                <button className={info.likes.includes(donoPerfil.username) ? "postCurtido likeBtn" : "likeBtn"} id={`likeBtn${info.id}`} onClick={() => alterarLikeRepost(info.id, "like")}>

                {info.likes.includes(donoPerfil.username) ? <FaHeart /> : <FaRegHeart />}
                {info.likes.length}

        
</button> 

               


        
                       

                    
                </footer>

               
                </div>
            ))} */}
            
    </span>
    )
}

Post.propTypes = {
    postsInfo: PropTypes.arrayOf(
      PropTypes.shape({
        localId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        texto: PropTypes.string.isRequired,
        comentarios: PropTypes.array,
      })
    ),
  };

export default Post;