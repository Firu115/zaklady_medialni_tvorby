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

const allImages = [
    "assets/images/image.png",
    "assets/images/image-1.png",
    "assets/images/image-2.png",
    "assets/images/image-sound.png",
]

// Add event listener for keyboard arrows
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        moveImageRight();
    } else if (event.key === 'ArrowLeft') {
        moveImageLeft();
    }
});

rightButton.addEventListener('click', moveImageRight)
leftButton.addEventListener('click', moveImageLeft)