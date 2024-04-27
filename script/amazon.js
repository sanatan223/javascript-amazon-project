import {products} from "../data/products.js";
import {cart, addToCart, updateCartQuantity} from "../data/productCart.js";
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
        let itemId = Button.dataset.itemId;
        addToCart(itemId);
    })
})
cartDisplay.innerText = updateCartQuantity();