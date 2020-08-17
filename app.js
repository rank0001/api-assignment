const songDetails = document.querySelector(".songs");
const searchButton = document.querySelector(".search-btn");
const searchBar = document.querySelector(".searchBar");
const lyrics = document.querySelector(".single-lyrics");
const lyricsButton = document.querySelector(".lyrics-btn");
const titleSong = document.querySelector(".song-title");
const songLyric = document.querySelector(".lyric");
const searchResult = document.querySelector(".search-result");

const music = new Music(); // instantiating the Music class for api calls

let songs;

//lyrics api fetching
const getLyrics = (artist, title) => {
	music.getLyrics(artist, title).then((res) => {
		// console.log(res);
		titleSong.textContent = title;
		if (res === null || res === undefined) {
			songLyric.textContent = "the song has no lyrics available";
		} else {
			songLyric.textContent = res;
		}
	});
};

//function to display songs
const displaySongs = (songs) => {
	songDetails.innerHTML = " ";
	searchResult.innerHTML = " ";
	if (songs.length >= 10) {
		for (let i = 0; i < 10; i++) {
			songDetails.innerHTML += `<p class="author lead"><strong>${songs[i].title}</strong> song by <span>${songs[i].artist.name}</span> 
            from <span>${songs[i].album.title} </span> album 
            <a href="#mainLyric"><button class="btn btn-success">Get Lyrics</button></a>
            </p>`;
			searchResult.innerHTML += ` <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">album ${songs[i].album.title}</h3>
                <p class="author lead">artist <span>${songs[i].artist.name}</span></p> 
                <p class="author lead">song <span>${songs[i].title}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
              <a href ="#mainLyric"><button class="btn btn-success">Get Lyrics</button> </a>
            </div>
        </div>`;
		}
	} else if (songs.length > 0 && songs.length < 10) {
		songDetails.innerHTML = " ";
		songs.forEach((song) => {
			songDetails.innerHTML += `<p class="author lead"><strong>${songs[i].title}</strong> song by <span>${songs[i].artist.name}</span> 
            from <span>${songs[i].album.title} </span> album 
            <button class="btn btn-success ">Get Lyrics</button>
            </p>`;
			searchResult.innerHTML += ` <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">album ${songs[i].album.title}</h3>
                <p class="author lead">artist <span>${songs[i].artist.name}</span></p> 
                <p class="author lead">song <span>${songs[i].title}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
              <a href ="#mainLyric"><button class="btn btn-success">Get Lyrics</button> </a>
            </div>
        </div>`;
		});
	} else {
		songDetails.innerHTML = ` <p class="author lead"><strong>No song available for this name</strong>`;
	}
};

//for handling footer details
songDetails.addEventListener("click", (e) => {
	//extracting the artist and the song title
	let text = e.target.parentElement.parentElement.textContent;
	let text1 = text.split("song");
	let songName = text1[0].trim();
	let text2 = text1[1].toString();
	let text3 = text2.split("from")[0];
	let text4 = text3.toString();
	let artistName = text4.split("by")[1].trim();
	getLyrics(artistName, songName);
});

//eventListener for footer portion
searchResult.addEventListener("click", (e) => {
	// extracting the artist and song title
	let text1 = e.target.parentElement.parentElement.parentElement.textContent;
	let text2 = text1.split("artist")[1];
	let text3 = text2.toString();
	let text4 = text3.split("song");
	let artist = text4[0].trim();
	let text5 = text4[1].trim();
	let song = text5.slice(0, text5.length - 10);
	getLyrics(artist, song);
});

//song search event
searchButton.addEventListener("click", (e) => {
	const songName = searchBar.value;
	searchBar.value = " ";
	if (songName.length > 0) {
		music.getSongs(songName).then((res) => {
			songs = res;
			displaySongs(songs);
		});
	}
});
