import {db} from './firebasePrincipal'
import {collection, addDoc, query, where } from "firebase/firestore";
import salvarData from '../functions/extras';
import { AuthGoogleContext } from '../contexts/AuthGoogle';
import { useContext } from 'react';


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





async function addPost(tipo, objeto, ParenteId){

    if(tipo == "post"){
       

        try {

            const colecao = collection(db, "posts");

            const adicionandoPost = await addDoc(colecao, objeto);

            console.log(objeto);
            return "success"
            
            
        } catch (error) {
            console.log(error)

            return "error"
            
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



export {addEmail,addUsuario, addPost}