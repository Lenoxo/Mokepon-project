let ataqueJugador
function iniciarJuego(){
    let botonSeleccionarMascota = document.getElementById("boton-mascota")
    botonSeleccionarMascota.addEventListener("click", elegirMascotaJugador)
    let botonFuego = document.getElementById("boton-ataque-fuego")
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("boton-ataque-agua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra = document.getElementById("boton-ataque-tierra")
    botonTierra.addEventListener("click", ataqueTierra)
}
//la propiedad innerHTML permite modificar el DOM con strings que se ponen dentro de una etiqueta escogida anteriormente
function elegirMascotaJugador(){
    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let spanMascotaJugador = document.getElementById("mascota-jugador")
    //Esta condicional interactua con la elección del jugador
    switch (true){
        case inputHipodoge.checked:
            spanMascotaJugador.innerHTML = "Hipodoge"
            break  
        case inputCapipepo.checked:
            spanMascotaJugador.innerHTML = "Capipepo"
            break  
        case inputRatigueya.checked:
            spanMascotaJugador.innerHTML = "Ratigueya"
            break  
        default:
            alert("Selecciona a una mascota para continuar 😄")
            break
    }  elegirMascotaEnemigo()
}
//Función para elegir mascota enemiga de forma aleatoria
function elegirMascotaEnemigo(){
    //Función para obtener números aleatorios
    function aleatorio(min, max){
        return Math.floor((Math.random())*(max-min+1)+min)
    }
    let ataqueAleatorio = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo")
    if (ataqueAleatorio == 1){
        spanMascotaEnemigo.innerHTML = "Hipodoge"
    } else if(ataqueAleatorio == 2){
        spanMascotaEnemigo.innerHTML = "Capipepo"
    } else{
        spanMascotaEnemigo.innerHTML = "Ratigueya"
    }
}
//
function ataqueFuego(){
    ataqueJugador = "FUEGO"
    alert(ataqueJugador)
}
function ataqueAgua(){
    ataqueJugador = "AGUA"
    alert(ataqueJugador)
}
function ataqueTierra(){
    ataqueJugador = "TIERRA"
    alert(ataqueJugador)
}

//load es el evento en el que la página HTML termina de cargar
window.addEventListener("load", iniciarJuego)


