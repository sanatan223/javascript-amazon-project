import {cart, removeFromCart, updateCartQuantity, updateQuantity} from "../data/productCart.js";
import {products} from "../data/products.js";

let checkOutHtml = '';
console.log(cart)
cart.forEach((item) => {
    products.forEach((product) => {
      if (product.id === item.id){
        item = product;
      }
    })
    checkOutHtml += `
    <div class="cart-item-container js-delete-item${item.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${item.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${item.name}
                </div>
                <div class="product-price">
                  $${(item.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label${item.id}">1</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-update-link-id=${item.id}>
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input" type="text">
                  <span class="link-primary save-quantity-link js-save-button" data-save-item-id=${item.id}>
                  save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-button" data-delete-button-id=${item.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${item.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    document.querySelector('.js-cart-items').innerHTML = checkOutHtml;
})

const deleteButton = document.querySelectorAll('.js-delete-button');
deleteButton.forEach((button) => {
   let itemId = '';
  button.addEventListener('click', () => {
    itemId = button.dataset.deleteButtonId;
    removeFromCart(itemId);
    document.querySelector(`.js-delete-item${itemId}`).remove();
  })
}) 

document.querySelector('.js-cart-quantity').innerText = updateCartQuantity();

const updateButton = document.querySelectorAll('.js-update-link')
const cartItemContainer = document.querySelector('.cart-item-container');
updateButton.forEach((button) => {
  let itemId = button.dataset.updateLinkId;
  button.addEventListener('click', () => {
    cartItemContainer.classList.add("is-editing-quantity")
  })
})

const quantityInput = document.querySelector('.js-quantity-input')
const saveButton = document.querySelectorAll('.js-save-button');
saveButton.forEach((button) => {
  let itemId = button.dataset.saveItemId

  button.addEventListener('click', () => {
    console.log(event)
    let inputNum = Number(quantityInput.value);
    updateQuantity(itemId, inputNum);
    const quantityLabel = document.querySelector(`.js-quantity-label${itemId}`)
    if (0 <= inputNum && inputNum < 1000){
      quantityLabel.innerText = inputNum;
      document.querySelector('.js-cart-quantity').innerText = updateCartQuantity();
      cartItemContainer.classList.remove("is-editing-quantity")
    } else {
      quantityInput.classList.add("large-quantity")
    }
  })
})

document.querySelector('.js-cart-quantity').innerText = updateCartQuantity();