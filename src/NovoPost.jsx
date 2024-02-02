import { BsPersonCircle } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";

function NovoPost(props){
    return (
        <div className="criarPost postConfigPadrao bordaGradient">
        <header>
                <BsPersonCircle className='userFoto'></BsPersonCircle>
                <div className="conteudo">
                    <h3>Você</h3>
                    <textarea name="criarTexto" id="criarTexto" cols="min-width" rows="3" placeholder='Crie seu post!'></textarea>
                </div>
        
        </header>
            <footer>
                <button className='publicarPostBtn ' onClick={props.publicarPost}>Publicar <BiSolidPencil /></button>
            </footer>
        </div>

    )
}


export default NovoPost