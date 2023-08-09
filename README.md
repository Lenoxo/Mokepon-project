# Mokepon

Mokepon is a game developed using HTML, CSS, and JavaScript. It is a game similar to Pokémon and supports 2 players per round.

The frontend of the game is built using HTML, CSS, and JavaScript without any frameworks. The backend is developed using Node.js and Express.js. This project is my first programming endeavor.

<!-- - [Deploy](#deploy) -->
## Table of Contents:
- [Demo](#demo)
- [Installation](#installation)
- [Game Round Explanation](#game-round-explanation)
- [Useful Resources](#useful-resources)
- [License](#license)
- [Author](#author)

### Demo

![Mokepon Demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTU1cDMwa3B0OHAxbWJodmF3eGdhajg5MnVjb25sOXRxaGVldmFlNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nDq2AnSwugFvlvMDpo/giphy.gif)

<!-- ### Deploy

Coming soon... -->

### Installation

To install and run Mokepon locally, follow these steps:

1. Clone the repository: `git clone [repository URL]`
2. Navigate to the project directory: `cd Mokepon-project/mokepon`
3. Open your terminal and execute: `npm install`.
4. After installing dependencies, run: `node index.js`.
5. Now, you can use Mokepon within your local network devices, remember to edit ip addresses within `Mokepon-project/mokepon/js/codigoMokepon.js`
    - Replace all `192.168.0.13` to your IPv4 address.
    - You can use `ctrl + f` in VS Code to find and replace it quickly.

### Game Round Explanation

The game consists of 3 stages during each round:

1. **Character Selection:** Players can choose one of three characters - Capipepo, Ratigueya, or Hipodoge.
2. **Map Exploration:** Players navigate a map to find the opposing player. 
3. **Battle:** Once the players collide, a battle begins where they must select 5 attacks in any order. The battle follows a rock-paper-scissors logic, where water defeats fire, fire defeats earth, and earth defeats water. The winner of the round is determined based on the damage received from the opponent. Players can restart to play another round.

### Useful Resources

- **[HTML Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)**: Official documentation for HTML.
- **[CSS Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS)**: Official documentation for CSS.
- **[JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**: Official documentation for JavaScript.
- **[Node.js Documentation](https://nodejs.org/en/docs/)**: Official documentation for Node.js.
- **[Express.js Documentation](https://expressjs.com/)**: Official documentation for Express.js.
- **[Free Programming Course at Platzi](https://platzi.com/cursos/programacion-basica/)**: Course where I learned how to develop this project, and later on, gave it my style.

### License

This project is licensed under the [MIT License](LICENSE).

### Author

Lenoxo (Emanuel Padilla)

Feel free to contact me at [emanuehl159@gmail.com](mailto:emanuehl159@gmail.com) if you have any questions, suggestions, or comments.