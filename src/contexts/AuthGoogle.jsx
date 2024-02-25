import { useEffect, useState, createContext } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../pastaFirebase/firebasePrincipal';
import { buscarUsuarios, buscarUsuarioPorIdentificador, buscarEmailCadastrado } from "../pastaFirebase/getData";
import { useNavigate } from "react-router-dom";
import { addEmail } from "../pastaFirebase/addData";


const provider = new GoogleAuthProvider();
export const AuthGoogleContext = createContext({});


export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(app);
    const navigate = useNavigate();

    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [userAuth, setUserAuth] = useState(null);
    const [updateAll, setUpdateAll] = useState(false);

    const [primeiroAcesso, setPrimeiroAcesso] = useState(false);

    useEffect(()=>{
      if (userAuth == null) {
        setPrimeiroAcesso(false)
        
      } else{
        const verificarUsuario = async () => {

          // Registrar o email na db caso seja o primeiro acesso
          let emailCadastrado = await buscarEmailCadastrado(userAuth.email);
          emailCadastrado == null ? await addEmail(userAuth.email, userAuth.displayName, userAuth) : null

         
          let usuarioEncontrado = await buscarUsuarioPorIdentificador("email", userAuth.email)
          console.log(usuarioEncontrado)

          if(usuarioEncontrado == null){

            setPrimeiroAcesso(true)
            navigate("/cadastro");
          } else{
            setUsuarioLogado(usuarioEncontrado);
            navigate("/");
          }

        }

        verificarUsuario();
      }
    }, [userAuth])

    // useEffect(()=>{
    //     const loadStoreAuth = () => {
    //         const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
    //         const sessionUser = sessionStorage.getItem("@AuthFirebase:user");

    //         if(sessionToken && sessionUser) {
    //             setUserAuth(JSON.parse(sessionUser));
    //         }
    //     }

    //     loadStoreAuth()
    // }, []);


   

    const signInGoogle = () =>{
        

        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setUserAuth(user);
            sessionStorage.setItem("@AuthFirebase:token", token);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));

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
            // ...
          });



    }

      
  

  return (
    <AuthGoogleContext.Provider value={{ signInGoogle, userAuth: userAuth, primeiroAcesso: primeiroAcesso, usuarioLogado: usuarioLogado }}>
        { children }
    </AuthGoogleContext.Provider>

  )

    
}