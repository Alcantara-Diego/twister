function resetTelaPrincipal(){
    
    const telaPosts = document.getElementById("telaPosts");
    const telaPerfilInfo = document.getElementById("telaPerfilInfo");

    telaPerfilInfo.style.display="none";
    telaPosts.style.display="block";
}

function toggleTelaPrincipal(trigger){
    console.log(trigger)

    let telaPosts = document.getElementById("telaPosts");
    let telaPerfilInfo = document.getElementById("telaPerfilInfo");


    

    switch (trigger) {
        case "perfil":
            if(getComputedStyle(telaPerfilInfo).display === "none"){
                telaPerfilInfo.style.display = "block";
                telaPosts.style.display = "none";
            } else {
                resetTelaPrincipal();
            }
           

            
            break;
    
        default:
            break;
    }

    
}

export { resetTelaPrincipal, toggleTelaPrincipal}