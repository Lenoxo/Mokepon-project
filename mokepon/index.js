const express = require("express");

const app = express();

const port = 8080;

const cors = require("cors");

const jugadores = [];

class Jugador {
  constructor(id) {
    this.id = id;
  }

  asignarMokepon(mokepon) {
    this.mokepon = mokepon;
  }
  actualizarPosicion(x, y) {
    this.x = x;
    this.y = y;
  }
  asignarAtaques(ataques) {
    this.ataques = ataques;
  }
}

class Mokepon {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

app.use(express.static("public"));
//Aquí se habilita el uso de CORS
app.use(cors());
//Aquí se habilita el uso de formatos JSON en ExpressJS
app.use(express.json());

app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`;

  const jugador = new Jugador(id);

  jugadores.push(jugador);

  res.send(id);
});
//findIndex va a buscar información dentro de un array, si la encuentra devuelve el numero del indice, si no la encuentra, devuelve un -1
app.post("/mokepon/:jugadorId", (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const nombre = req.body.mokepon || "";
  const mokepon = new Mokepon(nombre);
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarMokepon(mokepon);
  }
  console.log(jugadores);
  console.log(jugadorId);
  res.end();
});

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const x = req.body.x || 0;
  const y = req.body.y || 0;
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y);
  }
  const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id);
  res.send({
    enemigos,
  });
});

app.post("/mokepon/:jugadorId/ataques", (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const ataques = req.body.ataques || [];
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarAtaques(ataques);
  }
  res.end();
});
app.get("/mokepon/:jugadorId/ataques", (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const jugador = jugadores.find((jugador) => jugadorId === jugador.id);
  res.send({
    ataques: jugador.ataques || [],
  });
});

app.listen(port, () => {
  console.log("Servidor funcionando jeje");
});
