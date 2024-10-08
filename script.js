
// Add an event listener for hamburger
document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0"
})

// Add an event listener for close button
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%"
})

libraryLoad("songs.json","songList");

function createEle(song, songsContainer, audioElement) {
    const songDiv = document.createElement('div');
    songDiv.className = 'song';
    songDiv.innerHTML = `
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
            `;
    songDiv.addEventListener('click', () => {
        audioElement.src = song.url;  // Assuming song object contains `url`
        audioElement.play();
    });

    // Append the song to the container
    songsContainer.appendChild(songDiv);
    headingCreate(song);
}

function headingCreate(song){
    let title = document.querySelector("#title");
    let artwork = document.querySelector("#artwork");
}

function libraryLoad(file, where) {
    // Fetch the song data from the JSON file
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const songsContainer = document.getElementById(where);
            const audioElement = document.getElementById('audio-player');

            // Clear existing songs
            songsContainer.innerHTML = "";
            
            if (data.length > 0) {
                document.querySelector("#artwork").src = data[0].artwork;  // Set the artwork
            } else {
                document.querySelector("#artwork").src = ""; // Clear artwork if no songs
            }

            // Loop through each song and create HTML elements
            data.forEach(song => {
                createEle(song, songsContainer, audioElement);
            });
        })
        .catch(error => console.error('Error loading the song data:', error));
}

document.querySelectorAll(".profile-card").forEach(artist => {
    artist.addEventListener("click", () => {
        console.log("Artist clicked!");  // Debugging log
        let artistName = artist.querySelector("h2").textContent;
        libraryLoad(artistName + ".json", "songList");
        libraryLoad(artistName + ".json", "library-songs");
        
        document.querySelector("#title").textContent = artistName;

        // Show library navigation when an artist is clicked
        document.querySelector(".library-navigation").classList.add("visible");
    });
});

// Attach event listeners for playlists
document.querySelectorAll(".playlist-card").forEach(playlist => {
    playlist.addEventListener("click", () => {
        console.log("Playlist clicked!");  // Debugging log
        let playlistName = playlist.id;
        libraryLoad(playlistName + ".json", "songList");
        libraryLoad(playlistName + ".json", "library-songs");

        document.querySelector("#title").textContent = playlistName;

        // Show library navigation when a playlist is clicked
        document.querySelector(".library-navigation").classList.add("visible");
    });
});

// Back button hides the playlist view
document.getElementById("BackBtn").addEventListener("click", () => {
    console.log("Back button clicked!");  // Debugging log
    document.querySelector(".library-navigation").classList.remove("visible");
});
