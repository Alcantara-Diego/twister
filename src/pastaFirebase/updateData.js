import {db} from './firebasePrincipal'
import {collection, getDocs, query, updateDoc, where } from "firebase/firestore";

async function updateUsuario(username, info, valor){
    try {

        const colecao = collection(db, "usuarios");

        const encontrarUser = query(colecao, where("username", "==", username));

        const usuarioEncontrado = await getDocs(encontrarUser);

        if(!usuarioEncontrado.empty){

            const usuarioRef = usuarioEncontrado.docs[0].ref;

            await updateDoc(usuarioRef, {
                [info]: valor
            });

            console.log("usuário atualizado")

            return "Sucess"

        }

        console.log("não encontrado")
        return "error"




       
        
    } catch (error) {
        console.log(error);
        return "error"
        
        
    }
}

async function updateLikesDoPost(id, username){
    try {

        console.log("----------------UPDATE FEITO NA DB")
        const colecao = collection(db, "posts");

        const q = query(colecao, where("localId", "==", id));

        const postEncontrado = await getDocs(q);

        if(!postEncontrado.empty){
            // Referência do post para altera-lo
            const postRef = postEncontrado.docs[0].ref;
            // Pegar a lista de likes atualizada
            const likesAtualizados = postEncontrado.docs[0].data().likes;


            const usernameIndex = likesAtualizados.indexOf(username);

            // Adiciona o like do usuário se ele não está presente, e remove se já está
            if(usernameIndex !== -1){
                likesAtualizados.splice(usernameIndex, 1);
            } else {
                likesAtualizados.push(username);
            }




            await updateDoc(postRef, {
                likes: likesAtualizados
            })

            return "sucesso"

        } else{

            throw new Error("Não foi encontrado o documento com o ID passado")
        }
        
    } catch (error) {
        console.log(error)
        
    }
}



async function updateLikesDoComentario(id, parenteId, username){
    try {

        console.log("----------------UPDATE FEITO NA DB")
        const colecao = collection(db, "posts");

        const q = query(colecao, where("localId", "==", parenteId));

        const postEncontrado = await getDocs(q);

        if(!postEncontrado.empty){
            // Referência do post para altera-lo
            const postRef = postEncontrado.docs[0].ref;
            // Pegar os comentarios do post
            const comentariosLista = postEncontrado.docs[0].data().comentarios;


            // Encontrar o index do comentario dentro do post principal
            const index = comentariosLista.findIndex(post => post.localId === id);

           
            // Remover o like do usuário caso já tenha dado
            if (comentariosLista[index].likes.includes(username)) {

                comentariosLista[index].likes = comentariosLista[index].likes.filter(usuario => usuario !== username);
                
                // Adicionar o like se não está presente na lista
            } else{
                comentariosLista[index].likes.push(username);
            }


            await updateDoc(postRef, {comentarios: comentariosLista})

            return "sucesso"

        } else{

            throw new Error("Não foi encontrado o documento com o ID passado")
        }
        
    } catch (error) {
        console.log(error)
        
    }
}

async function updateSeguidores(usernameDono, segundoUsername){

    try {
        console.log("----------------LEITURA FEITA NA DB");
        const colecao = collection(db, "usuarios");

        const q1 = query(colecao, where("username", "==", usernameDono));
        const q2 = query(colecao, where("username", "==", segundoUsername));

        const [usuarioDono, usuarioSegundo] = await 
        Promise.all([getDocs(q1), getDocs(q2)]); 
        
        
        let usuarioDonoRef = null;
        let novoSeguindo = null;
        let adicionarUsuarioNaLista = null;
        if (usuarioDono.docs.length > 0) {
            const resposta1 = usuarioDono.docs[0];
            usuarioDonoRef= usuarioDono.docs[0].ref;
            const seguindo = resposta1.data().seguindo;


            if (seguindo.includes(segundoUsername)) {
                novoSeguindo = seguindo.filter(username => username !== segundoUsername);
                adicionarUsuarioNaLista=false;

            } else {
                novoSeguindo = [...seguindo, segundoUsername];
                adicionarUsuarioNaLista=true

            }

        }


        let usuarioSegundoRef = null
        let novoSeguidores = null
        // Prosseguir com a atualizacao dos seguidores e registro na DB apenas se a lista que o usuario esta seguindo ja foi atualizada tambem.
        if (usuarioSegundo.docs.length > 0 && novoSeguindo) {
            const resposta2 = usuarioSegundo.docs[0];
            usuarioSegundoRef = usuarioSegundo.docs[0].ref;
            const seguidores = resposta2.data().seguidores;

            if (adicionarUsuarioNaLista) {
                seguidores.includes(usernameDono)? novoSeguidores= seguidores : novoSeguidores = [...seguidores, usernameDono];

            } else {
                novoSeguidores = seguidores.filter(username => username !== usernameDono);
            }    
        }

        // Registrar na DB os valores se teve ref de ambos
        if (usuarioDonoRef && usuarioSegundoRef) {
            console.log("----------------UPDATE FEITO NA DB");
            await updateDoc(usuarioDonoRef, {
                seguindo: novoSeguindo
            });
            console.log(novoSeguindo)


            console.log("----------------UPDATE FEITO NA DB");
            await updateDoc(usuarioSegundoRef, {
                seguidores: novoSeguidores
            });
            console.log(novoSeguidores);

            return "sucesso"

            
        } else {
            return "erro"
            
        }

       
    } catch (error) {
        console.error("Error updating followers:", error);

        
    }
    

}

export {updateUsuario, updateLikesDoPost, updateLikesDoComentario, updateSeguidores};