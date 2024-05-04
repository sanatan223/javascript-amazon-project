import { updateCartQuantity } from "../../data/productCart.js"

export function renderCheckoutHeader(){
    const headerPart = document.querySelector('.js-header')
    let headerHtml = `
    Checkout (<a class="return-to-home-link js-cart-quantity"
    href="amazon.html">${updateCartQuantity()}</a>)`

    headerPart.innerHTML = headerHtml;
}