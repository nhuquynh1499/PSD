function setBackgroundHeader() {
    const header = document.querySelector('.header');
    const containerHeader = document.querySelector('#container-header');

    if (header) {
        if (window.pageYOffset > 0 ) { 
            containerHeader.style.padding = "15px 0px"
            header.style.backgroundColor = "white";
        } else {     
            containerHeader.style.padding = "40px 0px"
            header.style.backgroundColor = "transparent";
        }
    }
}

window.addEventListener("scroll", setBackgroundHeader);

const iconMenu = document.querySelector('.header__iconMenu');
const menu = document.querySelector('.header__smallMenu'); 
const iconCloseMenu = document.querySelector('.header__iconMenu-close');

if (iconMenu) {
    iconMenu.addEventListener('click', function() {
        iconCloseMenu.classList.toggle('open');
        menu.classList.toggle('open');
    })

    iconCloseMenu.addEventListener('click', function() {
        iconCloseMenu.classList.toggle('open');
        menu.classList.toggle('open');
    })
}

const listSlide = document.querySelector(".event__slideshow-listImage");
const slideItemElement = document.querySelectorAll(".event__slideshow-listImage-item");

const listDot = document.querySelector(".event__slideshow-slider");
const dotItemElement = document.querySelectorAll(".event__slideshow-slider-item");


var indexSelect = 1;
var lengthElement = slideItemElement.length;

if (listSlide) {
    listSlide.addEventListener("click", function(event) {
        if (event.target.id) {
            indexSelect = parseInt(event.target.id)
            swapSlide(indexSelect);
        }
    })

    setInterval(function() {
        swapSlide(indexSelect++)
        if (indexSelect >= lengthElement) {
            indexSelect = 0;
        }
    }, 5000)
}

if (listDot) {
    listDot.addEventListener("click", function(event) {
        if (event.target.id) {
            indexSelect = parseInt(event.target.id)
            swapSlide(indexSelect)
        }
    })
}

function swapSlide(indexSelect) {
    const centerIndex = indexSelect >= lengthElement ? ((indexSelect - lengthElement) % lengthElement) : indexSelect;
    const rightIndex = centerIndex + 1 >= lengthElement ? 0 : centerIndex + 1;
    const leftIndex = centerIndex - 1 < 0 ? lengthElement - 1 : centerIndex - 1; 

    slideItemElement[centerIndex].classList.remove("left");
    slideItemElement[centerIndex].classList.remove("right");
    slideItemElement[centerIndex].classList.add("center");

    slideItemElement[leftIndex].classList.remove("center");
    slideItemElement[leftIndex].classList.remove("right");
    slideItemElement[leftIndex].classList.add("left");

    slideItemElement[rightIndex].classList.remove("left");
    slideItemElement[rightIndex].classList.remove("center");
    slideItemElement[rightIndex].classList.add("right");

    dotItemElement[centerIndex].classList.add("active");
    dotItemElement[rightIndex].classList.remove("active");
    dotItemElement[leftIndex].classList.remove("active");
}

