import { postsInfoDb } from "../dbTeste";
// variaveis para todas as funções do arquivo acessarem. 
// O nome grande é para evitar conflito com o resto do react app
var idAtualSalvoNoTelasJs = null;
var IdDoPaiSalvo = null

let atualizarComponente;
function solicitarPostAbertoRender(func){
    // O param trás uma função que executa o useState do componente e o atualiza
    atualizarComponente = func
}

function exibirAlerta(postId, paiId, func){

    idAtualSalvoNoTelasJs = postId
    if(paiId !== null){IdDoPaiSalvo = paiId}

    // Se o dono tentar deletar o post é exibido uma tela de confirmação logo após
    document.getElementById("AlertaSombra").style.display="flex";

    // ligar opção de deletar o post no deleteBtn da tela de aviso
    document.getElementById("confirmarDeleteBtn").addEventListener("click", confirmarDelete);

}

function fecharAlerta(){
    // Desativar a função de deletar do deleteBtn para evitar problemas
    document.getElementById("confirmarDeleteBtn").removeEventListener("click", confirmarDelete);

    // Fechar tela de alerta
    document.getElementById("AlertaSombra").style.display="none";
}


function confirmarDelete(){

    let tipo;

    // Se o post que recebeu comando de apagar não for subcomentario de outro post...
    if(IdDoPaiSalvo === null){

        // Acha o post na DB e apaga normalmente
        postsInfoDb.forEach((post, index)=>{
    
            if (post.id === idAtualSalvoNoTelasJs) {
                console.log(postsInfoDb[index])
                postsInfoDb.splice(index, 1);

                tipo = ["post", post.username];
            
            }
        })

        

    }else { //Se o post for subcomentario de outro post...

        // Primeiro acha na DB o index do pai pelo ID do pai
        postsInfoDb.forEach((post, index)=>{
    
            if (post.id === IdDoPaiSalvo) {
                
                // Agora que achou o pai, localiza o comentario desejado por ID dentro da array de subcomentarios do post pai
                postsInfoDb[index].comentariosArray.forEach((comentario, comentarioIndex)=>{
                    if(comentario.id === idAtualSalvoNoTelasJs){
                        console.log(postsInfoDb[index].comentariosArray[comentarioIndex])
                        postsInfoDb[index].comentariosArray.splice(comentarioIndex, 1);

                        tipo = ["comentario", comentario.username];
                        
                    }
                })
            }
        })


    }

  
    document.getElementById("AlertaSombra").style.display="none";

    idAtualSalvoNoTelasJs = null;
    IdDoPaiSalvo = null;
    atualizarComponente(tipo)

}






export { exibirAlerta, fecharAlerta, solicitarPostAbertoRender }