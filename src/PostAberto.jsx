import "./style/postAberto.scss"
import { resetTelaPrincipal } from "./functions/telas";

import { FaArrowLeft } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";

import { IoSendOutline } from "react-icons/io5";


function PostAberto(){

    return (
        <div id="telaPostAberto">

        <div className="voltarFeed">
            <FaArrowLeft className="seta" onClick={() =>{resetTelaPrincipal()}}/>
            <p>Voltar para o feed</p>
        </div>

        

        <div className="post postConfigPadrao postAberto">

            <span className='alinhamento'>
                <BsPersonCircle className='userFoto'></BsPersonCircle>

                <header className="conteudo">

                    <span className='linha1'>

                    <h3 className='userName'>user044</h3>

                    <p className='data'>34/23/23</p>
                    </span>
                    <p className='texto'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus consequatur, fugit alias debitis commodi incidunt expedita libero asperiores fuga harum cupiditate quisquam reprehenderit omnis sed aspernatur mollitia suscipit sunt ratione?</p>

                </header>

            </span>


            <footer>
                {/* REPOST BTN */}
                <button className="postRepostado repostBtn">

                    <FaRetweet />4

                </button>

                {/* COMENTARIO BTN */}
                {/* <button>
                    <FaRegComment />4
                </button> */}

                {/* LIKE BTN */}
                <button className="postCurtido likeBtn">

                    <FaHeart />
                    
                    77

                </button>

                    

                
            </footer>
        </div>

        <h4>14 Comentários</h4>


        <div className="post postConfigPadrao">

        <span className='alinhamento'>
            <BsPersonCircle className='userFoto'></BsPersonCircle>

            <header className="conteudo">

                <span className='linha1'>

                <h3 className='userName'>user044</h3>

                <p className='data'>34/23/23</p>
                </span>
                <p className='texto'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus consequatur, fugit alias debitis commodi incidunt expedita libero asperiores fuga harum cupiditate quisquam reprehenderit omnis sed aspernatur mollitia suscipit sunt ratione?</p>

            </header>

        </span>


        <footer>
            {/* REPOST BTN */}
            <button className="postRepostado repostBtn">

                <FaRetweet />4

            </button>

        

            {/* LIKE BTN */}
            <button className="postCurtido likeBtn">

                <FaHeart />
                
                77

            </button>

                

            
        </footer>
        </div>

        <div className="post postConfigPadrao">

        <span className='alinhamento'>
            <BsPersonCircle className='userFoto'></BsPersonCircle>

            <header className="conteudo">

                <span className='linha1'>

                <h3 className='userName'>user044</h3>

                <p className='data'>34/23/23</p>
                </span>
                <p className='texto'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus consequatur, fugit alias debitis commodi incidunt expedita libero asperiores fuga harum cupiditate quisquam reprehenderit omnis sed aspernatur mollitia suscipit sunt ratione?</p>

            </header>

        </span>


        <footer>
            {/* REPOST BTN */}
            <button className="postRepostado repostBtn">

                <FaRetweet />4

            </button>

        

            {/* LIKE BTN */}
            <button className="postCurtido likeBtn">

                <FaHeart />
                
                77

            </button>

                

            
        </footer>
        </div>

        <div className="post postConfigPadrao">

        <span className='alinhamento'>
            <BsPersonCircle className='userFoto'></BsPersonCircle>

            <header className="conteudo">

                <span className='linha1'>

                <h3 className='userName'>user044</h3>

                <p className='data'>34/23/23</p>
                </span>
                <p className='texto'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus consequatur, fugit alias debitis commodi incidunt expedita libero asperiores fuga harum cupiditate quisquam reprehenderit omnis sed aspernatur mollitia suscipit sunt ratione?</p>

            </header>

        </span>


        <footer>
            {/* REPOST BTN */}
            <button className="postRepostado repostBtn">

                <FaRetweet />4

            </button>

        

            {/* LIKE BTN */}
            <button className="postCurtido likeBtn">

                <FaHeart />
                
                77

            </button>

                

            
        </footer>
        </div>

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