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

let jugadorId = null
let enemigoId = null
let mokeponesEnemigos = []
let inputHipodoge
let inputCapipepo
let inputRatigueya
let tarjetaMokepon
let mascotaJugador
let objetoMascotaJugador
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
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoMapa = 350
if(anchoDelMapa > anchoMaximoMapa){
    anchoDelMapa = anchoMaximoMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

let mokepones = []

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "./imagenes/mokepons_mokepon_hipodoge_attack.png", 5, "./imagenes/hipodoge.png")
let capipepo = new Mokepon("Capipepo", "./imagenes/mokepons_mokepon_capipepo_attack.png", 5, "./imagenes/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "./imagenes/mokepons_mokepon_ratigueya_attack.png", 5, "./imagenes/ratigueya.png")

mokepones.push(hipodoge,capipepo,ratigueya)

const hipodogeAtaques = [
    { nombre: "AGUA", id: "boton-ataque-agua", emoji: "💧" },
    { nombre: "AGUA", id: "boton-ataque-agua", emoji: "💧" },
    { nombre: "AGUA", id: "boton-ataque-agua", emoji: "💧" },
    { nombre: "TIERRA", id: "boton-ataque-tierra", emoji: "🌱" },
    { nombre: "FUEGO", id: "boton-ataque-fuego", emoji: "🔥" }
]

const capipepoAtaques = [
    { nombre: "TIERRA", id: "boton-ataque-tierra", emoji: "🌱" },
    { nombre: "TIERRA", id: "boton-ataque-tierra", emoji: "🌱" },
    { nombre: "TIERRA", id: "boton-ataque-tierra", emoji: "🌱" },
    { nombre: "FUEGO", id: "boton-ataque-fuego", emoji: "🔥" },
    { nombre: "AGUA", id: "boton-ataque-agua", emoji: "💧" }
]

const ratigueyaAtaques = [
    { nombre: "FUEGO", id: "boton-ataque-fuego", emoji: "🔥" },
    { nombre: "FUEGO", id: "boton-ataque-fuego", emoji: "🔥" },
    { nombre: "FUEGO", id: "boton-ataque-fuego", emoji: "🔥" },
    { nombre: "AGUA", id: "boton-ataque-agua", emoji: "💧" },
    { nombre: "TIERRA", id: "boton-ataque-tierra", emoji: "🌱"  }
]
//Los puntos suspensivos sirven para pasar los elementos de la variable como si los hubiera escrito directamente
hipodoge.ataques.push(...hipodogeAtaques)
capipepo.ataques.push(...capipepoAtaques)
ratigueya.ataques.push(...ratigueyaAtaques)

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
    unirseAlJuego()
}
function unirseAlJuego() {
    // Recuerda que se debe reemplazar esta dirección IP por la de tu dispositivo en la IPv4.
    fetch("http://192.168.0.13:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}
//Función para obtener números aleatorios
function aleatorio(min, max){
    return Math.floor((Math.random())*(max-min+1)+min)
}
//la propiedad innerHTML permite modificar el DOM con strings que se ponen dentro de una etiqueta escogida anteriormente
function elegirMascotaJugador(){
    //Codigo para ocultar la sección de seleccionar mascota y mostrar la sección de seleccionar ataque
    
    
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
            return
            break
    } 
    sectionSeleccionarMascota.style.display = "none"
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
    seleccionarMokepon(mascotaJugador)
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.0.13:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

//Función para elegir mascota enemiga de forma aleatoria
function elegirMascotaEnemigo(objetoMascotaEnemigo){
    spanMascotaEnemigo.innerHTML = objetoMascotaEnemigo.nombre
    ataquesMascotaEnemigo = objetoMascotaEnemigo.ataques
    secuenciaAtaque()
}

function extraerAtaques(mascotaJugador) {
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
                console.log("Ataques jugador: " + ataqueJugador)
                boton.style.background = "#b6a24a"
                boton.disabled = true
            } else if(e.target.textContent === "💧"){
                ataqueJugador.push("AGUA")
                console.log("Ataques jugador: " + ataqueJugador)
                boton.style.background = "#b6a24a"
                boton.disabled = true
            } else {
                ataqueJugador.push("TIERRA")
                console.log("Ataques jugador: " + ataqueJugador)
                boton.style.background = "#b6a24a"
                boton.disabled = true
            }

            if(ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}
function enviarAtaques() {
    fetch(`http://192.168.0.13:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques(), 50)
}
function obtenerAtaques() {
    fetch(`http://192.168.0.13:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if(res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if(ataques.length === 5) {
                            ataqueEnemigo = ataques
                            iniciarCombate()
                        }
                    })
            }
        })
}

//Función para el ataque aleatorio del enemigo (PC)
function ataqueEnemigoAleatorio(){
    console.log(ataquesMascotaEnemigo)
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
    clearInterval(intervalo)
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
    objetoMascotaJugador.x = objetoMascotaJugador.x + objetoMascotaJugador.velocidadX
    objetoMascotaJugador.y = objetoMascotaJugador.y + objetoMascotaJugador.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    objetoMascotaJugador.pintarMokepon()
    enviarPosicion(objetoMascotaJugador.x, objetoMascotaJugador.y)
    mokeponesEnemigos.forEach((mokepon) => {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}
function enviarPosicion(x, y) {
    fetch(`http://192.168.0.13:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        //Cuando hayan claves y valores iguales, puedes dejar solo el valor, JS entiende que clave y valor serán lo mismo.
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function (res) {
            if(res.ok) {
                res.json()
                //Al poner un parametro encerrado en las llaves { enemigos } es extraido directamente, por eso se puede usar directamente abajo.
                .then(function ({ enemigos }){
                    console.log(enemigos)
                    //map es un método de JS que te permite recorrer un array y devolver como return otro array modificado
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipodoge") {
                            mokeponEnemigo = new Mokepon("Hipodoge", "./imagenes/mokepons_mokepon_hipodoge_attack.png", 5, "./imagenes/hipodoge.png", enemigo.id)
                        } else if (mokeponNombre === "Capipepo") {
                            mokeponEnemigo = new Mokepon("Capipepo", "./imagenes/mokepons_mokepon_capipepo_attack.png", 5, "./imagenes/capipepo.png", enemigo.id)
                        } else if (mokeponNombre === "Ratigueya") {
                            mokeponEnemigo = new Mokepon("Ratigueya", "./imagenes/mokepons_mokepon_ratigueya_attack.png", 5, "./imagenes/ratigueya.png", enemigo.id)
                        }
                        
                        mokeponEnemigo.x = enemigo.x || 0
                        mokeponEnemigo.y = enemigo.y || 0
                        return mokeponEnemigo
                    })
                })
            }
        })
}

function moverDerechaPersonaje() {
    objetoMascotaJugador.velocidadX = 5
}
function moverIzquierdaPersonaje() {
    objetoMascotaJugador.velocidadX = -5
}
function moverArribaPersonaje() {
    objetoMascotaJugador.velocidadY = -5
}
function moverAbajoPersonaje() {
    objetoMascotaJugador.velocidadY = 5
}

function detenerMovimiento() {
    objetoMascotaJugador.velocidadX = 0
    objetoMascotaJugador.velocidadY = 0
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
    objetoMascotaJugador = obtenerObjetoMascota()
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", sePresionaTecla)

    window.addEventListener("keyup", detenerMovimiento)
}
function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }
    } 
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = objetoMascotaJugador.y
    const abajoMascota = objetoMascotaJugador.y + objetoMascotaJugador.alto
    const derechaMascota = objetoMascotaJugador.x + objetoMascotaJugador.ancho
    const izquierdaMascota = objetoMascotaJugador.x

    if(abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo){
            return
        }
    detenerMovimiento()
    console.log("Se detecta colisión")
    //Aquí se toma el id enviado desde el backend y se asigna en el Front-end
    enemigoId = enemigo.id
    clearInterval(intervalo)
    sectionVerMapa.style.display = "none"
    sectionSeleccionarAtaque.style.display = "flex"
    elegirMascotaEnemigo(enemigo)
}
    
//load es el evento en el que la página HTML termina de cargar
window.addEventListener("load", iniciarJuego)