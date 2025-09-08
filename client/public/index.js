const wrapper = document.querySelector(".wrapper"),
    carousel = document.querySelector(".carousel"),
    images = document.querySelectorAll("img"),
    buttons = document.querySelectorAll("i");

let imageIndex = 1,
    intervalId;

//function starts automatic  image slider
const autoSlide = () => {
    //starts the slideshow by calling slideImage every 2 seconds
    intervalId = setInterval(() => slideImage(imageIndex++), 3000);
};

//function displays the image
const slideImage = () => {
    //calculates the image index
    imageIndex =
        imageIndex === images.length
            ? 0
            : imageIndex < 0
            ? images.length - 1
            : imageIndex;
    //updates the carousel image to show specified image
    carousel.style.transform = `translate(-${imageIndex * 100}%)`;
};

//calls the autoSlide function
autoSlide();

wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
wrapper.addEventListener("mouseleave", autoSlide);

const updateClick = (e) => {
    //stop the automatic slideshow
    clearInterval(intervalId);
    //calculates the updated iamge index based on button clicked
    imageIndex += e.target.id === "next" ? 1 : -1;
    slideImage(imageIndex);

    //restarts automatic slider
    autoSlide();
};

buttons.forEach((button) => button.addEventListener("click", updateClick));
