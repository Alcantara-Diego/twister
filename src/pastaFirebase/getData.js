import {db} from './firebasePrincipal'
import {collection, getDocs, query, where } from "firebase/firestore";



async function buscarEmailCadastrado(email){

    try{
        console.log("----------------LEITURA FEITA NA DB")
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
        console.log("----------------LEITURA FEITA NA DB")
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

        console.log("----------------LEITURA FEITA NA DB")
        const busca = query(collection(db, "usuarios"), where(tipo, "==", valor));

        const resultado = await getDocs(busca);


        if (resultado.docs.length > 0) {

            return resultado.docs[0].data();
        } else {

            throw new Error("Não foi encontrado o documento com o tipo e valor passado")
        }

    } catch (error) {
        console.error(`Erro ao buscar usuário por ${tipo} com identificador ${valor}`, error);
    }
}



async function buscarPosts(){
    try {
        console.log("----------------LEITURA FEITA NA DB")
        const colecao = collection(db, "posts");

        const filtrandoPosts = query(colecao, where("apagado", "==", false));

        const resultado = await getDocs(filtrandoPosts);

        let postsDisponiveis = [];

        resultado.forEach(postInfo => {

            const post = postInfo.data()
            postsDisponiveis.push(post);

            
        });


        return postsDisponiveis
        
    } catch (error) {
        console.log(error)
        return null
        
    }
}


async function buscarPostPorId(id){
    try {

        console.log("----------------LEITURA FEITA NA DB")
        const colecao = collection(db, "posts");

        const q = query(colecao, where("localId", "==", id));

        const resultado = await getDocs(q);

        if (resultado.docs.length > 0) {

            return resultado.docs[0].data();
        } else {

            throw new Error("Não foi encontrado o documento com o ID passado");

        }
        
    } catch (error) {
        console.log(error);
        return "erro"
        
    }

}


export {buscarEmailCadastrado, buscarPosts, buscarUsuarios, buscarUsuarioPorIdentificador, buscarPostPorId}
