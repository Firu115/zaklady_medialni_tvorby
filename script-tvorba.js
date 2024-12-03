function moveImageRight() {
    if (currentImage === allImages.length - 1) {
        currentImage = 0;
    } else {
        currentImage++;
    }
    imgDisplay.src = allImages[currentImage];
    console.log("here");
}

function moveImageLeft() {
    if (currentImage === 0) {
        currentImage = allImages.length - 1;
    } else {
        currentImage--;
    }
    imgDisplay.src = allImages[currentImage];
    console.log("here");
}


const leftButton = document.querySelector('#left-button');
const rightButton = document.querySelector('#right-button');
const imgDisplay = document.querySelector('#img-zpracovani');
let currentImage = 0;

const allImages = ["assets/images_presentation/colorwheels-md.jpg",
    "assets/images_presentation/cut.jpg",
    "assets/images_presentation/images.jpg",
    "assets/images_presentation/syntex-blackmagic-design-davinci-resolve-17-main-04.jpg"
]


rightButton.addEventListener('click', moveImageRight)
leftButton.addEventListener('click', moveImageLeft)

