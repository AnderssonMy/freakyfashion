const track = document.getElementById('carouselRow');
const nextBtn = document.getElementById('rightScroll');
const prevBtn = document.getElementById('leftScroll');

let currentIndex = 0;
const cardsVisible = 3;
const allCards = document.querySelectorAll('.carousel-row .card');
const totalCards = allCards.length;
const maxIndex = totalCards - cardsVisible;

function updateCarousel() {
    const percentage = currentIndex * (100/ cardsVisible);
    track.style.transform = `translateX(-${percentage}%)`;
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = maxIndex;
    }
    updateCarousel();
});