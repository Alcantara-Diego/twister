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
    


    carregarUserPosts(userArray.idPostsCriados);
    toggleTelaPrincipal("perfil")

}


function carregarUserPosts(idArray){

    idArray.forEach(id => {

        postsInfo.map((post)=>{

            if (post.id === id) {
                console.log(post)
            }    

        })
    });
    

}

export {mostrarPerfil}