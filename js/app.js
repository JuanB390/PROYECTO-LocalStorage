 // Variables 

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


 // Event  Listeners
 eventListeners();

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit' , agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    })
}





 // Funciones

 function agregarTweet(e) {
     e.preventDefault();

    
 

 // Textarea donde el usuario escribe
 const tweet = document.querySelector('#tweet').value;

 

 // Validacion

 if(tweet === ''){
    mostrarError('No puede ir vacio');

    return; // Evita que se ejecuten más lineas de código
 }

 const tweetObj = {
    id: Date.now(),
    tweet
 }

 // AAñadir al arreglo de tweets

        tweets = [...tweets, tweetObj];

//  Una vez aregado agregamos en el HTML
     crearHTML();

// Reiniciar el formulario 

    formulario.reset();                    

 }



 

//Mostrar mensaje de error
function mostrarError (error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');


// Insertando en el contenido

const contenido = document.querySelector('#contenido');
contenido.appendChild(mensajeError);

setTimeout(()=> {
    mensajeError.remove();
}, 3000);

}

// Muestra un listado de los tweets
function crearHTML(){


    //Limpiar el HTML
        limpiarHTML();


    if(tweets.length > 0){
        tweets.forEach( tweet => {
            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';


            //Añadir la funcion de eliminar

            btnEliminar.onclick = ()=>{
                borrarTweet(tweet.id);
            }
           
            // Crear el HTML
            const li = document.createElement('li');

             //añadir el texto

             li.innerText = tweet.tweet;

             // Asigna el botón

             li.appendChild(btnEliminar);

             // Insertarlo en el HTML
             listaTweets.appendChild(li);
        })
    }


    sincronizarStorage();
}
//Agrega los tweets actuales al Localstorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Eliminar un tweet
    // .filter te crea un nuevo array con los resultados filtrados
function borrarTweet (id) {tweets = tweets.filter(tweet => tweet.id != id);
crearHTML();
}

//Limpiar el HTML

function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}