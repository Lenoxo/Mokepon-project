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
const spanVidasJugador = document.getElementById("victorias-jugador")
const spanVidasEnemigo = document.getElementById("victorias-enemigo")
const contenedorTarjetasMokepon = document.getElementById("contenedor-tarjetas-mascotas")
const contenedorAtaques = document.getElementById("contenedor-botones-ataques")
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let inputHipodoge
let inputCapipepo
let inputRatigueya
let tarjetaMokepon
let ataquesMascotaEnemigo
let botones = []
let ataqueJugador = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let ataqueEnemigo = []
let resultadoRonda
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./imagenes/mokemap.png"

let mokepones = []

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 5
        this.y = 5
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
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
    sectionVerMapa.style.display = "none"
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
    sectionSeleccionarMascota.style.display = "none"
    sectionVerMapa.style.display = "flex"
    iniciarMapa()

    // sectionSeleccionarAtaque.style.display = "flex"
    
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
    ataquesMascotaEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
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
        botonAtaques = `<button id=${ataque.nombre} class="boton-ataque BAtaque">${ataque.emoji}</button>`
        contenedorAtaques.innerHTML += botonAtaques
    })
    botones = document.querySelectorAll(".BAtaque")

}
// Si quieres deshabilitar el boton clickeado, usa boton.disabled = true
function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#b6a24a"
                boton.disabled = true
            } else if(e.target.textContent === "💧"){
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#b6a24a"
                boton.disabled = true
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#b6a24a"
                boton.disabled = true
            }
            ataqueEnemigoAleatorio()
        })
    })
}

//Función para el ataque aleatorio del enemigo (PC)
function ataqueEnemigoAleatorio(){
    let ataqueAleatorio = aleatorio(0,ataquesMascotaEnemigo.length - 1)
    if (ataqueAleatorio == 1 || ataqueAleatorio == 0){
        ataqueEnemigo.push("FUEGO") 
    } else if(ataqueAleatorio == 2 || ataqueAleatorio == 3){
        ataqueEnemigo.push("AGUA")
    } else {
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarCombate()
}

function iniciarCombate(){
    if(ataqueJugador.length === 5){
        determinarResultadoRonda()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

//Función para determinar el ganador de la ronda
function determinarResultadoRonda(){

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            resultadoRonda = "EMPATASTE 🙆‍♂️"
            crearMensaje()
        } else if(ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA"){
            indexAmbosOponentes(index, index)
            resultadoRonda = "GANASTE🎉🎉🎉"
            crearMensaje()
        } else if(ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA"){
            indexAmbosOponentes(index, index)
            resultadoRonda = "GANASTE🎉🎉🎉"
            crearMensaje()
        } else if(ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO"){
            indexAmbosOponentes(index, index)
            resultadoRonda = "GANASTE🎉🎉🎉"
            crearMensaje()
        } else{
            indexAmbosOponentes(index, index)
            resultadoRonda = "PERDISTE😣😣😣"
            crearMensaje()
        } 
    }
}
//Función para añadir un nuevo parrafo con el resultado de la ronda
function crearMensaje(){  
    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemigo =  document.createElement("p")

    sectionResultado.innerHTML = resultadoRonda
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    sectionAtaqueJugador.appendChild(nuevoAtaqueJugador)
    sectionAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo)

    //Condicional para contar las vidas del jugador y del enemigo
        if(resultadoRonda == "GANASTE🎉🎉🎉"){
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(resultadoRonda == "PERDISTE😣😣😣") {
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    //Condicional para determinar el resultado de la partida
    if(victoriasJugador === victoriasEnemigo){
        sectionResultado.innerHTML = "Ha finalizado la partida, has empatado 🙆‍♂️"
        mostrarSectionReiniciar()
    } else if(victoriasEnemigo < victoriasJugador){
        sectionResultado.innerHTML = "Ha finalizado la partida, has ganado la batalla 😎😎😎"
        mostrarSectionReiniciar()
    } else {
        sectionResultado.innerHTML = "Ha finalizado la partida, has perdido la batalla 😣😣😣"
        mostrarSectionReiniciar()
    }
}
//Función para deshabilitar los botones de ataque
function mostrarSectionReiniciar(){
    //Codigo que muestra la sección del botón reiniciar
    sectionReiniciar.style.display = "block"
}
//Función para reiniciar el juego
function reiniciarJuego(){
    location.reload()
}

function pintarCanvas() {
    capipepo.x = capipepo.x + capipepo.velocidadX
    capipepo.y = capipepo.y + capipepo.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    lienzo.drawImage(
        capipepo.mapaFoto,
        capipepo.x,
        capipepo.y,
        capipepo.ancho,
        capipepo.alto
    )
}

function moverDerechaPersonaje() {
    capipepo.velocidadX = 5
}
function moverIzquierdaPersonaje() {
    capipepo.velocidadX = -5
}
function moverArribaPersonaje() {
    capipepo.velocidadY = -5
}
function moverAbajoPersonaje() {
    capipepo.velocidadY = 5
}

function detenerMovimiento() {
    capipepo.velocidadX = 0
    capipepo.velocidadY = 0
}

function sePresionaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArribaPersonaje()
            break
        case "ArrowDown":
            moverAbajoPersonaje()
            break
        case "ArrowLeft":
            moverIzquierdaPersonaje()
            break
        case "ArrowRight":
            moverDerechaPersonaje()
            break
        default:
            break
    }
}

function iniciarMapa() {
    mapa.width = 320
    mapa.height = 240
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", sePresionaTecla)

    window.addEventListener("keyup", detenerMovimiento)
}
//load es el evento en el que la página HTML termina de cargar
window.addEventListener("load", iniciarJuego)