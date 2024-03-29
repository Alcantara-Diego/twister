import {db} from './firebasePrincipal'
import {collection, addDoc, query, where, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import {salvarData} from '../functions/extras';
import { AuthGoogleContext } from '../contexts/AuthGoogle';
import { useContext } from 'react';
import { GiConsoleController } from 'react-icons/gi';


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

        return "successo"
        
    } catch (error) {
        
        console.log(error)
        return "erro"
        
    }
}





async function addUsuario(usuario){
    try {


        const colecao = collection(db, "usuarios");

        

        const adicionandoUsuario = await addDoc(colecao, usuario);
        console.log(adicionandoUsuario);

        return "sucesso"
        
    } catch (error) {
        
        console.log(error)
        return "erro"
        
    }
}





async function addPost(tipo, objeto, ParenteId){

    if(tipo == "post"){
        try {
            const colecao = collection(db, "posts");

            const adicionandoPost = await addDoc(colecao, objeto);

            console.log(objeto);
            return "sucesso"
            
            
        } catch (error) {
            console.log(error)
            return "erro"
            
        }


        

       

    } else if(tipo == "comentario"){
        try {
            const colecao = collection(db, "posts");

            const q = query(colecao, where("localId", "==", ParenteId));
    
            const resultado = await getDocs(q);
    
            if (!resultado.empty) {
                const postDoc = resultado.docs[0];
                const postRef = postDoc.ref;

                await updateDoc(postRef, {
                    comentarios: arrayUnion(objeto)
                });

                console.log("Comentário adicionado no post de id: ", ParenteId);
                return "sucesso"
                
            } else{
                throw new Error("O post não foi encontrado para adicionar o comentario");
            }
            
        } catch (error) {
            console.log(error)
            return "erro"
            
        }       
    }

}

async function addNotificacao(username, novaNotificacao){
    const colecao = collection(db, "usuarios");

    const q = query(colecao, where("username", "==", username))

    const resultado = await getDocs(q);

    if (!resultado.empty) {
        const usuarioDoc = resultado.docs[0];
        const usuarioRef = usuarioDoc.ref;
        const notificacoes = usuarioDoc.data().notificacoes
        notificacoes.push(novaNotificacao);

        await updateDoc(usuarioRef, {
            notificacoes: notificacoes
        });

        return "sucesso"
        
    } else {
        return "erro"
    }
}


async function addComunicado(comunicado){

    try {
        const colecao = collection(db, "comunicados");

        const adicionandoComunicado = await addDoc(colecao, comunicado);
    
        return "sucesso"
        
    } catch (error) {
        console.log(error);
        return "erro"
        
    }
   
}


export {addEmail,addUsuario, addPost, addNotificacao, addComunicado}