import "./style/postAberto.scss"
import Post from "./Post";
import { publicarPost } from './functions/users'


import { FaArrowLeft } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";


function PostAberto(props){

    const [comentarios, setComentarios] = useState(null)
    const [comentarioPai, setComentarioPai] = useState(null)
    const [attFeed, setAttFeed] = useState(false)
    // Puxar objeto toda vez que carregar o id
    useEffect(() =>{
        
        console.log(props.postAbertoInfo)

        if(props.postAbertoInfo){
            setComentarios(props.postAbertoInfo.comentariosArray)
            setComentarioPai(props.postAbertoInfo)
            
        }

        

    }, [props.postAbertoInfo])


    useEffect(()=>{
        console.log(comentarios)
    }, [comentarios])

   function prepararPost(id){
    publicarPost("comentario", id);
    setAttFeed(!attFeed);


   }

    return (

        <div id="telaPostAberto">

            <div className="voltarFeed">
                <FaArrowLeft className="seta" onClick={() =>{props.alterarURL("/")}}/>
                <p>Voltar para o feed</p>
            </div>

            {props.postAbertoInfo? <div className="post postConfigPadrao postAberto">

                <span className='alinhamento'>
                    <BsPersonCircle className='userFoto'></BsPersonCircle>

                    <header className="conteudo">

                        <span className='linha1'>

                        <h3 className='userName'>{props.postAbertoInfo.username}</h3>

                        <p className='data'>{props.postAbertoInfo.data}</p>
                        </span>
                        <p className='texto'>{props.postAbertoInfo.texto}</p>

                    </header>

                </span>


                <footer>
                    
                    {/* REPOST BTN */}
                    <button className="postRepostado repostBtn">

                        <FaRetweet />
                        {props.postAbertoInfo.reposts}

                    </button>


                    {/* LIKE BTN */}
                    <button className="postCurtido likeBtn">

                        <FaHeart />
                        {props.postAbertoInfo.likes.length}

                    </button>

                        

                    
                </footer>
                </div>
: <div>Post não carregado</div>}

        

        

        

        <h4>{props.postAbertoInfo? props.postAbertoInfo.comentariosArray.length : "0"} Comentários</h4>

        {comentarios? console.log(comentarios) : null}
        {comentarios? 
        <Post postsInfo={comentarios} 
        comentarioPai={comentarioPai}
        abrirPerfil={true}></Post> : ""}
        






        <div className="inputContainer">

            <input type="text" placeholder="Comentar" name="addSubComentario" id="addSubComentario"/>

            <button className="bordaGradient" onClick={()=>{prepararPost(props.postAbertoInfo.id)}}>Publicar</button>

        </div>

        

        </div>
    )
}

export default PostAberto