
    // Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    // Add an event listener for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    libraryLoad("songs.json");

    function libraryLoad(file) {
        // Fetch the song data from the JSON file
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const songsContainer = document.getElementById('songList');
                const audioElement = document.getElementById('audio-player');
    
                songsContainer.innerText = ""
    
                // Loop through each song and create HTML elements
                data.forEach(song => {
                    const songDiv = document.createElement('div');
                    songDiv.className = 'song';
                    songDiv.innerHTML = `
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
            `;
    
                    // Add click event to play the song
                    songDiv.addEventListener('click', () => {
                        audioElement.src = song.url;
                        audioElement.play();
                    });
    
                    // Append the song to the container
                    songsContainer.appendChild(songDiv);
                });
            })
            .catch(error => console.error('Error loading the song data:', error));
    }
    
    
    // Function to load songs from the external JSON file
    // Function to load songs from a JSON file
    function loadSongs(file) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error loading the song data:', error);
            });
    }
    
    
    
    let artists = document.querySelectorAll(".profile-card");
    
    artists.forEach(artist => {
        artist.addEventListener("click", () => {
    
            let artistName = artist.querySelector("h2");
            
            libraryLoad(artistName.textContent + ".json");
        });
    });
    
    let library = document.querySelectorAll(".playlist-card");
    
    library.forEach(plalist => {
        plalist.addEventListener("click", () => {
            let plalistName = plalist.id;
            console.log(plalistName)
            libraryLoad(plalistName + ".json");
        });
    });
