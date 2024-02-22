import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ primeiroAcesso, children }) {
 
  

  return primeiroAcesso ? children : null;
}
