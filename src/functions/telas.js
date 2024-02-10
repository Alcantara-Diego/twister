function resetTelaPrincipal(){
    
    const telaPosts = document.getElementById("telaPosts");
    const telaPerfilInfo = document.getElementById("telaPerfilInfo");
    let telaPostAberto = document.getElementById("telaPostAberto")


    telaPerfilInfo.style.display="none";
    telaPosts.style.display="block";
    telaPostAberto.style.display = "none";
}

function toggleTelaPrincipal(trigger){

    let telaPosts = document.getElementById("telaPosts");
    let telaPerfilInfo = document.getElementById("telaPerfilInfo");
    let telaPostAberto = document.getElementById("telaPostAberto")


    switch (trigger) {
        case "perfil":
            if(getComputedStyle(telaPerfilInfo).display === "none"){
                telaPerfilInfo.style.display = "block";
                telaPosts.style.display = "none";
                telaPostAberto.style.display = "none";
            } else {
                resetTelaPrincipal();
            }
           

            
            break;

        case "postAberto":
                telaPerfilInfo.style.display = "none";
                telaPosts.style.display = "none";
                telaPostAberto.style.display = "block";

            break
    
        default:
            break;
    }

    
}

export { resetTelaPrincipal, toggleTelaPrincipal}