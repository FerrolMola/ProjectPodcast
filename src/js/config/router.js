import { renderPrincipal } from '../helper.js';
import { renderPodcast } from '../helper.js';
import { renderEpisodio } from '../helper.js';
import { showSpinner } from '../helper.js'

const Router = {
  
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

		window.addEventListener('popstate', () => {
			this.getUrl(window.location.pathname, true);
        });
        
        this.getUrl(window.location.pathname);
    },
    getUrl (url){

        showSpinner();
        var patternPodcast = new RegExp(/^\/podcast\/(\d*)\/?$/);
        var patternEpisodio = new RegExp(/^\/podcast\/(\d*)\/episode\/(.*)\/?$/);

       if(url.match(patternPodcast)){
            renderPodcast(url.match(patternPodcast));
       }else if (url.match(patternEpisodio)){
            renderEpisodio(url.match(patternEpisodio));
       }else{
            renderPrincipal ();
       }                    
       
       window.history.pushState(null, '', url);
    }
}

export default Router;