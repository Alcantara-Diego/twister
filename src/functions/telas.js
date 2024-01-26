function resetTelaPrincipal(){
    
    const telaFeed = document.getElementById("telaFeed");
    const telaPerfilInfo = document.getElementById("telaPerfilInfo");

    telaPerfilInfo.style.display="none";
    telaFeed.style.display="block";
}

function toggleTelaPrincipal(trigger){
    console.log(trigger)

    let telaFeed = document.getElementById("telaFeed");
    let telaPerfilInfo = document.getElementById("telaPerfilInfo");


    

    switch (trigger) {
        case "perfil":
            if(getComputedStyle(telaPerfilInfo).display === "none"){
                telaPerfilInfo.style.display = "block";
                telaFeed.style.display = "none";
            } else {
                resetTelaPrincipal();
            }
           

            
            break;
    
        default:
            break;
    }

    
}

export { resetTelaPrincipal, toggleTelaPrincipal}