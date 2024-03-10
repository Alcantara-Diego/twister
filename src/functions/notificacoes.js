import { addComunicado, addNotificacao } from "../pastaFirebase/addData";
import { salvarData } from "./extras"



// Verificar se é necessário notificar o usuário do novo seguidor, e evitar notificação repetida
function avaliarNotificacaoSeguidores(usuarioNotificado, usuarioLogado){
    console.log('avaliando notificacao...')

    // Verificar se o usuário está na lista de usuários já notificados
    const notificados = JSON.parse(localStorage.getItem("notificadosPeloSeguindoBtn"));

    // Criar a lista caso não exista ainda
    if(notificados == null) {

        const novaArray = [];

        localStorage.setItem("notificadosPeloSeguindoBtn", JSON.stringify(novaArray));

        notificarUsuarioDoSeguidor(usuarioNotificado, usuarioLogado, novaArray);
        return
    }


    // Notificar usuário apenas caso ele ainda não esteja na lista
    if (notificados.includes(usuarioNotificado)) {
        console.log("Usuario já foi notificado previamente ")
        
    } else {
        notificarUsuarioDoSeguidor(usuarioNotificado, usuarioLogado, notificados);
        
    }
}


async function notificarUsuarioDoSeguidor(usernameNotificado, usuarioLogado, notificadosLista){

    const data = salvarData();

    const novaNotificacao= {
        tipo: "notificacao",
        origem: "novoSeguidor",
        titulo: `${usuarioLogado.displayName} começou a seguir você.`,
        foto: usuarioLogado.fotoURL,
        conteudo: null,
        data: data,
        link: `/usuario/${usuarioLogado.username}`
    }

  
    const resultado = await addNotificacao(usernameNotificado, novaNotificacao);


    if(resultado == "sucesso"){

        notificadosLista.push(usernameNotificado);

        // Salvar o nome do usuario para ele não receber a mesma notificação no futuro
        localStorage.setItem("notificadosPeloSeguindoBtn", JSON.stringify(notificadosLista));

        console.log("Usuario foi notificado do novo seguidor");
    } else{

        console.log("Erro ao notificar usuário");
    }
}






// Encontrar dono do post e notifica-lo do comentario adicionado    
async function notificarPostDono(postId, comentarioObj, postsDisponiveis, usuarioLogado){

    const novaNotificacao= {
        tipo: "notificacao",
        origem: "comentario",
        titulo: `${comentarioObj.username} comentou em seu post`,
        foto: comentarioObj.fotoURL,
        conteudo: comentarioObj.texto,
        data: comentarioObj.data,
        link: `/post/${postId}`


    }


    // username será preenchido e usado para enviar notificação caso necessário
    let username = null;
    // Encontrar dono do post
    postsDisponiveis.forEach(post => {

        if (post.localId == postId) {
            // Notificar apenas caso o comentário seja feito por outro usuário
            post.username !== usuarioLogado.username? username = post.username : console.log("comentario do dono do post");
            return   
        }
    });

    // Se o usuarío não comentou no próprio post, enviar notificação
    if (username) {
        const notificarUsuario = await addNotificacao(username, novaNotificacao);

        notificarUsuario=="sucesso"? console.log("Notificação enviada ao dono do post") : console.log("erro ao enviar notificação do novo comentário");
    }

}


async function gerarComunicado(tipo, info){
    if (tipo == "novoUsuario") {
        console.log(info)
    
        const novoComunicado = {
            tipo: tipo,
            titulo: `${info.displayName} criou uma conta no Twister`,
            foto: info.fotoURL,
            data: info.cadastro,
            link: `/usuario/${info.username}`
        }

        console.log(novoComunicado)

        const adicionar = await addComunicado(novoComunicado);

        adicionar == "sucesso"? console.log("comunicado de novo usuário criado com sucesso") : console.log("Erro ao comunicar novo usuário");
        
    } else {
        console.log("tipo de comunicado não encontrado")
        
    }

}





export {avaliarNotificacaoSeguidores, notificarPostDono, gerarComunicado}