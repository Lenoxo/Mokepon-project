let ataqueJugador
let ataqueEnemigo
let resultadoRonda
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
//Función para obtener números aleatorios
function aleatorio(min, max){
    return Math.floor((Math.random())*(max-min+1)+min)
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
    let mascotaAleatoria = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo")
    if (mascotaAleatoria == 1){
        spanMascotaEnemigo.innerHTML = "Hipodoge"
    } else if(mascotaAleatoria == 2){
        spanMascotaEnemigo.innerHTML = "Capipepo"
    } else{
        spanMascotaEnemigo.innerHTML = "Ratigueya"
    }
}
//Funciones para el ataque del jugador
function ataqueFuego(){
    ataqueJugador = "FUEGO"
    ataqueEnemigoAleatorio()
}
function ataqueAgua(){
    ataqueJugador = "AGUA"
    ataqueEnemigoAleatorio()
}
function ataqueTierra(){
    ataqueJugador = "TIERRA"
    ataqueEnemigoAleatorio()
}
//Función para el ataque aleatorio del enemigo (PC)
function ataqueEnemigoAleatorio(){
    let ataqueAleatorio = aleatorio(1,3)
    if (ataqueAleatorio == 1){
        ataqueEnemigo = "FUEGO"
    } else if(ataqueAleatorio == 2){
        ataqueEnemigo = "AGUA"
    } else {
        ataqueEnemigo = "TIERRA"
    }
    determinarResultadoRonda()
}
//Función para determinar el ganador de la ronda
function determinarResultadoRonda(){
    if(ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA"){
        resultadoRonda = "GANASTE🎉🎉🎉"
    } else if(ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA"){
        resultadoRonda = "GANASTE🎉🎉🎉"
    } else if(ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO"){
        resultadoRonda = "GANASTE🎉🎉🎉"
    } else if(ataqueJugador == ataqueEnemigo){
        resultadoRonda = "EMPATASTE 🙆‍♂️"
    } else{
        resultadoRonda = "PERDISTE😣😣😣"
    }  crearMensaje()
}
//Función para añadir un nuevo parrafo con el resultado de la ronda
function crearMensaje(){
    let sectionMensajesRonda = document.getElementById("mensajes")
    let parrafo = document.createElement("p")
    parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + ", la mascota enemiga atacó con " + ataqueEnemigo + " - " + resultadoRonda
    sectionMensajesRonda.appendChild(parrafo)
}

//load es el evento en el que la página HTML termina de cargar
window.addEventListener("load", iniciarJuego)


