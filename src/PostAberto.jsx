import "./style/postAberto.scss"
import { resetTelaPrincipal } from "./functions/telas";
import Post from "./Post";
import { FaArrowLeft } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { donoPerfil, postsInfoDb } from "./dbTeste";


import { v4 as uuidv4 } from 'uuid';



function PostAberto(props){

    

   let postsInfo = props.postAbertoInfo.comentariosArray
   let comentarioPai = props.postAbertoInfo

    return (

        <div id="telaPostAberto">

            <div className="voltarFeed">
                <FaArrowLeft className="seta" onClick={() =>{resetTelaPrincipal()}}/>
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
</div>: <div>Post não carregado</div>}

        

        

        

        <h4>{props.postAbertoInfo? props.postAbertoInfo.comentariosArray.length : "0"} Comentários</h4>

        {props.postAbertoInfo? <Post postsInfo={postsInfo} comentarioPai={comentarioPai}></Post> : ""}
        






        <div className="inputContainer">

            <input type="text" placeholder="Comentar" name="addSubComentario" id="addSubComentario"/>

            <button className="bordaGradient" onClick={()=>{props.publicarPost("comentario")}}>Publicar</button>

        </div>

        

        </div>
    )
}

export default PostAberto