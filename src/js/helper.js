import { getAllPodcasts, getPodcastId, getFilterPodcasts } from './api/api.js';

function renderEpisodios(podcast) {

    const trEpisodios = [],
        divDetailEpisodios = [];
    podcast.episodios.forEach(episodio => {

        const trHtml = `
                <tr class="podcast-episode-summary id="${episodio.idEpisodio}">
                    <td>
                        <a href="${`/podcast/${podcast.id}/episode/${episodio.idEpisodio}`}">${episodio.titleEpisodio}</a>
                    </td>
                    <td>${episodio.fechaPub}</td>
                    <td class="duration">${episodio.dur}</td>                                       
                </tr>`;
        trEpisodios.push(trHtml);

        const divHtlm = `
                <section id="page_${episodio.idEpisodio}" class="episode-detail-page page-with-sidebar">                   
                    <div class="content-section">
                        <div class="episode-detail section">
                            <div class="title">${episodio.titleEpisodio}</div>
                            <div class="subtitle">${episodio.descripcionEpisodio}</div>
                            <hr/>
                            <div class="player">
                                <audio src=${episodio.mp3} controls></audio>
                            </div>
                        </div>
                    </div>
                </section>`;
        divDetailEpisodios.push(divHtlm);
    });

    return `
        <div class="podcast-detail-page page-with-sidebar">
            <section class="sidebar-section">
                ${renderEstructuraLateral(podcast)}
            </section>

            <section class="content-section">

                <div class="section podcast-episodes-count">
                    <span>
                        Episodes: ${podcast.episodios.length}
                    </span>
                </div>

                <div class="section podcast-episodes">
                    <table class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${trEpisodios.join('')}
                        </tbody>
                    </table>
                </div>

                <!-- bloque detalle epidodio -->
                ${divDetailEpisodios.join('')}

            </section>
        </div>
    `;
}

function renderEstructuraLateral(podcast) {

    return `
            <div class="section sidebar">
                <div class="podcast-cover text-center">
                    <a href="${`/podcast/${podcast.id}`}">
                        <img src="${podcast.img}" alt="${podcast.name}">
                    </a>
                </div>
                <hr/>
                <div class="podcast-title">
                    <a href="${`/podcast/${podcast.id}`}">
                        <div class="title">${podcast.titulo}</div>
                        <div class="author"><span>by&nbsp;</span>${podcast.author}</div>
                    </a>
                </div>
                <hr/>
                <div class="podcast-description">
                    <div>Description:</div>
                    <p>${podcast.description}</p>
                </div>
            </div>
	    `;
}

export function renderEpisodio(episodioSeleccionado) {

    document.getElementsByClassName('section podcast-episodes-count')[0].style.display = 'none'
    document.getElementsByClassName('section podcast-episodes')[0].style.display = 'none'
    document.getElementById('page_' + episodioSeleccionado[2]).style.display = 'block';
    hideSpinner();
}

export function renderPodcast(url) {

    getPodcastId(url[1]).then(podcast => {
        let html = renderEpisodios(podcast);
        render(html,hideSpinner);
    })
    .catch(error => {
        console.error('renderPodcast - Se ha producido un error al mostrar el podcast: ' + error);
    })
}

export function renderPrincipal() {

    getAllPodcasts().then(allPodcasts => {
        drawPrincipal(allPodcasts);
    })
    .catch(error => {
        console.error('renderPrincipal - Se ha producido un error al mostrar la pantalla principal: ' + error);
    })
}

function renderfillterPodcast(valuesFiltro) {

    drawPrincipal(getFilterPodcasts(valuesFiltro));
    // Devuelvo el foco al input filter-value con el valuesFiltro
    const inputFilter = document.getElementsByName("filter-value")[0];
    inputFilter.focus();
    inputFilter.value = valuesFiltro;
}

function drawPrincipal(allPodcasts) {

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

    render(html,hideSpinner,eventFiltro);
}

function renderPodcasts(podcasts) {

    return podcasts.map(podcast => {
        return `
                <div class="podcast-summary">
                    <div class="box">
                        <a href="/podcast/${podcast.id}">
                            <div class="box-icon">
                                <img src=${podcast.img} alt=${podcast.name}>
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

export function showSpinner() {
    document.getElementsByClassName('spinner')[0].style.display = 'block';
}

function hideSpinner() {
    document.getElementsByClassName('spinner')[0].style.display = 'none';
}

function eventFiltro() {

    var inputFilter = document.getElementsByName("filter-value")[0];
    inputFilter.addEventListener("keyup", function(event) {
        renderfillterPodcast(this.value);
    });
}

export function render(html,hideSpinner,eventFiltro) {

    const element = document.createElement('div');
    element.innerHTML = html;
    const contenido = document.querySelector(".main-content");

    // vaciamos el contenido
    contenido.innerHTML = "";
    // anhadimos contenido
    contenido.appendChild(element);

    if (eventFiltro) { eventFiltro(); }
  
    hideSpinner();
}