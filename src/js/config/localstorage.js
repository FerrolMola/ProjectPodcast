
/*
     se deberá almacenar en cliente de manera que solo se vuelva a solicitar si ha pasado un
     día desde la última vez que se solicitó.    
*/
export function setLocalStorage(clave, datos) {

    var podcasts = {
        fecha: new Date(),
        datos: datos
    }

    // Guardo el objeto como un string
    localStorage.setItem(clave, JSON.stringify(podcasts));

    console.log('podcasts guardado: ', JSON.parse(podcasts));
}

export function getLocalStorage(clave) {

    // Obtengo el string previamente salvado y luego 
    if (isLastDay()){
        console.log('podcasts obtenidos LOCALSTORAGE: ', JSON.parse(guardado));
        return podcasts = localStorage.getItem(clave);
    }
}

function isLastDay(){

    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date();
    var secondDate = new Date();

    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay))) > 1;
}