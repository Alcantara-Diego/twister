import {db} from './firebasePrincipal'
import {collection, getDocs, query, where } from "firebase/firestore";



async function buscarEmailCadastrado(email){

    try{
        const busca = query(collection(db, "emailsCadastrados"), where("email", "==", email));

        const resultado = await getDocs(busca);

        if (resultado.docs.length > 0) {

            return resultado.docs[0].data();
        } else {

            return null;
        }


    } catch(error){

        console.log(error)
    }
}

async function buscarUsuarios(){
    try {
        const usuariosDb = await getDocs(collection(db, "usuarios"));
    usuariosDb.forEach((doc) => {
        console.table(doc.data());
        })
        
    } catch (error) {
        console.log(error)
        
    }
}


async function buscarUsuarioPorIdentificador(tipo, valor){
    try {

        const busca = query(collection(db, "usuarios"), where(tipo, "==", valor));

        const resultado = await getDocs(busca);


        console.log("Mi")
        if (resultado.docs.length > 0) {

            return resultado.docs[0].data();
        } else {

            return null;
        }

    } catch (error) {
        console.error(`Erro ao buscar usuário por ${tipo} com identificador ${valor}`, error);
    }
}



async function buscarPosts(){
    try {
        const usuariosDb = await getDocs(collection(db, "posts"));
    usuariosDb.forEach((doc) => {
      
        console.table(doc.data());
      
        })
        
    } catch (error) {
        console.log(error)
        
    }
}




export {buscarEmailCadastrado, buscarPosts, buscarUsuarios, buscarUsuarioPorIdentificador}
