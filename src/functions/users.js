import { postsInfoDb, userInfoDb } from '../dbTeste';
import {salvarData} from './extras';
import { v4 as uuidv4 } from 'uuid';
import { donoPerfil } from '../dbTeste';


const carregarUsuarioPorUsername = (username) => {
    const usuarioInfo = userInfoDb.find(user => user.username === username);

    if(usuarioInfo){
        return usuarioInfo
    }else{
        return "vazio"
    }
}

function carregarPostsPorUsername(nome){


    let posts = []

    if(nome){

        postsInfoDb.map((post)=>{
    
            if (post.username == nome) {
                posts.push(post)
            }    
        })

        return posts;


    }
    
    

}


function carregarPostPorId(id){

    let comentario = null;

    if(id){

        postsInfoDb.filter((post)=>{
    
            if (post.id == id) {
                comentario = post;
            }    
        })

        return comentario;


    }

}



const publicarPost = (tipo, ParenteId) =>{
   
    let postId = uuidv4();
    let data = salvarData()

    if(tipo == "post"){

        let txt = document.getElementById("criarTexto")

        // Impedir o usuário de postar se não tiver escrito nada
        if(txt.value.length > 2){

            
            console.log(postId)

            let postObj = {
                username: donoPerfil.username,
                texto: txt.value,
                data: data,
                likes: [],
                comentariosArray: [],
                id: postId
            }

   
            // Encaminhar o post pra db
            postsInfoDb.push(postObj);
            txt.value="";
    }

    } else if(tipo == "comentario"){
        let txt = document.getElementById("addSubComentario");

        let comentarioObj = {
            
            username: donoPerfil.username,
            data: data,
            texto: txt.value,
            likes: [],
            id: postId
        }

        txt.value = "";
        
        let parente = carregarPostPorId(ParenteId)
        console.log(parente.comentariosArray);
        parente.comentariosArray.push(comentarioObj)
        
    }


}

export {carregarUsuarioPorUsername, carregarPostsPorUsername, carregarPostPorId, publicarPost}