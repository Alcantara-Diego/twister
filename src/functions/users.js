import { toggleTelaPrincipal } from './telas';
import { postsInfo } from '../dbTeste';

function mostrarPerfil(userObj){

    console.log(userObj);
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


function carregarUserPosts(nome){


    let posts = []

    if(nome){

        postsInfo.map((post)=>{
    
            if (post.username == nome) {
                posts.push(post)
            }    
        })

        return posts;


    }
    
    

}

export {mostrarPerfil, carregarUserPosts}