export const cart = JSON.parse(localStorage.getItem('cart')) || [{
}];

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(itemId){
    let repeat;
    cart.forEach((item) => {
        if (item.id === itemId) {
            repeat = item;
        }
    })
    const displayAdded = document.querySelector(`.js-added-massage${itemId}`)
    displayAdded.classList.add('added-to-cart-display');
    let timeOutId;
    if (timeOutId){
        clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(( ) => {
        displayAdded.classList.remove('added-to-cart-display')
    }, 2000);
    const quantitySelector = Number(document.querySelector(`.js-quantity-selector-${itemId}`).value)
    if (repeat) {
        repeat.quantity += quantitySelector;
    } else {
        cart.push({
            id: itemId,
            quantity: quantitySelector
        })
    }

    saveToStorage();
    location.reload();
}

export function removeFromCart(itemId){
    cart.forEach((item, i) => {
        if (item.id === itemId){
            cart.splice(i, 1);
        } 
    })
    saveToStorage();
    location.reload();
}

export function updateCartQuantity(){
    let itemInCart = 0;
    cart.forEach((item) => {
    itemInCart += item.quantity;
    })
    return itemInCart;
}

export function updateQuantity(productId, newQuantity) {
    cart.forEach((item) => {
        if (item.id = productId){
            item.quantity = newQuantity
        }
    })
    saveToStorage();
}