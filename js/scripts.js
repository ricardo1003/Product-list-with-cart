const productElements = document.getElementsByClassName("product")
const addToCartButtons = document.getElementsByClassName("addToCartButton")
const decrementButtons = document.getElementsByClassName("decrement")
const amountOfItems = document.getElementsByClassName("amount")
const incrementButtons = document.getElementsByClassName("increment")
const totalAmountNumber = document.getElementsByClassName("totalNumber")[0]
const yourCartElement = document.getElementsByClassName("cart")[0]
const productListElement = document.getElementsByClassName("productsAdded")[0]
const totalPriceElement = document.getElementsByClassName("totalPrice")[0]


let OrderTotal = 0
const createProductItem = (name, price, quantity) => `
<div>
    <h4>${name}</h4>
    <div class="price">
        <p><b>${quantity}x</b> <span class="unitPrice">@$${price}</span> <b class="unitsPriceSum">$${(price * quantity).toFixed(2)}</b></p>
    </div>
</div>
<div class="removeProduct">
    <img src="./assets/images/icon-remove-item.svg" alt="remove">
</div>
`;

const itemNames = [];
const itemPrices = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach((item, index) => {
      itemNames[index] = item.name;
      itemPrices[index] = item.price;
    });
  })
  .catch(error => console.error('Error al cargar el JSON:', error));

let totalAmountOfDesserts = 0;
const indexOfItem = [];
const quantities = Array(addToCartButtons.length).fill(0);

for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", () => {
    if (quantities[i] === 0) {
      quantities[i] = 1;
      addToCartButtons[i].classList.add("clicked");
      const newItemAdded = document.createElement("li");
      newItemAdded.classList.add("productAdded");
      newItemAdded.dataset.index = i;
      newItemAdded.innerHTML = createProductItem(itemNames[i], itemPrices[i], quantities[i]);
      productListElement.appendChild(newItemAdded);
    } else {
      quantities[i]++;
      const itemElement = productListElement.querySelector(`[data-index="${i}"]`);
      itemElement.innerHTML = createProductItem(itemNames[i], itemPrices[i], quantities[i]);
    }

    totalAmountOfDesserts++;
    totalAmountNumber.innerHTML = totalAmountOfDesserts;
    yourCartElement.classList.remove("notfilledCart");
    yourCartElement.classList.add("filledCart");
    
    amountOfItems[i].innerHTML = 1
    const unitsPriceSum = [...document.getElementsByClassName("unitsPriceSum")]
    
    let parsedPrices = []
    unitsPriceSum.forEach(price =>{
        const Prices = price.innerHTML
        const split = Prices.split("")
        split.shift()
        const merge = split.join("")
        parsedPrices.push(parseFloat(merge))
    })
    totalPriceElement.innerHTML = `$${parsedPrices.reduce((acumulador, valorActual) => acumulador + parseFloat(valorActual), 0)}`
  });
  decrementButtons[i].addEventListener("click", () => {
    amountOfItems[i].innerHTML--
    if (quantities[i] > 0) {
        quantities[i]--;
        totalAmountOfDesserts--;
        const unitsPriceSum = [...document.getElementsByClassName("unitsPriceSum")]
        const unitPrice = [...document.getElementsByClassName("unitPrice")]
    
        let parsedPrices = []
        unitsPriceSum.forEach(price =>{
            const Prices = price.innerHTML
            const split = Prices.split("")
            split.shift()
            const merge = split.join("")
            parsedPrices.push(parseFloat(merge))
        })
        let parsedunitPrices = [Array(addToCartButtons.length).fill(0)]
        let unitIndex = 0
        unitPrice.forEach((unit, index) =>{
            const Prices = unit.innerHTML
            const split = Prices.split("")
            split.shift()
            split.shift()
            const merge = split.join("")
            parsedunitPrices[index] = (parseFloat(merge))
            unitIndex = index
        })
        console.log(parsedunitPrices)
        const totalSplitted = totalPriceElement.innerHTML.split("")
        totalSplitted.shift()
        const totalJoined = totalSplitted.join("")
        totalPriceElement.innerHTML = `$${totalJoined - parsedunitPrices[unitIndex]}`

        if (quantities[i] === 0) {
            addToCartButtons[i].classList.remove("clicked");
            const itemElement = productListElement.querySelector(`[data-index="${i}"]`);
            itemElement.remove();
        } else {
            const itemElement = productListElement.querySelector(`[data-index="${i}"]`);
        itemElement.innerHTML = createProductItem(itemNames[i], itemPrices[i], quantities[i]);
      }
      
      if (totalAmountOfDesserts === 0) {
          yourCartElement.classList.add("notfilledCart");
          yourCartElement.classList.remove("filledCart");
        }
      totalAmountNumber.innerHTML = totalAmountOfDesserts;
    }
});
  incrementButtons[i].addEventListener("click", () => {
      amountOfItems[i].innerHTML++
      quantities[i]++;
    totalAmountOfDesserts++;
    const itemElement = productListElement.querySelector(`[data-index="${i}"]`);
    itemElement.innerHTML = createProductItem(itemNames[i], itemPrices[i], quantities[i]);
    totalAmountNumber.innerHTML = totalAmountOfDesserts;
    yourCartElement.classList.remove("notfilledCart");
    yourCartElement.classList.add("filledCart");
    const unitsPriceSum = [...document.getElementsByClassName("unitsPriceSum")]
    
    let parsedPrices = []
    unitsPriceSum.forEach(price =>{
        const Prices = price.innerHTML
        const split = Prices.split("")
        split.shift()
        const merge = split.join("")
        parsedPrices.push(parseFloat(merge))
    })
    totalPriceElement.innerHTML = `$${parsedPrices.reduce((acumulador, valorActual) => acumulador + parseFloat(valorActual), 0)}`
  });
}