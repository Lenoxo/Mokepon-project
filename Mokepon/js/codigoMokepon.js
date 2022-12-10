function iniciarJuego(){
    let botonSeleccionarMascota = document.getElementById("boton-mascota")
    botonSeleccionarMascota.addEventListener("click", elegirMascota)
}
function elegirMascota(){
    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let spanMascotaJugador = document.getElementById("mascota-jugador")
    switch (true){
        case inputHipodoge.checked:
            alert("¡Seleccionaste a Hipodoge!")
            spanMascotaJugador.innerHTML = "Hipodoge"
            break  
        case inputCapipepo.checked:
            alert("¡Seleccionaste a Capipepo!")
            spanMascotaJugador.innerHTML = "Capipepo"
            break  
        case inputRatigueya.checked:
            alert("¡Seleccionaste a Ratigueya!")
            spanMascotaJugador.innerHTML = "Ratigueya"
            break  
        default:
            alert("Selecciona a una mascota para continuar 😄")
            break
    }  
}

window.addEventListener("load", iniciarJuego)


