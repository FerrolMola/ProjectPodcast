import { getLocalStorage } from '../config/localstorage.js'
import { setLocalStorage } from '../config/localstorage.js'

var TOPPODCASTS_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
var TOPPODCASTS_URL_EPISODE_ID = 'https://itunes.apple.com/lookup?id=';
var PROXY = 'https://cors-anywhere.herokuapp.com/';


export function getAllPodcasts() {

	return new Promise((resolve, reject) => {

		const datosAlmacenados = getLocalStorage('podcasts');
		if (datosAlmacenados) {
			resolve(datosAlmacenados);
		} else {
			fetch(TOPPODCASTS_URL)
				.then(response => {
					return response.json();
				})
				.then((data) => {
					const allPodcasts = [];
					data.feed.entry.forEach(function (podcasts) {
						const podcast = {
							id: podcasts.id.attributes['im:id'],
							name: podcasts['im:name'].label,
							author: podcasts['im:artist'].label,
							// cdr: revisar esto
							cover: podcasts['im:image'].filter((imageData) => imageData.attributes.height === '170')[0].label
						}
						allPodcasts.push(podcast)
					});
					setLocalStorage('podcasts', allPodcasts);
					resolve(allPodcasts);
				})
		}
	});
}

/*
	El usuario podrá filtrar los podcasts mostrados introduciendo una cadena de texto que
	tendrá en cuenta tanto el título de los podcasts así como los nombres de sus autores.
*/
export function getFilterPodcasts(valuesFiltro) {

	return allPodcasts.filter(podcast => {
		const regex = new RegExp(valuesFiltro, 'gi');
		return podcast.name.match(regex) || podcast.author.match(regex);
	});

}

function createPodcastObj(podcastDocument, podcastId) {

	//  imagen del podcast, su título, su autor y su descripción
	// const img = cdr: ¿Como la recuperamos?
	const id = podcastId,
		author = podcastDocument.querySelector('rss channel author').textContent,
		titulo = podcastDocument.querySelector('rss channel title').textContent,
		descripcion = podcastDocument.querySelector('rss channel summary').textContent;

	// episodios  listado de los mismos indicando su título, fecha de publicación y duración
	let numEpisode = 0,
		episodios = [],
		objPodcast = {};
	Array.from(podcastDocument.querySelectorAll('rss channel item')).map(episode => {

		const titleEpisodio = episode.querySelector('title').textContent,
			idEpisodio = 'episode_' + numEpisode++,
			fechaPub = new Date(episode.querySelector('pubDate').textContent).toLocaleDateString(),
			dur = episode.querySelector('duration').textContent,
			mp3 = episode.querySelector('enclosure').getAttribute('url'),
			descripcionEpisodio = episode.querySelector('description').textContent;

		episodios.push(
			{
				titleEpisodio,
				idEpisodio,
				fechaPub,
				dur,
				mp3,
				descripcionEpisodio
			}
		)
	})

	objPodcast = {
		id,
		author,
		titulo,
		descripcion,
		episodios
	};
	setLocalStorage('podcast_' + podcastId, objPodcast);

	return objPodcast;
}

export function getPodcastId(podcastId) {

	return new Promise((resolve, reject) => {

		const datosAlmacenados = getLocalStorage('podcast_' + podcastId);
		if (datosAlmacenados) {
			resolve(datosAlmacenados);
		} else {

			getPodcastDetail(podcastId).then(feed => {

				getPodcastDetailEpisode(feed).then(podcastDocument => {

					resolve(createPodcastObj(podcastDocument, podcastId));
				})

			})
		}
	});
}

export function getPodcastDetail(podcastId) {

	return new Promise((resolve, reject) => {

		fetch(PROXY + TOPPODCASTS_URL_EPISODE_ID + podcastId)
			.then(function (response) {
				return response.json();
			})
			.then((data) => {
				resolve(data.results[0].feedUrl);
			});
	});
}

export function getPodcastDetailEpisode(feed) {

	return new Promise((resolve, reject) => {

		fetch(PROXY + feed)
			.then(response => response.text())
			.then((str) => {
				const data = (new window.DOMParser()).parseFromString(str, "text/xml")
				resolve(data);
			});
	});
} 