import "./style/postAberto.scss"
import { resetTelaPrincipal } from "./functions/telas";
import Post from "./Post";
import { FaArrowLeft } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";



function PostAberto(props){

   console.log(props.postAbertoInfo.comentariosArray? "tem" : "nao")

   let postsInfo = props.postAbertoInfo.comentariosArray
   console.log(postsInfo)

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
        {props.postAbertoInfo.likes}

    </button>

        

    
</footer>
</div>: <div>Post não carregado</div>}

        

        

        

        <h4>{props.postAbertoInfo? props.postAbertoInfo.comentariosArray.length : "0"} Comentários</h4>

        {props.postAbertoInfo? <Post postsInfo={postsInfo}></Post> : ""}
        






        <div className="inputContainer">

            <input type="text" placeholder="Comentar"/>
            {/* <button>
                <IoSendOutline />
            </button> */}

            <button className="bordaGradient">Publicar</button>

        </div>

        

        </div>
    )
}

export default PostAberto