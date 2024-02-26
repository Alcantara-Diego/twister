import { useEffect, useState, createContext } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../pastaFirebase/firebasePrincipal';
import { buscarUsuarios, buscarUsuarioPorIdentificador, buscarEmailCadastrado, buscarPosts } from "../pastaFirebase/getData";
import { useNavigate } from "react-router-dom";
import { addEmail } from "../pastaFirebase/addData";


const provider = new GoogleAuthProvider();
export const AuthGoogleContext = createContext({});


export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(app);
    const navigate = useNavigate();

    const [userAuth, setUserAuth] = useState(null);
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [postsDisponiveis, setPostsDisponiveis] = useState(null);


    const [primeiroAcesso, setPrimeiroAcesso] = useState(false);
    const [updateAll, setUpdateAll] = useState(false);


    // Carregar os posts no feed
    useEffect(()=>{
      async function prepararPosts(){
        // Verificar se os posts já foram baixados nessa sessão
        const localPosts =JSON.parse(sessionStorage.getItem("Firebase:posts"));

        if(Array.isArray(localPosts) && usuarioLogado == null){
          // Se tem posts salvos nessa sessão, exibe eles para diminuir o número de leituras na firestore
          console.log("Posts encontrados localmente")
          console.log(localPosts)
          setPostsDisponiveis(localPosts);

        } else{
          // Se não tem posts salvos localmente, entra na firestore e busca os posts de lá
          console.log("Entrando na db para pegar os posts")

          const postsDb = await buscarPosts();

          if(Array.isArray(postsDb)){
            console.log(postsDb)
            sessionStorage.setItem("Firebase:posts", JSON.stringify(postsDb));
            setPostsDisponiveis(postsDb);
          } else {
            console.log("erro");
          }

        }
      }

      prepararPosts() ; 
    }, [userAuth])

  
    
    // Identificar o tipo de usuário logado(REMOVER PROD ITENS)
    useEffect(()=>{
      if (userAuth == null) {
        setPrimeiroAcesso(false)
        
      } else{
        const verificarUsuario = async () => {
          sessionStorage.removeItem("Firebase:posts");

          // Registrar o email na db caso seja o primeiro login do usuário
          let emailCadastrado = await buscarEmailCadastrado(userAuth.email);
          emailCadastrado == null ? await addEmail(userAuth.email, userAuth.displayName, userAuth) : null

        //  Buscar se o usuário já criou o username
          let usuarioEncontrado = await buscarUsuarioPorIdentificador("email", userAuth.email)
          console.log(usuarioEncontrado)

          if(usuarioEncontrado == null){
            // Se ainda não criou, direciona pra tela de cadastro para criar o @
            setPrimeiroAcesso(true)
            navigate("/cadastro");
          } else{ 

            // Provisório em fase de testes. deve ser apago durante produção
            // sessionStorage.setItem("@AuthFirebase:token", token);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(usuarioEncontrado));


            // cria contexto com as info do usuário e direciona ele para a home
            setUsuarioLogado(usuarioEncontrado);
            navigate("/");


             
          }

        }

        verificarUsuario();
      }
    }, [userAuth])

    // Provisório em fase de testes. deve ser apago durante produção(REMOVER PROD ITENS)
    useEffect(()=>{
        const loadStoreAuth = () => {
            // const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
            const sessionUser = sessionStorage.getItem("@AuthFirebase:user");

            if(sessionUser) {
                setUsuarioLogado(JSON.parse(sessionUser));
            }
        }

        loadStoreAuth()
    }, []);


   

    const signInGoogle = () =>{
      sessionStorage.clear();
        
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setUserAuth(user);
            // sessionStorage.setItem("@AuthFirebase:token", token);
            // sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));

            setUpdateAll(!updateAll)
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(error)
         
          });
    }

      
  

  return (
    <AuthGoogleContext.Provider value={{ signInGoogle, userAuth: userAuth, primeiroAcesso: primeiroAcesso, usuarioLogado: usuarioLogado, postsDisponiveis: postsDisponiveis }}>
        { children }
    </AuthGoogleContext.Provider>

  )

    
}