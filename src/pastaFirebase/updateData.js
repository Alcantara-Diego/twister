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

export {updateUsuario};