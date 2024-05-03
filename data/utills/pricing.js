export function formatPricing(priceCents){
    let price = (Math.round(priceCents)/100).toFixed(2)

    return price;
}