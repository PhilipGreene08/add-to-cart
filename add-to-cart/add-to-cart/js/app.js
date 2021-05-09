//const cart = document.getElementById('#cart-info')
(function () {
    const cartInfo = document.querySelector('.cart-info')
    const cart = document.querySelector('#cart')
    cartInfo.addEventListener('click', e => {
        cart.classList.toggle('show-cart')
    })
})();


(function () {
    const cartBtn = document.querySelectorAll('.store-item-icon')
    console.log(cartBtn);
    cartBtn.forEach(btn => {
        btn.addEventListener('click', e => {
            if (e.target.parentElement.classList.contains('store-item-icon')) {
                // console.log(e.target.parentElement) //gets shopping cart
                // console.log(e.target.parentElement.previousElementSibling) // gets the photo container
                // console.log(e.target.parentElement.previousElementSibling.src); //get the actual photo
                let picture = e.target.parentElement.previousElementSibling.src
                // console.log(picture.indexOf('img')); //returns 34 - we want it to return 37 to get "sweets-1.jpg"
                let position = picture.indexOf('img') + 3 //adding 3 to the 34 gets us where we want to be - to grab the photo itself
                let photoPath = picture.slice(position) //taking 34

                const item = {}
                item.img = `img-cart${photoPath}`
                let name = e.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent
                item.name = name
                let price = e.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent
                let formattedPrice = price.slice(1).trim()
                item.price = formattedPrice

                const cartItem = document.createElement('div');

                cartItem.classList.add('cart-item', 'd-flix', 'justify-content-between', 'text-capitalize', 'my-3');

                cartItem.innerHTML = `<div class="cart-item d-flex justify-content-between text-capitalize my-3"><img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                              <div class="item-text"><p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p><span>$</span>
                                <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span></div><a href="#" id='cart-item-remove' class="cart-item-remove"><i class="fas fa-trash"></i></a></div>`;

                const cart = document.getElementById('cart')
                const cartTotal = document.querySelector('.cart-total-container')
                cart.insertBefore(cartItem, cartTotal)

                alert('item added to the cart')

                showTotals();
                //contoller()
            }
        })
    })


})();

(function () {
    const cart = document.getElementById('cart')
    //const trashIcon = document.querySelectorAll('.fa-trash')
    let items = document.querySelectorAll('.cart-item')
    cart.addEventListener('click', e => {
        if (e.target.classList.contains(`fa-trash`)) {
            console.log(e.target.parentElement.parentElement);
            e.target.parentElement.parentElement.remove();
            
        }

        if (e.target.id === `clear-cart`) {
            items.forEach(item => {
                item.remove()
            })
            document.getElementById('cart-total').textContent = `0`
            document.querySelector('.item-total').textContent = `0`
            document.getElementById('item-count').textContent = 0
        }
    })
    showTotals()

    //console.log(cart);
})()

function showTotals() {
    const totals = []
    const items = document.querySelectorAll('.cart-item-price');
    items.forEach(item => {
        totals.push(+item.textContent)
    })

    const totalDue = totals.reduce((finalTotal, item) => {
        finalTotal += item
        return finalTotal
    })

    const finalDue = totalDue.toFixed(2)

    document.getElementById('cart-total').textContent = finalDue
    document.querySelector('.item-total').textContent = finalDue
    document.getElementById('item-count').textContent = totals.length
}
