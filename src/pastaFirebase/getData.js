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


async function buscarUsuarioPorIdentificador(tipo, valor, permitirNulo){
    try {

        console.log("----------------LEITURA FEITA NA DB")
        const busca = query(collection(db, "usuarios"), where(tipo, "==", valor));

        const resultado = await getDocs(busca);


        if (resultado.docs.length > 0) {

            return resultado.docs[0].data();

        }
            
        else {
            console.log("Não foi encontrado o documento com o tipo e valor passado")
            return null
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

async function buscarTodos(tipo){
    try {
        console.log("----------------LEITURA FEITA NA DB");
        const colecao = collection(db, tipo);
    
        const resultado = await getDocs(colecao);
        const usuariosLista = resultado.docs.map(leitura => leitura.data());
    
        console.log(usuariosLista);
    
        return usuariosLista;


        
    } catch (error) {
        console.log(error)
        return null
        
    }
}


async function buscarPostPorId(id){
    try {

        console.log("----------------LEITURA FEITA NA DB");
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

async function buscarPostsPorIdentificador(tipo, valor){
    try {

        console.log("----------------LEITURA FEITA NA DB");
        const colecao = collection(db, "posts");

        const q = query(colecao, where(tipo, "==", valor));

        const resultado = await getDocs(q);

        let posts = [];

        if(!resultado.empty){
            
            resultado.forEach(valor =>{
                const post = valor.data();
                posts.push(post);
            })

            console.log(posts);

            return posts
            
        } else {
            console.log("Requisição de posts não retornou nenhum valor");
            return null
        }
        
    } catch (error) {
        console.log(error);
        return "erro"
        
    }
    

}

export {
    buscarEmailCadastrado, 
    buscarPosts, 
    buscarTodos,
    buscarUsuarios, 
    buscarUsuarioPorIdentificador, 
    buscarPostPorId, 
    buscarPostsPorIdentificador}
