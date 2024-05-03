import {cart, removeFromCart, updateCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/productCart.js";
import {products} from "../../data/products.js";
import {deliveryOption} from "../../data/delivery-options.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatPricing } from "../../data/utills/pricing.js";
import { renderPaymentSummery } from "./paymentSummery.js";

export function renderWebsite(){

  let checkOutHtml = '';
  cart.forEach((item) => {
    let matchItem;
    products.forEach((product) => {
      if (product.id === item.id){
        matchItem = product;
      }
    })
    
    let selectedOption = '';
    deliveryOption.forEach((option) => {
      if (option.id === item.deliveryOptionId){
        selectedOption = option
      }
    })
    const selectedOptionDate = dayjs().add(selectedOption.deliveryDays, 'day').format('dddd, MMMM DD')
    
    checkOutHtml += `
    <div class="cart-item-container js-delete-item${matchItem.id}">
      <div class="delivery-date">
        Delivery date: ${selectedOptionDate}
      </div>
  
      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchItem.image}">
  
        <div class="cart-item-details">
          <div class="product-name">
            ${matchItem.name}
          </div>
          <div class="product-price">
            $${formatPricing(matchItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label${matchItem.id}">1</span>
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
          ${deliveryOptions(matchItem, item)}
        </div>
      </div>
    </div>`;
    document.querySelector('.js-cart-items').innerHTML = checkOutHtml;
  })
  function deliveryOptions(matchItem, item){
    const today = dayjs()
    let optionsHtml = '';
    deliveryOption.forEach((option) => {
      const deliveryDate = today.add(option.deliveryDays, 'day').format('dddd, MMMM DD')
      const isChecked = option.id === item.deliveryOptionId;
      optionsHtml += `
      <div class="delivery-option js-delivery-dates"
      data-product-id=${matchItem.id}
      data-delivery-option-id=${option.id}>
        <input type="radio" 
        ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${matchItem.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            ${shippingPrice(option)} Shipping
          </div>
        </div>
      </div>`
    })
    return optionsHtml;
  }
  
  function shippingPrice(option){
    const phrase = option.priceCents === 0
    ?"Free"
    :formatPricing(option.priceCents)
  
    return phrase
  }
  
  const deleteButton = document.querySelectorAll('.js-delete-button');
  deleteButton.forEach((button) => {
     let itemId = '';
    button.addEventListener('click', () => {
      itemId = button.dataset.deleteButtonId;
      removeFromCart(itemId);
      document.querySelector(`.js-delete-item${itemId}`).remove();
      renderPaymentSummery();

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
  
  document.querySelectorAll('.js-delivery-dates')
  .forEach((option) => {
    option.addEventListener('click', () => {
      const {productId, deliveryOptionId} = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderWebsite();
      renderPaymentSummery();
    })
  })
}

renderWebsite();