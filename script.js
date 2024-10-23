fetch('songs.json')
  .then(response => response.json())
  .then(data => {
    const totalSongs = data.songs.length;
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
    const songIndex = (dayOfYear + 1) % totalSongs;
    const selectedSong = data.songs[songIndex];

    document.getElementById('highlight').innerText = selectedSong.highlight; // Muestra la estrofa destacada
    document.getElementById('song-container').innerHTML = selectedSong.iframe_code; // Muestra el iframe
    document.getElementById('message').innerText = selectedSong.message; // Muestra el mensaje

    // Verificar si el título de la canción es "Seremos"
    if (selectedSong.title === "Seremos") {
      // Crear un contenedor para el botón
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mb-4';

      // Crear el botón de enlace a Spotify
      const spotifyButton = document.createElement('a');
      spotifyButton.href = 'https://open.spotify.com/playlist/1VR2fDotIvk0gfcdqYspbp?si=ptlthXDVSju4sdrhpPrzEQ&pi=qHyla4LBSQyVJ'; // Reemplaza con el enlace de tu playlist
      spotifyButton.innerText = 'Escucha la playlist completa en Spotify';
      spotifyButton.className = 'bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors block text-center';

      // Insertar el botón en el contenedor
      buttonContainer.appendChild(spotifyButton);
      
      // Insertar el contenedor en el cuerpo de la página
      document.body.appendChild(buttonContainer);

      // Ocultar el contador ya que es el último día
      document.getElementById('countdown').style.display = 'none';
    } else {
      // Contador para las próximas canciones
      const nextChange = new Date();
      nextChange.setHours(0, 0, 0, 0); // Empieza el nuevo día a medianoche
      nextChange.setDate(nextChange.getDate() + 1); // Añade un día

      const updateCountdown = () => {
        const now = new Date();
        const timeDiff = nextChange - now;

        const hours = Math.floor((timeDiff % 86400000) / 3600000);
        const minutes = Math.floor((timeDiff % 3600000) / 60000);
        const seconds = Math.floor((timeDiff % 60000) / 1000);

        document.getElementById('countdown').innerText = `Faltan ${hours} horas, ${minutes} minutos y ${seconds} segundos para la próxima canción.`;
      };

      updateCountdown(); // Llama a la función una vez para mostrar el conteo inicial
      setInterval(updateCountdown, 1000); // Actualiza cada segundo
    }
  })
  .catch(error => console.error('Error al cargar el JSON:', error));
