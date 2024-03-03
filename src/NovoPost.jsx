import { BsPersonCircle } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";
import { useContext } from 'react';
import { AuthGoogleContext } from './contexts/AuthGoogle';
import FeedbackMsg from './FeedbackMsg'

import { addPost } from "./pastaFirebase/addData";
import {exibirFeedback, salvarData} from "./functions/extras";
import { uuidv4 } from "@firebase/util";
import { useState } from "react";

function NovoPost(props){

    const { usuarioLogado, recarregarPostsDaDb, setRecarregarPostsDaDb } = useContext(AuthGoogleContext);

    const [mensagemAlerta, setMensagemAlerta] = useState("mensagem modelo");


    async function validarPost(){
        // Rejeitar post se nao estiver logado
        if(!usuarioLogado){
            props.alterarURL("/login")
            console.log("deslogado")
            
        } else{
            // Apagar os posts salvos localmente para o authGoogleContext puxar os posts atualizados
            sessionStorage.removeItem("Firebase:posts");

            let localId = uuidv4();
            let data = salvarData();


            let txt = document.getElementById("criarTexto");


            // Impedir o usuário de postar se não tiver escrito pouco
            if (txt.value.length < 5) {
                setMensagemAlerta("O post deve ter pelo menos 5 letras")
                exibirFeedback("erro");

            } else if(txt.value.length > 100){
                setMensagemAlerta("O post deve ter menos de 100 caracteres")
                exibirFeedback("erro");

            } 
            else{

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

                if(requisicao == "sucesso"){
                    setMensagemAlerta("Post criado com sucesso!")
                    exibirFeedback("sucesso");

                    txt.value="";
                    console.log(requisicao)
                    setRecarregarPostsDaDb(!recarregarPostsDaDb);
                    
                }
                
            }
 
        }
    }
    
    return (
        <div className="criarPost postConfigPadrao bordaGradient">

        <FeedbackMsg mensagem={mensagemAlerta}></FeedbackMsg>


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