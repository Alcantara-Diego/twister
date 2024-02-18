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

import { useState } from 'react';



function Post(props){

    const [update, setUpdate] = useState(false)

    function alterarLikeRepost(id, btn){
        
        

        // Se o comentario for um subcomentario de outro post...
        if(props.comentarioPai){

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
        else{

            let index = postsInfoDb.findIndex(post => post.id == id)

            switch (btn) {
                case "like":
                    let usuarioAtual = donoPerfil.username

                    let acharUsuarioNosLikes = postsInfoDb[index].likes.indexOf(usuarioAtual)

                    if(acharUsuarioNosLikes == -1){
                        postsInfoDb[index].likes.push(usuarioAtual)
                    }else{
                        postsInfoDb[index].likes.splice(acharUsuarioNosLikes, 1)
                    }

                    console.log(postsInfoDb[index].likes)
                    break;

                case "repost":
                    // Aumentar ou diminuir o número de repost baseado se o usuário já repostou ou não
                    postsInfoDb[index].repostado? postsInfoDb[index].reposts-- : postsInfoDb[index].reposts++

                    // Repostar se não tava repostado e vice-versa
                    postsInfoDb[index].repostado = !postsInfoDb[index].repostado

                    break
            
                default:
                    break;
            }

        }
        

        
        // Atualizar o componente
        setUpdate(!update)
        
    }

    // Ter controle da quantidade de render durante produção
    console.log("------POST RENDERIZADO------")


    function prepararAlerta(mainId, paiId){
        if(paiId){
            exibirAlerta(mainId, paiId);

        }else{
            exibirAlerta(mainId, null);
        }

    }

    // Após o comentario/post ser deletado, identificar o tipo para tomar próxima ação
    const identificarTipoDoDelete = (tipo) =>{
        // O param tipo deve trazer uma array de 2 valores. [0] mostra se foi apagado comentario ou post. [1] trás o username do post que foi deletado 
        

        // Se o usuário apagou o post dele, fecha o componente PostAberto.JSX e o redireciona para o perfil dele
        if(tipo[0] === "post"){
            props.alterarURL(`usuario/${tipo[1]}`)
            

        } else { // Se o usuário apagou algum comentário, apenas atualiza o post com os comentários atualizados
            props.atualizarPostAberto();
        }

        
        


    }

    solicitarPostAbertoRender(identificarTipoDoDelete);


    return (
        <span>
            {props.postsInfo.slice().reverse().map((info) => (


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

                      
                        {/* Checar se o post foi aberto e o usuário é dono do post/comentario para poder liberar o botão de apagar */}
                        {props.origem=="postAberto" && ( 
                         info.username == donoPerfil.username ||props.comentarioPai && props.comentarioPai.username === donoPerfil.username)?( 

                        
                        // Se for o comentario de um post, a função passa o id do post principal como parâmetro junto do id do comentario para poder achar-lo e questionar se pretende apaga-lo
                        props.comentarioPai?(
                        <button className='deletarPostBtn' onClick={()=>{prepararAlerta(info.id,  props.comentarioPai.id)}}><FaRegTrashCan></FaRegTrashCan></button>)

                        : 
                        // Se for o post em sí, o parâmetro de comentário pai não é necessário
                        ( 
                        <button className='deletarPostBtn' onClick={()=>{prepararAlerta(info.id)}}><FaRegTrashCan></FaRegTrashCan></button>))
                        
                        
                        : null}

                    </header>

                    

                </span>

                


                <footer>

{/*         
                    {info.comentariosArray? 
                            <button className={info.repostado? "postRepostado repostBtn" : "repostBtn"} onClick={() => alterarLikeRepost(info.id, "repost")}>
                            <FaRetweet />{info.reposts}
                            </button>       
                    : null} */}

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
            ))}
            
    </span>
    )
}

Post.propTypes = {
    postsInfo: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        data: PropTypes.string.isRequired,
        texto: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

export default Post;