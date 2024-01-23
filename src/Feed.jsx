import './style/feed.scss'
import Post from './Post';
import { BsPersonCircle } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";




function Feed(){

    let postsInfo = [
        {
            id: 1,
            username: "propsUser",
            data: "22/01/2024",
            texto: "esse é o primeiro texto personalizado do app",
            reposts: 7,
            comentarios: 3,
            likes: 45,
            repostado: false,
            curtido: true
        },

        {
            id: 2,
            username: "segundo323",
            data: "10/01/2024",
            texto: "esse é o segundo texto personalizado do app",
            reposts: 2,
            comentarios: 9,
            likes: 14,
            repostado: false,
            curtido: false
        },
        {
            id: 3,
            username: "User033",
            data: "10/01/2024",
            texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ullam ut ex quasi nulla aliquid quo culpa, magnam sapiente soluta atque minima quos inventore, cum in doloribus eveniet! Autem, adipisci.",
            reposts: 5,
            comentarios: 11,
            likes: 90,
            repostado: false,
            curtido: false
        },

        {
            id: 4,
            username: "infinity",
            data: "12/01/2024",
            texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            reposts: 1,
            comentarios: 13,
            likes: 11,
            repostado: true,
            curtido: true
        },
        {
            id: 5,
            username: "infinity",
            data: "12/01/2024",
            texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ullam ut ex quasi nulla aliquid quo culpa, magnam sapiente soluta atque minima quos.",
            reposts: 1,
            comentarios: 13,
            likes: 11,
            repostado: false,
            curtido: false
        }
    ]
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


            <Post postsInfo={postsInfo}></Post>



            
        </main>
    )
}

export default Feed;