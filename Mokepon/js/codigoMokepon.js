const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonSeleccionarMascota = document.getElementById("boton-mascota")

const botonReiniciar = document.getElementById("boton-reiniciar")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const sectionResultado = document.getElementById("resultado")
const sectionAtaqueJugador = document.getElementById("ataque-jugador")
const sectionAtaqueEnemigo = document.getElementById("ataque-enemigo")
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")
const contenedorTarjetasMokepon = document.getElementById("contenedor-tarjetas-mascotas")
const contenedorAtaques = document.getElementById("contenedor-botones-ataques")

let inputHipodoge
let inputCapipepo
let inputRatigueya
let tarjetaMokepon
let botonFuego
let botonAgua
let botonTierra

let ataqueJugador
let ataqueEnemigo
let resultadoRonda
let vidasJugador = 3
let vidasEnemigo = 3

let mokepones = []

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon("Hipodoge", "./imagenes/mokepons_mokepon_hipodoge_attack.png", 5)
let capipepo = new Mokepon("Capipepo", "./imagenes/mokepons_mokepon_capipepo_attack.png", 5)
let ratigueya = new Mokepon("Ratigueya", "./imagenes/mokepons_mokepon_ratigueya_attack.png", 5)

mokepones.push(hipodoge,capipepo,ratigueya)

hipodoge.ataques.push(
    { nombre: "AGUA", id: "boton-ataque-agua", emoji: "💧" },
    { nombre: "AGUA", id: "boton-ataque-agua", emoji: "💧" },
    { nombre: "AGUA", id: "boton-ataque-agua", emoji: "💧" },
    { nombre: "TIERRA", id: "boton-ataque-tierra", emoji: "🌱" },
    { nombre: "FUEGO", id: "boton-ataque-fuego", emoji: "🔥" }
)

capipepo.ataques.push(
    { nombre: "TIERRA", id: "boton-ataque-tierra", emoji: "🌱" },
    { nombre: "TIERRA", id: "boton-ataque-tierra", emoji: "🌱" },
    { nombre: "TIERRA", id: "boton-ataque-tierra", emoji: "🌱" },
    { nombre: "FUEGO", id: "boton-ataque-fuego", emoji: "🔥" },
    { nombre: "AGUA", id: "boton-ataque-agua", emoji: "💧" }
)
ratigueya.ataques.push(
    { nombre: "FUEGO", id: "boton-ataque-fuego", emoji: "🔥" },
    { nombre: "FUEGO", id: "boton-ataque-fuego", emoji: "🔥" },
    { nombre: "FUEGO", id: "boton-ataque-fuego", emoji: "🔥" },
    { nombre: "AGUA", id: "boton-ataque-agua", emoji: "💧" },
    { nombre: "TIERRA", id: "boton-ataque-tierra", emoji: "🌱"  }
)

function iniciarJuego(){
    //Codigo para ocultar secciones de seleccionar ataque y reiniciar
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"
    //Método para cargar las tarjetas por mokepon en HTML
    mokepones.forEach((mokepon) => {
        tarjetaMokepon = `<input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="botones-mascotas" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre} />
            <p class="emojis">${mokepon.ataques[0].emoji}</p>
        </label>`
        contenedorTarjetasMokepon.innerHTML += tarjetaMokepon
        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
    })

    //addEventListeners que permiten disparar funciones con los clicks
    // botonFuego.addEventListener("click", ataqueFuego)
    // botonAgua.addEventListener("click", ataqueAgua)
    // botonTierra.addEventListener("click", ataqueTierra)
    botonSeleccionarMascota.addEventListener("click", elegirMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
}
//Función para obtener números aleatorios
function aleatorio(min, max){
    return Math.floor((Math.random())*(max-min+1)+min)
}
//la propiedad innerHTML permite modificar el DOM con strings que se ponen dentro de una etiqueta escogida anteriormente
function elegirMascotaJugador(){
    //Codigo para ocultar la sección de seleccionar mascota y mostrar la sección de seleccionar ataque
    sectionSeleccionarAtaque.style.display = "flex"
    sectionSeleccionarMascota.style.display = "none"
    //Esta condicional interactua con la elección del jugador
    switch (true){
        case inputHipodoge.checked:
            spanMascotaJugador.innerHTML = inputHipodoge.id
            mascotaJugador = inputHipodoge.id
            break  
        case inputCapipepo.checked:
            spanMascotaJugador.innerHTML = inputCapipepo.id
            mascotaJugador = inputCapipepo.id
            break  
        case inputRatigueya.checked:
            spanMascotaJugador.innerHTML = inputRatigueya.id
            mascotaJugador = inputRatigueya.id
            break  
        default:
            alert("Selecciona a una mascota para continuar 😄")
            break
    } extraerMascota(mascotaJugador)
    elegirMascotaEnemigo()
}


//Función para elegir mascota enemiga de forma aleatoria
function elegirMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(0,mokepones.length - 1)
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
}

function extraerMascota(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    } 
    cargarAtaques(ataques)
}

function cargarAtaques(ataques){
    let botonAtaques
    ataques.forEach((ataque) => {
        botonAtaques = `<button id=${ataque.nombre} class="boton-ataque">${ataque.nombre + (ataque.emoji)}🎉</button>`
        contenedorAtaques.innerHTML += botonAtaques
    })

    botonFuego = document.getElementById("FUEGO")
    botonAgua = document.getElementById("AGUA")
    botonTierra = document.getElementById("TIERRA")

    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra) 
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
    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemigo =  document.createElement("p")

    sectionResultado.innerHTML = resultadoRonda
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    sectionAtaqueJugador.appendChild(nuevoAtaqueJugador)
    sectionAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo)

    //Condicional para contar las vidas del jugador y del enemigo
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
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    //Codigo que muestra la sección del botón reiniciar
    sectionReiniciar.style.display = "block"
}
//Función para reiniciar el juego
function reiniciarJuego(){
    location.reload()
}
//load es el evento en el que la página HTML termina de cargar
window.addEventListener("load", iniciarJuego)