export const cart = JSON.parse(localStorage.getItem('cart')) || [{
    id: "96yd6z9g44vm5kt3q2svd53zb9p4lpnv",
    quantity: 1,
    deliveryOptionId: 1
  },{
    id: "A98DB973KWL8XP1LZ94KJF0BMA5PEZ8C",
    quantity: 1,
    deliveryOptionId: 2
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

export function updateDeliveryOption(productId, deliveryOptionId){
    let repeat;
    cart.forEach((item) => {
        if (item.id === productId) {
            repeat = item;
        }
    })

    repeat.deliveryOptionId = Number(deliveryOptionId);

    saveToStorage();
}

export function getItemDetails(){
    cart.forEach((item) => {
        let matchItem;
        products.forEach((product) => {
            if (product.id === item.id){
            matchItem = product;
            }
        })
    })
}