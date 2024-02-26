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
        throw new Error("Failed to update likes");

        
        
    }
}

export {updateUsuario, updateLikesDoPost};