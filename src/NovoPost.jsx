import { BsPersonCircle } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";


import salvarData from "./functions/extras";
function NovoPost(props){

    const gerarPost =() => {       
        props.publicarPost("post");
    }


    
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
                <button className='publicarPostBtn ' onClick={() =>{gerarPost()}}>Publicar <BiSolidPencil /></button>
            </footer>
        </div>

    )
}


export default NovoPost