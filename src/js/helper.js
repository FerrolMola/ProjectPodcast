import { getAllPodcasts } from './api/api.js';
import { getPodcastDetail } from './api/api.js';


export function renderEpisodio(url) {

}

export function renderPodcast(url) {
    let podcastId = url[1];
    
}
export function renderPrincipalv2() {

}

export function renderPrincipal() {

    debugger;
        
    getAllPodcasts().then(allPodcasts => {
        let html = `
            <div class="podcasts-grid">
                <div class="filter">
                    <span class="badge">${allPodcasts.length}</span>
                    <input type="text" name="filter-value" autoFocus
                        placeholder="Filter podcasts..." value="">
                </div>
                <div class="podcasts-list">
                    ${renderPodcasts(allPodcasts)}
                </div>
            </div>
        `;
    
        render(html);
    })
   
}

function renderPodcasts (podcasts) {

    return podcasts.map(podcast => {
        return `
                <div class="podcast-summary">
                    <div class="box">
                        <a href="/podcast/${podcast.id}">
                            <div class="box-icon">
                                <img src=${podcast.cover} alt=${podcast.name}>
                            </div>
                            <div class="info">
                                <h4 class="text-center">${podcast.name}</h4>
                                <p>
                                    <span class="text-center">
                                        <span>Author: </span>
                                        <span>${podcast.author}</span>
                                    </span>
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            `;
        })
}

function render (html) {

    let element = document.createElement('div'); // cdr: let | const
    element.innerHTML = html;
    const contenido = document.querySelector(".main-content"); 

    // vaciamos el contenido
    contenido.innerHTML="";
    // anhadimos contenido
    contenido.appendChild(element);
}