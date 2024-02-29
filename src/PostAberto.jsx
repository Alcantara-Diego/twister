import "./style/postAberto.scss"
import Post from "./Post";
import VoltarTela from "./VoltarTela";

import { donoPerfil } from "./dbTeste";

import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthGoogleContext } from "./contexts/AuthGoogle";
import { salvarData } from "./functions/extras";
import { uuidv4 } from "@firebase/util";
import { addPost } from "./pastaFirebase/addData";


function PostAberto(props){

    const { usuarioLogado, recarregarPostsDaDb, setRecarregarPostsDaDb } = useContext(AuthGoogleContext);

    const [comentarios, setComentarios] = useState(null)
    const [comentarioPai, setComentarioPai] = useState(null)
    const [renderPostAberto, setRenderPostAberto] = useState(false)
    const [atualizarComponente, setAtualizarComponente] = useState(false);
    // Puxar objeto toda vez que carregar o id
    useEffect(() =>{
        
        console.log(props.postAbertoInfo)
        
        if(props.postAbertoInfo !== null){
            setComentarios(props.postAbertoInfo.comentarios)
            setComentarioPai(props.postAbertoInfo)
            
        }

        

    }, [props.postAbertoInfo])


 
   async function prepararPost(paiId){
    if(!usuarioLogado){
        console.log("need login");
        return 
    }

    let txt = document.getElementById("addSubComentario");

    if(txt.value.length >= 5){
        let data = salvarData();
        let id = uuidv4()

        const comentarioObj = {
            displayName: usuarioLogado.displayName,
            username: usuarioLogado.username,
            texto: txt.value,
            data: data,
            likes: [],
            fotoURL: usuarioLogado.fotoURL,
            apagado: false,
            localId: id
        }

        let resultado = await addPost("comentario", comentarioObj, paiId);

        console.log(resultado);
         
        if(resultado=="sucesso"){
            txt.value="";
            // Limpar os posts salvos na session
            sessionStorage.clear();
            // Puxar os posts atualizados da db para exibir o novo comentário
            setRecarregarPostsDaDb(!recarregarPostsDaDb);
            setAtualizarComponente(!atualizarComponente);

        } else{
            console.log("Não foi possível adicionar o comentario")
        }
    }

    setRenderPostAberto(!renderPostAberto);


   }

   function atualizarPostAberto(param){

    console.log(param)
    setRenderPostAberto(!renderPostAberto);

   }

    return (

        <div id="telaPostAberto">

            <VoltarTela 
            alterarURL={props.alterarURL}
            funcao={"home"}
            setaId={"retornarHome"}></VoltarTela>

            {props.postAbertoInfo? (
                <Post
                    postsInfo={[props.postAbertoInfo]}
                    origem="postAberto"
                    abrirPerfil={props.abrirPerfil}
                    mostrarPerfilPeloUsername="permitir"
                    autorizarAbrirPost="negar"
                    setRenderPostAberto={setRenderPostAberto}
                    renderPostAberto={renderPostAberto}
                    alterarURL={props.alterarURL}
                />
                ) : 
                ( <div>O post selecionado não foi encontrado</div> )}

        

        

        

        <h4 className="postAbertoComentariosTItulo">{props.postAbertoInfo? props.postAbertoInfo.comentarios.length : "0"} Comentários</h4>

        {comentarioPai &&comentarios ? 
        <Post postsInfo={comentarios} 
        comentarioPai={comentarioPai}
        origem="postAberto"
        mostrarPerfilPeloUsername="permitir"
        listarComentarios="permitir"
        atualizarPostAberto={atualizarPostAberto}
        alterarURL={props.alterarURL}
        ></Post> : ""}
        






        <div className="inputContainer">

            <input type="text" placeholder="Comentar" name="addSubComentario" id="addSubComentario"/>

            <button className="bordaGradient" onClick={()=>{prepararPost(props.postAbertoInfo.localId)}}>Publicar</button>

        </div>

        

        </div>
    )
}

export default PostAberto