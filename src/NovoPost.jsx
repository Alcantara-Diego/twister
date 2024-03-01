import { BsPersonCircle } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";
import { useContext } from 'react';
import { AuthGoogleContext } from './contexts/AuthGoogle';
import { addPost } from "./pastaFirebase/addData";
import {salvarData} from "./functions/extras";
import { uuidv4 } from "@firebase/util";

function NovoPost(props){

    const { usuarioLogado, recarregarPostsDaDb, setRecarregarPostsDaDb } = useContext(AuthGoogleContext);

    const gerarPost =() => {       
        props.prepararPost();
    }

    async function validarPost(){

        
        if(!usuarioLogado){
            props.alterarURL("/login")
            console.log("deslogado")
            
        } else{

            let localId = uuidv4();
            let data = salvarData();


            let txt = document.getElementById("criarTexto");


            // Impedir o usuário de postar se não tiver escrito pouco
            if (txt.value.length < 5) {
                console.log("pouca escrita");

            } else {

                let postObj = {
                    displayName: usuarioLogado.displayName,
                    username: usuarioLogado.username,
                    texto: txt.value,
                    data: data,
                    likes: [],
                    comentarios: [],
                    fotoURL: usuarioLogado.fotoURL,
                    apagado: false,
                    localId: localId
                  
                }


                // Encaminhar o post pra db
                const requisicao = await addPost("post", postObj);

                console.log(requisicao);

                if( requisicao == "sucesso"){
                    sessionStorage.removeItem("Firebase:posts");
                    setRecarregarPostsDaDb(!recarregarPostsDaDb);
                    props.alterarURL("/")
                }
                txt.value="";
            }
 
        }
    }
    
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
                <button className='publicarPostBtn ' onClick={() =>{validarPost()}}>Publicar <BiSolidPencil /></button>
            </footer>
        </div>

    )
}


export default NovoPost