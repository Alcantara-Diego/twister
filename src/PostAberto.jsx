import "./style/postAberto.scss"
import Post from "./Post";
import { publicarPost } from './functions/users'
import VoltarTela from "./VoltarTela";

import { donoPerfil } from "./dbTeste";

import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";


function PostAberto(props){

    const [comentarios, setComentarios] = useState(null)
    const [comentarioPai, setComentarioPai] = useState(null)
    const [renderPostAberto, setRenderPostAberto] = useState(false)
    // Puxar objeto toda vez que carregar o id
    useEffect(() =>{
        
        console.log(props.postAbertoInfo)

        if(props.postAbertoInfo){
            setComentarios(props.postAbertoInfo.comentariosArray)
            setComentarioPai(props.postAbertoInfo)
            
        }

        

    }, [props.postAbertoInfo])


    // useEffect(()=>{
    //     console.log(comentarios)
    // }, [comentarios])

   function prepararPost(id){
    publicarPost("comentario", id);
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

            {props.postAbertoInfo !== undefined && comentarioPai!== null? (
                <Post
                    postsInfo={[comentarioPai]}
                    origem="postAberto"
                    mostrarPerfilPeloUsername="permitir"
                    autorizarAbrirPost="negar"
                    setRenderPostAberto={setRenderPostAberto}
                    renderPostAberto={renderPostAberto}
                    alterarURL={props.alterarURL}
                />
                ) : 
                ( <div>O post selecionado não foi encontrado</div> )}

        

        

        

        <h4 className="postAbertoComentariosTItulo">{props.postAbertoInfo? props.postAbertoInfo.comentariosArray.length : "0"} Comentários</h4>

        {comentarios? 
        <Post postsInfo={comentarios} 
        comentarioPai={comentarioPai}
        mostrarPerfilPeloUsername="permitir"
        origem="postAberto"
        atualizarPostAberto={atualizarPostAberto}
        alterarURL={props.alterarURL}
        abrirPerfil={true}></Post> : ""}
        






        <div className="inputContainer">

            <input type="text" placeholder="Comentar" name="addSubComentario" id="addSubComentario"/>

            <button className="bordaGradient" onClick={()=>{prepararPost(props.postAbertoInfo.id)}}>Publicar</button>

        </div>

        

        </div>
    )
}

export default PostAberto