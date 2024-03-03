import "./style/postAberto.scss"
import Post from "./Post";
import VoltarTela from "./VoltarTela";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthGoogleContext } from "./contexts/AuthGoogle";
import { salvarData } from "./functions/extras";
import { uuidv4 } from "@firebase/util";
import { addPost } from "./pastaFirebase/addData";
import { useNavigate } from "react-router-dom";


function PostAberto(props){

    const { usuarioLogado, recarregarPostsDaDb, setRecarregarPostsDaDb } = useContext(AuthGoogleContext);
    const navigate = useNavigate()

    const [comentarios, setComentarios] = useState(null)
    const [comentarioPai, setComentarioPai] = useState(null)
    const [renderPostAberto, setRenderPostAberto] = useState(false)
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
        navigate("/login")
        return 
    }

    let txt = document.getElementById("addSubComentario");

    if (txt.value.length < 5 || txt.value.length > 100){
        console.log("pouca ou muita");

    } else {
         // Limpar os posts salvos na session
         sessionStorage.clear();

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
           
            // Puxar os posts atualizados da db para exibir o novo comentário
            setRecarregarPostsDaDb(!recarregarPostsDaDb);
           
            

        } else{
            console.log("Não foi possível adicionar o comentario pelo numero de caractere")
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

        

        

        

        <h4 className="postAbertoComentariosTItulo">{props.postAbertoInfo? props.postAbertoInfo.comentarios?.length : "0"} Comentários</h4>

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