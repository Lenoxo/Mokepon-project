function iniciarJuego(){
    let botonSeleccionarMascota = document.getElementById("boton-mascota")
    botonSeleccionarMascota.addEventListener("click", elegirMascota)
}
function elegirMascota(hipodoge, capipepo, ratigueya){
    hipodoge = document.getElementById("hipodoge").checked
    capipepo = document.getElementById("capipepo").checked
    ratigueya = document.getElementById("ratigueya").checked
    if(hipodoge == true){
        alert("Seleccionaste a Hipodoge")  
    } else if(capipepo == true){
        alert("Seleccionaste a Capipepo")  
    } else if(ratigueya == true){
        alert("Seleccionaste a Ratigueya")  
    } else {
        alert("Selecciona a una mascota para continuar")
    }
      
}

window.addEventListener("load", iniciarJuego)


