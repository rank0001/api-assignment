class Music {
	constructor() {
		this.songs = "https://api.lyrics.ovh/suggest/";
		this.lyrics = "https://api.lyrics.ovh/v1/";
	}

	async getSongs(title) {
		const response = await fetch(this.songs + title);
		const songs = await response.json();
		return songs.data;
	}

	async getLyrics(artist, title) {
		const response = await fetch(this.lyrics + artist + "/" + title);
		const data = await response.json();
		return data.lyrics;
	}
}
