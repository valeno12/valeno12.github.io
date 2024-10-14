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

    // Contador
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
  })
  .catch(error => console.error('Error al cargar el JSON:', error));
