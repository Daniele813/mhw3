
// Funzione per il caricamento della pagina
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    header.classList.toggle("sticky", window.scrollY > 0);

    if (currentScroll > lastScrollTop) {
        // Scroll verso il basso
        navbar.classList.add("hide");
      } else {
        // Scroll verso l’alto
        navbar.classList.remove("hide");
      }
});

  
  const toggle = document.getElementById("dropdownToggle");
  const menu = document.getElementById("dropdownMenu");

  document.addEventListener("click", function (e) {
    const isClickInside = toggle.contains(e.target) || menu.contains(e.target);
    if (isClickInside) {
      menu.style.display = (menu.style.display === "block") ? "none" : "block";
    } else {
      menu.style.display = "none";
    }
  });

  

  toggle.addEventListener("click", () => {
    const badge = document.querySelector(".notification-badge");
    if (badge) badge.style.display = "none";
  });
  

  const arrow = document.querySelector('.arrow');

  // Esempio: al click sulla freccetta cambia rotazione
  arrow.addEventListener('click', () => {
    arrow.classList.toggle('open');
  });


function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('show'); 
  }
  
//animazione backgrond video 

const videoElement = document.getElementById("heroVideo");

  const videos = [
    "video1.mp4", // esempio
    "video2.mp4"
  ];

  let index = 0;

  function changeVideo() {
    videoElement.src = videos[index];
    videoElement.load(); // ricarica il video
    videoElement.play();

    index = (index + 1) % videos.length; // ciclo infinito tra i video
  }

// Cambia video ogni 20 secondi
setInterval(changeVideo, 20000);

// Carica il primo video all'avvio
window.addEventListener("DOMContentLoaded", changeVideo);



document.addEventListener("DOMContentLoaded", function () {
    const movies = document.querySelectorAll(".movie");
    
    movies.forEach(movie => {
        movie.addEventListener("mouseenter", function () {
            this.classList.add("expanded");
            
            const description = document.createElement("div");
            description.classList.add("movie-description");
            description.innerText = this.querySelector("img").alt +  "\n Una breve descrizione.";
            
            const playButton = document.createElement("button");
            playButton.classList.add("play-button");
            playButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"/></svg>';
            
            const detailsButton = document.createElement("button");
            detailsButton.classList.add("details-button");
            detailsButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12 16l-6-6h12z"/></svg>';
            
            const videoPreview = document.createElement("video");
            videoPreview.classList.add("movie-preview");
            videoPreview.src = "Inception.mp4"; // link al video
            videoPreview.autoplay = true;
            videoPreview.muted = true;
            videoPreview.loop = false;
            
            
            this.innerHTML = "";
            this.appendChild(videoPreview);
            this.appendChild(playButton);
            this.appendChild(detailsButton);
            this.appendChild(description);
        });
        
        movie.addEventListener("mouseleave", function () {
            this.classList.remove("expanded");
            this.innerHTML = `<img src="${this.getAttribute("data-img")}" alt="${this.getAttribute("data-title")}">`;



        });

        movie.addEventListener("mouseleave", function () {
            // Rimuove solo il video, i pulsanti e la descrizione, senza perdere l'immagine
            const video = this.querySelector("video");
            const description = this.querySelector(".movie-description");
            const playButton = this.querySelector(".play-button");
            const detailsButton = this.querySelector(".details-button");

            if (video) video.remove();
            if (description) description.remove();
            if (playButton) playButton.remove();
            if (detailsButton) detailsButton.remove();

            // Mostra nuovamente l'immagine originale
            const img = this.querySelector("img");
            if (img) img.style.display = "block";
        });
    });
    });


    document.querySelector(".logout").addEventListener("click", () => {
        window.location.href = "login.html";
      });

    
      //parte di fetch per caricare i film 
      async function caricaFilm() {
        try {
          const response = await fetch('https://api.example.com/movies');
          const movies = await response.json();
    
          const movieGrid = document.querySelector('.movie-grid');
          movieGrid.innerHTML = ''; // Pulisce il contenuto attuale
    
          movies.forEach(movie => {
            const div = document.createElement('div');
            div.className = 'movie';
            div.dataset.img = movie.img;
            div.dataset.video = movie.video;
            div.dataset.title = movie.title;
            div.style.backgroundImage = `url(${movie.img})`;
            movieGrid.appendChild(div);
          });
        } catch (error) {
          console.error('Errore nel caricamento dei film:', error);
        }
      }
    
      // Chiama la funzione quando la pagina è pronta
      window.addEventListener('DOMContentLoaded', caricaFilm);
   
    

// stranger
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let players = [];
let nextId = 1;


function generateBoard(rows = 5, cols = 5) {
  const tiles = ['A', 'B', 'C', 'D', 'E'];
  const board = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(tiles[Math.floor(Math.random() * tiles.length)]);
    }
    board.push(row);
  }
  return board;
}


function calculateScore(matches) {
  return matches * 10;
}


app.post('/players', (req, res) => {
  const { username } = req.body;
  const player = { id: nextId++, username, score: 0 };
  players.push(player);
  res.json(player);
});


app.get('/board', (req, res) => {
  const board = generateBoard();
  res.json({ board });
});


app.post('/score/:playerId', (req, res) => {
  const playerId = parseInt(req.params.playerId);
  const { matches } = req.body;
  const player = players.find(p => p.id === playerId);
  if (!player) {
    return res.status(404).json({ error: 'Player not found' });
  }
  const scoreToAdd = calculateScore(matches);
  player.score += scoreToAdd;
  res.json({ playerId: player.id, newScore: player.score });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

