import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthGoogleContext } from "./contexts/AuthGoogle";



export function PrivateRoute({ primeiroAcesso, children }) {

  const { usuarioLogado } = useContext(AuthGoogleContext);

  console.log(usuarioLogado)


 
  

  return primeiroAcesso ||!usuarioLogado ? children : null;
}
