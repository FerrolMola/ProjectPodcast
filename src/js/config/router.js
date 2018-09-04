import { renderPrincipal } from '../helper.js';
import { renderPodcast } from '../helper.js';
//import { renderEpisodio } from '../helper.js';

class Router {

    // cdr: convertir Router en un objeto
    constructor() {}
   
    
    init (){

        document.addEventListener('click', event => {
			let element = event.target;

			while (element && element.tagName !== 'A') {
                element = element.parentNode;
			}

            if (element) {
                event.preventDefault();
                this.getUrl(element.pathname);
            }

        });
        // La primera vez que ejecuto la aplicación
        this.getUrl(window.location.pathname);
    }

    getUrl (url){

        var patternPodcast = new RegExp(/^\/podcast\/(\d*)\/?$/);
        var patternEpisodio = new RegExp(/^\/podcast\/(\d*)\/episode\/(.*)\/?$/);

       if(url.match(patternPodcast)){
            // Detalle de un Podcast /podcast/{podcastId} 
            renderPodcast(url.match(patternPodcast));
            console.log("Detalle de un podscast");
       }else if (url.match(patternEpisodio)){
            // Detalle de un episodio  /podcast/{podcastId}/episode/{episodeId} 
           // renderEpisodio(url.match(patternEpisodio));
            console.log("Detalle de un episodio");
       }else{
            // Vista principal /
            renderPrincipal ();
       }                    
       
       window.history.pushState(null, '', url);
    }
}

export default Router;