import { cart, updateCartQuantity } from "../../data/productCart.js";
import { products } from "../../data/products.js";
import { deliveryOption } from "../../data/delivery-options.js";
import { formatPricing } from "../../data/utills/pricing.js";

export function renderPaymentSummery(){
    let matchItem;
    let items = 0;
    let itemPriceCents = 0;
    let itemsCost = 0;
    let shippingCostCents = 0;
    let totalBeforeTax = 0;
    let tax = 0;
    cart.forEach((item) => {
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
        items = item.quantity;
        itemPriceCents = matchItem.priceCents;
        itemsCost += items*itemPriceCents;
        shippingCostCents += selectedOption.priceCents;
    })
    totalBeforeTax += itemsCost + shippingCostCents;
    tax = totalBeforeTax /10
    let orderTotal = totalBeforeTax + tax;

    let summeryHtml =`
    <div class="payment-summary-title">
    Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (${updateCartQuantity()}):</div>
        <div class="payment-summary-money">$${formatPricing(itemsCost)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatPricing(shippingCostCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatPricing(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatPricing(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatPricing(orderTotal)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>`

    document.querySelector('.js-payment-summary')
    .innerHTML = summeryHtml;
}