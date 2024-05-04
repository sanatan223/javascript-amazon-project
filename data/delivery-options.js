import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOption = [{
    id: 1,
    deliveryDays: 8,
    priceCents: 0

},{
    id: 2,
    deliveryDays: 2,
    priceCents: 499

},{
    id: 3,
    deliveryDays: 0,
    priceCents: 999

}]

export function calculateDeliveryDate(item){
    let selectedOption = '';
    deliveryOption.forEach((option) => {
      if (option.id === item.deliveryOptionId){
        selectedOption = option
      }
    })
    return  dayjs().add(selectedOption.deliveryDays, 'day').format('dddd, MMMM DD');
}