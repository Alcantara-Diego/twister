import './style/feed.scss'
import { BsPersonCircle } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";


import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";


function Feed(){
    return(
        <main id='telaFeed'>
            <div className="criarPost postConfigPadrao bordaGradient">
            <header>
                    <BsPersonCircle className='userFoto'></BsPersonCircle>

                    <div className="conteudo">
                        <h3>Você</h3>
                        <textarea name="criarTexto" id="criarTexto" cols="min-width" rows="3" placeholder='Crie seu post!'></textarea>              
                    </div>
                         
            </header>
                <footer>
                    <button className='publicarPostBtn '>Publicar <BiSolidPencil /></button>
                </footer>

            </div>


            <div className="post postConfigPadrao">
                <BsPersonCircle className='userFoto'></BsPersonCircle>
                <header className="conteudo">
                    <span className='linha1'>
                    <h3 className='userName'>User033</h3>

                    
                    <p className='data'>21/01/2024</p>
                    </span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ullam ut ex quasi nulla aliquid quo culpa, magnam sapiente soluta atque minima quos inventore, cum in doloribus eveniet! Autem, adipisci.</p>

                </header>
                <footer>
                    <button><FaRetweet />5</button>
                    <button><FaRegComment />12</button>
                    <button><FaRegHeart />93</button>
                </footer>
                            
                        
            </div>
        </main>
    )
}

export default Feed;