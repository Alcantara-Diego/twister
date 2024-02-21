import { useContext } from "react";
import { Navigate } from "react-router-dom"
import { AuthGoogleContext } from "./contexts/AuthGoogle";
AuthGoogleContext
export function PrivateRoute({children}){

    const { logado, userAuth } = useContext(AuthGoogleContext);

    console.log(userAuth)

    

    return userAuth? children : <Navigate to="/"/>


      

}