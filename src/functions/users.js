import { toggleTelaPrincipal } from './telas';
import { postsInfoDb, userInfoDb } from '../dbTeste';
import salvarData from './extras';
import { v4 as uuidv4 } from 'uuid';
import { donoPerfil } from '../dbTeste';
function mostrarPerfil(userObj){

    console.log(userObj)
    let nome = document.getElementById("usernamePerfilDisplay");
    let recado = document.getElementById("recadoPerfilDisplay");
    let seguindo = document.getElementById("seguindoPerfilDisplay");
    let seguidores = document.getElementById("seguidoresPerfilDisplay");
    let cadastro = document.getElementById("cadastroPerfilDisplay");

    nome.innerText=userObj.username
    recado.innerText=userObj.recado
    seguindo.innerText=userObj.seguindo
    seguidores.innerText=userObj.seguidores
    cadastro.innerText=userObj.cadastro
    
    let posts = carregarUserPosts(userObj.username)
    toggleTelaPrincipal("perfil")

    return posts

}

const carregarUsuario = (username) => {
    const usuarioInfo = userInfoDb.find(user => user.username === username);

    console.log(usuarioInfo)
    return usuarioInfo
}

function carregarUserPosts(nome){


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
    console.log('punlicandooooo')
    let postId = uuidv4();
    let data = salvarData()

    if(tipo == "post"){

        let txt = document.getElementById("criarTexto")

        // Impedir o usuário de postar se não tiver escrito nada
        if(txt.value.length > 1){

            
            console.log(postId)

            let postObj = {
                username: donoPerfil.username,
                texto: txt.value,
                data: data,
                reposts: 0,
                likes: [],
                repostado: false,
                comentariosArray: [],
                id: postId
            }

            // Adicionar o id no banco de dados do usuário para ser possível apagar o post futuramente
            donoPerfil.idPostsCriados.push(postId);
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

export {mostrarPerfil, carregarUsuario, carregarUserPosts, carregarPostPorId, publicarPost}