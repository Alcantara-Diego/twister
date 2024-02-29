import PropTypes from 'prop-types';
import './style/post.scss'
import { exibirAlerta, solicitarPostAbertoRender } from './functions/telas';

import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";


import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { AuthGoogleContext } from './contexts/AuthGoogle';
import { temporizador } from './functions/extras';
import { updateLikesDoComentario, updateLikesDoPost } from './pastaFirebase/updateData';



function Post(props){

    const { usuarioLogado, setRecarregarPostsDaDb, recarregarPostsDaDb } = useContext(AuthGoogleContext);

   
    // Usado para impedir que o usuário force várias leituras na Db através dos likes
    const [contagemDeLikes, setContagemDeLikes] = useState(0);
    const [monitorarLikes, setMonitorarLikes] = useState(false);

    // Identificar a origem dos posts para identificar como apresenta-los
   useEffect(()=>{
  
    if(props.origem=="postAberto" && props.listarComentarios !== "permitir" && props.postsInfo.length > 1){
        console.log(props.postsInfo);
        // Deve ser carregado apenas um post e seus subcomentarios na tela PostAberto.jsx
        throw new Error("Mais de um post principal está sendo carregado no PostAberto.jsx");
  
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
        const limiteDeLikes = 25;
        // Apagar os posts salvos na session para recarregarem atualizados
        sessionStorage.removeItem("Firebase:posts");

        // Se o comentario for um subcomentario de outro post...


        if(props.comentarioPai && usuarioLogado){
            // Ligar monitoramento de likes para evitar spam do botao e leituras desnecessárias no banco de dados
            !monitorarLikes && setMonitorarLikes(true);


            // Achar o index do post dentro dos subcomentarios do post principal
            let index = props.comentarioPai.comentarios.findIndex(post => post.localId == id)
            
         
            let usuarioAtual = usuarioLogado.username

            let acharUsuarioNosLikes = props.comentarioPai.comentarios[index].likes.indexOf(usuarioAtual)

            if(acharUsuarioNosLikes != -1){
                props.comentarioPai.comentarios[index].likes.splice(usuarioAtual, 1)

            }else{
                props.comentarioPai.comentarios[index].likes.push(usuarioAtual)
            }

            
            setContagemDeLikes(contagemDeLikes+1);

            if (contagemDeLikes > limiteDeLikes) {
                console.log("LIKES BLOQUEADO")
              
            } else{
                // Contabilizar like na Db
                const resultado = await updateLikesDoComentario(id, props.comentarioPai.localId, usuarioLogado.username);

                resultado=="sucesso"? console.log("likes atualizados") : console.log("Erro ao atualizar os likes do comentário");

                // Atualizar todos os posts disponíveis
                setRecarregarPostsDaDb(!recarregarPostsDaDb);

            }


        }
        else if(usuarioLogado){
            // Ligar monitoramento de likes para evitar spam do botao
            !monitorarLikes && setMonitorarLikes(true);

            // Encontrar o post pelo ID
            let index = props.postsInfo.findIndex(post => post.localId == id)

            // Verificar se o usuário está na lista de likes do post
            let acharUsuarioNosLikes = props.postsInfo[index].likes.indexOf(usuarioLogado.username);
            // Adiciona o usuário nos likes se ele não está, e remove se já está
            acharUsuarioNosLikes == -1? props.postsInfo[index].likes.push(usuarioLogado.username) : props.postsInfo[index].likes.splice(acharUsuarioNosLikes, 1);

            setContagemDeLikes(contagemDeLikes+1);

            // Impedir a leitura do banco de dados se o usuário spammar o botão 
            if (contagemDeLikes > limiteDeLikes) {
                console.log("LIKES BLOQUEADO")
              
            } else{
                
                // Array com os likes atualizados
                const likesAtualizados = props.postsInfo[index].likes
                console.log(likesAtualizados);
                let resultado = await updateLikesDoPost(id, usuarioLogado.username);


                resultado !== "sucesso"? console.log(resultado) : console.log("Like contabilizado na db");

                // Atualizar todos os posts disponíveis
                setRecarregarPostsDaDb(!recarregarPostsDaDb);
            }

        } else{
            console.log("Need login")
            props.alterarURL("/login")

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

        if(!usuarioLogado){
            props.alterarURL("/login")
            return
        }

        if(props.origem == "feed" || 
        props.origem == "perfil"){
            const tagClicada = event.target.tagName;

            console.log("im")
    
            // elementos responsáveis por outras funções
            const elementosBloqueados = ["IMG", "SVG", "BUTTON", "PATH"];
    
            // Se foi clicado em um elemento responsável por outra função, o post não deve abrir
            if(!elementosBloqueados.includes(tagClicada.toUpperCase())){
                props.alterarURL(`post/${id}`)
            }

        } 

        

    }


   

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
                    onClick={() =>{props.origem!=="perfil" && !props.comentarioPai?props.abrirPerfil(info.username) : null}} />) : 

                    (<BsPersonCircle className='userFoto'
                    onClick={() =>{props.origem!=="perfil" && !props.comentarioPai?props.abrirPerfil(info.username) : null}}></BsPersonCircle>)}

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
                         info?.username == usuarioLogado?.username ||
                         props.comentarioPai && props.comentarioPai.username === usuarioLogado?.username)?( 

                        
                        // Se for o comentario de um post, a função passa o id do post principal como parâmetro junto do id do comentario para poder achar-lo e questionar se pretende apaga-lo
                        // props.comentarioPai?(
                        // <button className='deletarPostBtn' onClick={()=>{prepararAlerta(info.localId,  props.comentarioPai.localId)}}><FaRegTrashCan></FaRegTrashCan></button>)

                        // : 
                        // Se for o post em sí, o parâmetro de comentário pai não é necessário
                        // ( 
                        // <button className='deletarPostBtn' onClick={()=>{prepararAlerta(info.localId)}}><FaRegTrashCan></FaRegTrashCan></button>))

                        null)
                        
                        
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