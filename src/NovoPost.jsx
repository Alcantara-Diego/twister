import { BsPersonCircle } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";
import { useContext } from 'react';
import { AuthGoogleContext } from './contexts/AuthGoogle';

function NovoPost(props){

    const gerarPost =() => {       
        props.prepararPost();
    }

    const { usuarioLogado } = useContext(AuthGoogleContext);



    
    return (
        <div className="criarPost postConfigPadrao bordaGradient">
        <header>

                {usuarioLogado? (
                    <img className="googleFoto fotoDePerfil" src={usuarioLogado.fotoURL} alt="perfil"></img>

                ) : (
                    <BsPersonCircle className='userFoto'></BsPersonCircle>
                )}
               
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