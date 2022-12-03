        // Función para obtener números aleatorios para pc
        function aleatorio(min, max){
            return Math.floor((Math.random())*(max-min+1)+min)
        }
        // Función para mostrar la elección de los jugadores
        function election(jugada){
            resultado = ""
            if(jugada == 1){
                resultado = "Piedra 🥌"
            } else if(jugada == 2){
                resultado = "Papel 🧻"
            } else if(jugada == 3){
                resultado = "Tijera ✂"
            } else{
                resultado = "CAGARLA 🙌"
            }
            return resultado
        }
        // Función para decidir el resultado
        function decidirResultado(personaUno, personaDos){
            resultadoRonda = ""
            if(personaUno == personaDos){
                resultadoRonda = "Empate 🙆‍♂️"
            }   else if(personaUno == 2 && personaDos == 1){
                    resultadoRonda = "Ganaste 🥳🎉"
            }   else if(jugador == 1 && pc == 3){
                    resultadoRonda = "Ganaste 🥳🎉"
            }   else if(jugador == 3 && pc == 2){
                    resultadoRonda = "Ganaste 🥳🎉"
            }   else {
                    resultadoRonda = "Perdiste 😣"
            } return resultadoRonda
        }
        // 1 es piedra, 2 es papel, 3 es tijera
        let jugador = 0
        let pc = 0
        let victoriasJugador = 0
        let derrotasJugador = 0

        while (victoriasJugador < 3 && derrotasJugador < 3){
            let pc = aleatorio(1,3)
            jugador = prompt("Elige: 1 para piedra, 2 para papel, 3 para tijera")
            // Elección del jugador y el pc
            alert("Jugador elige: " + election(jugador))
            alert("PC elige: " + election(pc))
            // Resultado de la ronda
            alert("Resultado de la ronda: " + decidirResultado(jugador, pc))
            if(decidirResultado(jugador, pc) == "Ganaste 🥳🎉"){
                victoriasJugador = victoriasJugador + 1
            } else if(decidirResultado(jugador, pc) == "Perdiste 😣") {
                derrotasJugador = derrotasJugador + 1
            }
        }
        alert("Ganaste " + victoriasJugador + " veces. Perdiste " + derrotasJugador + " veces.")