
/*
     Se deberá almacenar en cliente de manera que solo se vuelva a solicitar si ha pasado un
     día desde la última vez que se solicitó.    
*/
export function setLocalStorage(clave, datos) {

    const podcasts = {
        fecha: new Date().getTime(),
        datos: datos
    }
    localStorage.setItem(clave, JSON.stringify(podcasts));
}

export function getLocalStorage(clave) {

    let podcasts;
    const datosAlmacenados = JSON.parse(localStorage.getItem(clave));

    if (null != datosAlmacenados && isPodcastLocalStorage(datosAlmacenados)) {
        podcasts = datosAlmacenados.datos;
    }
    
    return podcasts;
}

function isPodcastLocalStorage(datosAlmacenados) {

    let oneDay = 24 * 60 * 60 * 1000,
    now = new Date(),
    dateLocal = datosAlmacenados.fecha;

    return (Math.round(Math.abs((now.getTime() - dateLocal) / (oneDay))) <= 1);
}