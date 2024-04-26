import {products} from "../data/products.js";
import {cart} from "../data/productCart.js";
const productGrid = document.querySelector('.js-product-grid')
const cartDisplay = document.querySelector('.js-cart-quantity')
let productHTML = '';
products.forEach((product) => {
    productHTML += `
    <div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars*10}.png">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
        $${(product.priceCents/100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-massage${product.id}">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-button" data-item-id="${product.id}">
        Add to Cart
        </button>
    </div>
    `
})
productGrid.innerHTML = productHTML;
const addButton = document.querySelectorAll('.js-add-button');
addButton.forEach((Button) => {
    Button.addEventListener('click', () => {
        let repeat;
        cart.forEach((item) => {
            if (item.id === Button.dataset.itemId) {
                repeat = item;
            }
        })
        const displayAdded = document.querySelector(`.js-added-massage${Button.dataset.itemId}`)
        displayAdded.classList.add('added-to-cart-display');
        let timeOutId;
        if (timeOutId){
            clearTimeout(timeOutId);
        }
        timeOutId = setTimeout(( ) => {
            displayAdded.classList.remove('added-to-cart-display')
        }, 2000);
        const quantitySelector = Number(document.querySelector(`.js-quantity-selector-${Button.dataset.itemId}`).value)
        if (repeat) {
            repeat.quantity += quantitySelector;
        } else {
            cart.push({
                id: Button.dataset.itemId,
                quantity: quantitySelector
            })
        }
        let cartQuantity = 0;
        cart.forEach((item) => {
            cartQuantity += item.quantity;
        cartDisplay.innerText = cartQuantity;
        })
    })
})