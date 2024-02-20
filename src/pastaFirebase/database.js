import {db} from './firebasePrincipal'
import {collection, getDocs, query, where } from "firebase/firestore";




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

// terminar de puxar usuario
async function buscarUsuarioPorUsername(username){
    try {

        const busca = query(collection(db, "usuarios"), where("username", "==", username));

        const resultado = await getDocs(busca);


        console.log("Mi")
        if (resultado.docs.length > 0) {

            return resultado.docs[0].data();
        } else {

            return null;
        }

    } catch (error) {
        console.error("Erro ao buscar usuário por username:", error);
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


// console.log(db)

export {buscarPosts, buscarUsuarios, buscarUsuarioPorUsername}
