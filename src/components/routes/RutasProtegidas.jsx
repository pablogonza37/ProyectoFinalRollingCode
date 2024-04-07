import { Navigate } from "react-router-dom";

const RutasProtegidas = ({children}) => {
    const administrador = JSON.parse(sessionStorage.getItem('usuarioRollingBistro')) || null;
   if(!administrador){
return <Navigate to={'/login'}></Navigate>
   }else{
    return children;
   }
};

export default RutasProtegidas;