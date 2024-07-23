const productElements = document.getElementsByClassName("product")
const addToCartButtons = document.getElementsByClassName("addToCartButton")
const decrementButtons = document.getElementsByClassName("decrement")
const amountOfItems = document.getElementsByClassName("amount")
const incrementButtons = document.getElementsByClassName("increment")
const totalAmountNumber = document.getElementsByClassName("totalNumber")[0]
const yourCartElement = document.getElementsByClassName("cart")[0]
const productListElement = document.getElementsByClassName("productsAdded")[0]
const totalPriceElement = [...document.getElementsByClassName("totalPrice")]
const confirmButton = document.getElementsByClassName("confirm")[0]
const toggleMessage = document.getElementsByClassName("filter")[0]
const confirmationList = document.getElementsByTagName("ul")[1]
const finalMessage = document.getElementsByClassName("confirmed")[0]
const reOrderButton = document.getElementsByClassName("repeat")[0]

let quantities = Array(addToCartButtons.length).fill(0)
let totalPrices = Array(addToCartButtons.length).fill(0)

const createProductItem = (name, price, quantity) => `
<div>
    <h4>${name}</h4>
    <div class="price">
        <p><b>${quantity}x</b> <span class="unitPrice">@$${price}</span> <b class="unitsPriceSum">$${(price * quantity).toFixed(2)}</b></p>
    </div>
</div>
<button type="button" class="removeProduct">
    <img src="./assets/images/icon-remove-item.svg" alt="remove">
</button>
`

const itemNames = []
const itemPrices = []
const thumbnails = []

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach((item, index) => {
      itemNames[index] = item.name
      itemPrices[index] = item.price
      thumbnails[index] = item.image.thumbnail
    })
  })
  .catch(error => console.error('Error al cargar el JSON:', error))
  
function totalItemsOnCart() {
  return quantities.reduce((acc, cur) => acc + cur, 0)
}

function totalPrice() {
  return quantities.reduce((acc, quantity, i) => acc + (quantity * itemPrices[i]), 0)
}

function updateCart() {
  totalAmountNumber.innerHTML = totalItemsOnCart()
  totalPriceElement.forEach(priceElement =>{
    priceElement.innerHTML = `$${totalPrice().toFixed(2)}`
  })
  
  if (totalItemsOnCart() === 0) {
    yourCartElement.classList.add("notfilledCart")
    yourCartElement.classList.remove("filledCart")
  } else {
    yourCartElement.classList.remove("notfilledCart")
    yourCartElement.classList.add("filledCart")
  }
}

const createConfirmationList = (name, price, quantity, thumbnail) => `
  <picture>
    <img src="${thumbnail}" alt="${(thumbnail.split("").splice(22,(thumbnail.length - 26))).join("")}">
  </picture>
  <div>
    <h4>${name}</h4>
    <p>${quantity}x <span>@$${price}</span></p>
  </div>
  <p>$${price * quantity}</p>
`
let confirmationItemElements = Array(addToCartButtons.length).fill(null)
for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", () => {
    quantities[i]++
    amountOfItems[i].innerHTML = quantities[i]
    addToCartButtons[i].classList.add("clicked")
    const itemElement = productListElement.querySelector(`[data-index="${i}"]`)
    if (!itemElement) {
      const newItemAdded = document.createElement("li")
      newItemAdded.classList.add("productAdded")
      newItemAdded.dataset.index = i
      newItemAdded.innerHTML = createProductItem(itemNames[i], itemPrices[i], quantities[i])
      productListElement.appendChild(newItemAdded)
    } else {
      itemElement.innerHTML = createProductItem(itemNames[i], itemPrices[i], quantities[i])
    }
    updateCart()
    updateRemoveButtons()

    const confirmationItemsDisplay = document.createElement("li")
    confirmationItemElements[i] = confirmationItemsDisplay
  })
  
  decrementButtons[i].addEventListener("click", () => {
    if (quantities[i] > 0) {
      quantities[i]--
      amountOfItems[i].innerHTML = quantities[i]
      const itemElement = productListElement.querySelector(`[data-index="${i}"]`)
      if (quantities[i] === 0 && itemElement) {
        itemElement.remove()
      } else {
        itemElement.innerHTML = createProductItem(itemNames[i], itemPrices[i], quantities[i])
      }
      if(quantities[i] < 1){
        addToCartButtons[i].classList.remove("clicked")
      }
      updateCart()
    }
  })
  
  incrementButtons[i].addEventListener("click", () => {
    quantities[i]++
    amountOfItems[i].innerHTML = quantities[i]
    const itemElement = productListElement.querySelector(`[data-index="${i}"]`)
    itemElement.innerHTML = createProductItem(itemNames[i], itemPrices[i], quantities[i])
    updateCart()
  })
  confirmButton.addEventListener("click", ()=>{
    toggleMessage.classList.add("confirmed")
    confirmationItemElements[i].innerHTML = createConfirmationList(itemNames[i], itemPrices[i], quantities[i], thumbnails[i])
    itemQuantitiesResult = Array(addToCartButtons.length).fill(0)
    confirmationList.appendChild(confirmationItemElements[i])
    console.log(confirmationItemElements[i])
  })
}

function updateRemoveButtons() {
  const removeButtons = document.querySelectorAll('.removeProduct')
  removeButtons.forEach(button => {
    button.replaceWith(button.cloneNode(true))
  })
  
  let allButtons = Array(addToCartButtons.length).fill(0)
  for (let i = 0; i<allButtons.length; i++){
    const productToRemove = document.querySelector(`.productAdded[data-index="${i}"]`)
    allButtons[i] = productToRemove
    if(allButtons[i] !== null){
      const indexToRemove = allButtons[i].dataset.index
      allButtons[i].addEventListener("click", ()=>{
        productToRemove.remove()
        quantities[i] = 0
        addToCartButtons[i].classList.remove("clicked")
        amountOfItems[i].innerHTML = 0
        totalItemsOnCart()
        totalPrice()
        updateCart()
      })
    }
  }
}

reOrderButton.addEventListener("click", ()=>{
  location.reload()
})