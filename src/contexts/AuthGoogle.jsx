import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import { useState, createContext } from "react";
import { app } from '../pastaFirebase/firebaseConfig';
const provider = new GoogleAuthProvider()


export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(app);

    const [userAuth, setUserAuth] = useState(null);
    const [updateAll, setUpdateAll] = useState(false);

    useEffect(()=>{
        const loadStoreAuth = () => {
            const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
            const sessionUser = sessionStorage.getItem("@AuthFirebase:user");

            if(sessionToken && sessionUser) {
                setUserAuth(JSON.parse(sessionUser));
            }
        }

        loadStoreAuth()
    }, []);


    const signInGoogle = () =>{
        

        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
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
    <AuthGoogleContext.Provider value={{ signInGoogle, logado: !!userAuth, userAuth }}>
        { children }
    </AuthGoogleContext.Provider>

  )

    
}