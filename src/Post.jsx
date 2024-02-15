import PropTypes from 'prop-types';
import './style/post.scss'
import { toggleTelaPrincipal } from './functions/telas';

import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";

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

    console.log("------POST RENDERIZADO------")


    return (
        <span>
            {props.postsInfo.slice().reverse().map((info) => (


                <div className="post postConfigPadrao" key={info.id}>

                <span className='alinhamento'  onClick={props.autorizarAbrirPost =="permitir"? () => {props.abrirPost(info.id)}: null}>
                    <BsPersonCircle className='userFoto'></BsPersonCircle>

                    <header className="conteudo">

                        <span className='linha1'>


                        <h3 className='userName' onClick={props.mostrarPerfilPeloUsername == "permitir"? ()=>{props.alterarURL(`usuario/${info.username}`)} : null}>{info.username}</h3>


                        <p className='data'>{info.data}</p>
                        </span>
                        <p className='texto'>{info.texto}</p>

                    </header>

                </span>


                <footer>

        
                    {info.comentariosArray? 
                            <button className={info.repostado? "postRepostado repostBtn" : "repostBtn"} onClick={() => alterarLikeRepost(info.id, "repost")}>
                            <FaRetweet />{info.reposts}
                            </button>       
                    : null}

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