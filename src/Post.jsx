import PropTypes from 'prop-types';

import './style/post.scss'

import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";

import { postsInfo } from './dbTeste';
import { mostrarPerfil } from './functions/users';
import { useState } from 'react';



function Post(props){

    const [update, setUpdate] = useState(false)

    function alterarLikeRepost(id, btn){

        let index = postsInfo.findIndex(post => post.id == id)

        switch (btn) {
            case "like":
                // Aumentar ou diminuir o número de likes baseado se o usuário já curtiou ou não
                postsInfo[index].curtido? postsInfo[index].likes-- : postsInfo[index].likes++

                // Curtir o post se não tava curtido e vice-versa
                postsInfo[index].curtido = !postsInfo[index].curtido
                
                break;

            case "repost":
                // Aumentar ou diminuir o número de repost baseado se o usuário já repostou ou não
                postsInfo[index].repostado? postsInfo[index].reposts-- : postsInfo[index].reposts++

                // Repostar se não tava repostado e vice-versa
                postsInfo[index].repostado = !postsInfo[index].repostado

                break
        
            default:
                break;
        }

        
        // Atualizar o componente
        setUpdate(!update)
        
    }
    
    return (
        <span>
            {props.postsInfo.slice().reverse().map((info) => (


                <div className="post postConfigPadrao" key={info.id}>

                <span className='alinhamento'>
                    <BsPersonCircle className='userFoto'></BsPersonCircle>

                    <header className="conteudo">

                        <span className='linha1'>

                        <h3 className='userName'  onClick={() => props.carregarUsuario(info.username)}>{info.username}</h3>

                        <p className='data'>{info.data}</p>
                        </span>
                        <p className='texto'>{info.texto}</p>

                    </header>

                </span>


                <footer>
                    {/* REPOST BTN */}
                    <button className={info.repostado? "postRepostado repostBtn" : "repostBtn"} onClick={() => alterarLikeRepost(info.id, "repost")}>

                        <FaRetweet />{info.reposts}

                    </button>

                    {/* COMENTARIO BTN */}
                    <button>
                        <FaRegComment />{info.comentarios}
                    </button>

                    {/* LIKE BTN */}
                    <button className={info.curtido? "postCurtido likeBtn" : "likeBtn"} id={`likeBtn${info.id}`} onClick={() => alterarLikeRepost(info.id, "like")}>

                        {info.curtido ? <FaHeart /> : <FaRegHeart />}
                        {info.likes}

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
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        data: PropTypes.string.isRequired,
        texto: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

export default Post;