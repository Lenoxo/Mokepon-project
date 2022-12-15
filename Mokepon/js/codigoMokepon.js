let ataqueJugador
let ataqueEnemigo
let resultadoRonda
let vidasJugador = 3
let vidasEnemigo = 3
function iniciarJuego(){
    //Codigo para ocultar secciones de seleccionar ataque y reiniciar
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
    sectionSeleccionarAtaque.style.display = "none"
    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = "none"
    //addEventListeners que permiten disparar funciones con los clicks
    let botonSeleccionarMascota = document.getElementById("boton-mascota")
    botonSeleccionarMascota.addEventListener("click", elegirMascotaJugador)
    let botonFuego = document.getElementById("boton-ataque-fuego")
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("boton-ataque-agua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra = document.getElementById("boton-ataque-tierra")
    botonTierra.addEventListener("click", ataqueTierra)
    let botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.addEventListener("click", reiniciarJuego)
}
//Función para obtener números aleatorios
function aleatorio(min, max){
    return Math.floor((Math.random())*(max-min+1)+min)
}
//la propiedad innerHTML permite modificar el DOM con strings que se ponen dentro de una etiqueta escogida anteriormente
function elegirMascotaJugador(){
    //Codigo para ocultar la sección de seleccionar mascota y mostrar la sección de seleccionar ataque
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
    sectionSeleccionarAtaque.style.display = "flex"
    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
    sectionSeleccionarMascota.style.display = "none"

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
    let sectionResultado = document.getElementById("resultado")
    let sectionAtaqueJugador = document.getElementById("ataque-jugador")
    let sectionAtaqueEnemigo = document.getElementById("ataque-enemigo")
    
    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemigo =  document.createElement("p")

    sectionResultado.innerHTML = resultadoRonda
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    sectionAtaqueJugador.appendChild(nuevoAtaqueJugador)
    sectionAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo)

    //Condicional para contar las vidas del jugador y del enemigo
    let spanVidasJugador = document.getElementById("vidas-jugador")
    let spanVidasEnemigo = document.getElementById("vidas-enemigo")
        if(resultadoRonda == "GANASTE🎉🎉🎉"){
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
        } else if(resultadoRonda == "PERDISTE😣😣😣") {
            vidasJugador--
            spanVidasJugador.innerHTML = vidasJugador
        }
    //Condicional para determinar el resultado de la partida
    if(vidasJugador == 0){
        alert("Ha finalizado la partida, has perdido la batalla 😣😣😣")
        sectionResultado.innerHTML = "Es una pena, pero puedes volver a intentar ganar, dale click a reiniciar si lo deseas."
        deshabilitarBotonesAtaque()
    } else if(vidasEnemigo == 0){
        alert("Ha finalizado la partida, has ganado la batalla 😎😎😎")
        sectionResultado.innerHTML = "Wow, estás dominando la partida, ¿que tal intentar conseguir una racha de victorias?, dale click a reiniciar para ponerte a prueba"
        deshabilitarBotonesAtaque()
    }
}
//Función para deshabilitar los botones de ataque
function deshabilitarBotonesAtaque(){
    let botonFuego = document.getElementById("boton-ataque-fuego")
    botonFuego.disabled = true
    let botonAgua = document.getElementById("boton-ataque-agua")
    botonAgua.disabled = true
    let botonTierra = document.getElementById("boton-ataque-tierra")
    botonTierra.disabled = true
    //Codigo que muestra la sección del botón reiniciar
    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = "block"
}
//Función para reiniciar el juego
function reiniciarJuego(){
    location.reload()
}
//load es el evento en el que la página HTML termina de cargar
window.addEventListener("load", iniciarJuego)