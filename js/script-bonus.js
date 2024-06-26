// Milestone 0:
// Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.

// Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.

// Al click dell'utente sulle frecce verso alto o basso, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.

// Milestone 2:
// Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso l'alto, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso il basso.

const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

// Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.

// Andiamo a popolare il lato destro della thumbnail inserendo le immagini all'interno del DOM

let defaultImageActive = 0;

const thumbnailSideContainer = document.querySelector('.right-images-container');
const imageCurrent = document.querySelector('.left-image-container')
const miniatureContainer = document.querySelector('.miniature-container')

// Usiamo il ForEach per richiamare i singoli oggetti all'interno dell'Array
images.forEach((element) => {

    // IMMAGINE SELEZIONATA GRANDE
    // Creiamo la variabile per creare la parte di html che andremo ad appendere nel DOM usando i literal template
    let selectImage = `
    <div class="image">
        <img src="./${element.image}" alt="">
        <div class="text-movie-container">
            <h3>
                ${element.title}
            </h3>
            <p>
                ${element.text}
            </p>
        </div>
    </div>
    `
    // Andiamo ad appendere nel DOM la parte di HTML appena creata
    imageCurrent.innerHTML += selectImage

    // THUMBNAIL A DESTRA
    // Creiamo la variabile per creare la parte di html che andremo ad appendere nel DOM usando i literal template questa volta per la parte destra delle thumbnail
    let thumbnailImages = `
    <div class="thumbnail-image">
        <img src="./${element.image}" alt="">
    </div>
    `

    // Andiamo ad appendere nel DOM la parte di HTML appena creata
    thumbnailSideContainer.innerHTML += thumbnailImages

    // MINIATURE IN BASSO
    // Dichiariamo la variabile con dentro il pezzo di html che poi andrà appeso
    let miniatureInDom = `
    <div class="miniature">
        <img class="miniature-image" src="./${element.image}" alt="">
    </div>
    `
    // Appendiamo nel container giusto il nostro blocco 
    miniatureContainer.innerHTML += miniatureInDom

});

// Vogliamo che di default sia la prima immagine ad essere attiva
// Impostiamo di default la classe "active" per mostrarla al caricamento

const selectImage = document.querySelectorAll('.image'); // Si comporta come un array
selectImage[defaultImageActive].classList.add('active');

const selectThumbnail = document.querySelectorAll('.thumbnail-image');
selectThumbnail[defaultImageActive].classList.add('active')

const notActivetedMiniatureSelected = document.querySelectorAll('.miniature')
notActivetedMiniatureSelected[defaultImageActive].classList.add('active')


// Chiamiamo il tag della freccia verso il basso
const arrowNext = document.querySelector('.arrow-down');

// Ad ogni click vogliamo che la classe active venga rimossa dall'immagine di default e inserita al successivo, considerando che la variabile defaultImageActive si occupa di modificare l'indice, dunque bisogna incrementarlo ad ogni click
arrowNext.addEventListener('click', function() {
    // Andiamo a selezionare l'elemento HTML che in quel momento ha entrambe le classi ed è quindi specifica l'elemento attivo in quel momento
    removeElements ('.image.active', '.thumbnail-image.active', '.miniature.active')

    // Incrementiamo l'indice che abbiamo dichiarato fuori

    // Milestone 2:
    // Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso l'alto, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso il basso.

    if (defaultImageActive < selectImage.length - 1) {
        defaultImageActive++
    } else {
        defaultImageActive = 0
    }

    activetedElements (selectImage, selectThumbnail, notActivetedMiniatureSelected)
});


// Chiamiamo il tag della freccia verso l'alto
const arrowPrevious = document.querySelector('.arrow-up')

arrowPrevious.addEventListener('click', function() {

    removeElements ('.image.active', '.thumbnail-image.active', '.miniature.active')

    // Decrementiamo il numero dell'indice

    if (defaultImageActive > 0) {
        defaultImageActive--
    } else {
        defaultImageActive = selectImage.length -1
    }
    
    activetedElements (selectImage, selectThumbnail, notActivetedMiniatureSelected)

})

// BONUS 1: Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.

notActivetedMiniatureSelected.forEach((element, index) => {
    if (element.classList.contains('miniature')) {
        element.addEventListener('click', function() {

            removeElements ('.image.active', '.thumbnail-image.active', '.miniature.active')
            
            defaultImageActive = index;

            activetedElements (selectImage, selectThumbnail, notActivetedMiniatureSelected)

        })
    }
});

// BONUS 2: Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

// BONUS 3: Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
const startAutoplay = document.querySelector('.start-autoplay');
const stopAutoplay = document.querySelector('.stop-autoplay');

let autoplayCarousel;

startAutoplay.addEventListener('click', function() {
    this.classList.add('button-clicked')
    stopAutoplay.classList.remove('button-clicked')

    autoplayCarousel = setInterval(function() {

        removeElements ('.image.active', '.thumbnail-image.active', '.miniature.active')

        if (defaultImageActive < selectImage.length - 1) {
            defaultImageActive++
        } else {
            defaultImageActive = 0
        }

        activetedElements (selectImage, selectThumbnail, notActivetedMiniatureSelected)

    }, 2000)
});

stopAutoplay.addEventListener('click', function() {
    this.classList.add('button-clicked')
    startAutoplay.classList.remove('button-clicked')
    clearInterval (autoplayCarousel);
});


// FUNCTIONS
// Funzione per rimuovere la classe "active" da ogni singolo elemento

function removeElements (image, thumbnail, miniature) {
    document.querySelector(image).classList.remove('active'); 
    document.querySelector(thumbnail).classList.remove('active')
    document.querySelector(miniature).classList.remove('active')
}

// Funzione per aggiungere la classe "active" ad ogni singolo elemento
function activetedElements (image, thumbnail, miniature) {
    image[defaultImageActive].classList.add('active');
    thumbnail[defaultImageActive].classList.add('active')
    miniature[defaultImageActive].classList.add('active')
}