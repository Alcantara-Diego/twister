import { toggleTelaPrincipal } from './telas';
import { postsInfo } from '../dbTeste';

function mostrarPerfil(userArray){

    console.log(userArray);
    let nome = document.getElementById("usernamePerfilDisplay");
    let recado = document.getElementById("recadoPerfilDisplay");
    let seguindo = document.getElementById("seguindoPerfilDisplay");
    let seguidores = document.getElementById("seguidoresPerfilDisplay");
    let cadastro = document.getElementById("cadastroPerfilDisplay");

    nome.innerText=userArray.username
    recado.innerText=userArray.recado
    seguindo.innerText=userArray.seguindo
    seguidores.innerText=userArray.seguidores
    cadastro.innerText=userArray.cadastro
    
    toggleTelaPrincipal("perfil")

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