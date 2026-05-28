const favBtn = document.querySelectorAll('.favorite');

if(favBtn.length > 0) {

favBtn.forEach(button => {
    button.addEventListener('click', function () {
        const productId = this.getAttribute('data-id');

        const icon = this.querySelector('i');

        icon.classList.toggle('fa-regular');
        icon.classList.toggle('fa-solid');

        const isFavorite = icon.classList.contains('fa-solid');
        const action = isFavorite ? 'add' : 'remove';

        fetch('/favorites', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify({
                productId: productId, 
                action: action
            })
        });
    });
});
}