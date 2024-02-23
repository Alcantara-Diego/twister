import {db} from './firebasePrincipal'
import {collection, addDoc, query, where } from "firebase/firestore";
import salvarData from '../functions/extras';


async function addEmail(email, nome, allInfo){
    try {

        let data = salvarData()

        const colecao = collection(db, "emailsCadastrados");

        let info = {
            email: email,
            displayName: nome,
            data: data
            
        }

        const adicionandoEmail = await addDoc(colecao, info);
        console.log(adicionandoEmail);

        return "success"
        
    } catch (error) {
        
        console.log(error)
        return "error"
        
    }
}





async function addUsuario(usuario){
    try {


        const colecao = collection(db, "usuarios");

        

        const adicionandoUsuario = await addDoc(colecao, usuario);
        console.log(adicionandoUsuario);

        return "success"
        
    } catch (error) {
        
        console.log(error)
        return "error"
        
    }
}


export {addEmail,addUsuario}