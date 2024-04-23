const productGrid = document.querySelector('.js-product-grid')
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
        $${(product.priceCent/100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
        <select>
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

        <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-button" data-item-name="${product.name}">
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
            if (item.name === Button.dataset.itemName) {
                repeat = item;
            }
        })
        if (repeat) {
            repeat.quantity += 1;
        } else {
            cart.push({
                name: Button.dataset.itemName,
                quantity: 1
            })
        }
})})