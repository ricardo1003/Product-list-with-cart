const productELements = document.getElementsByClassName("product")
const addToCartButtons = document.getElementsByClassName("addToCartButton")
const decrementButtons = document.getElementsByClassName("decrement")
const amountOfItems = document.getElementsByClassName("amount")
const incrementButtons = document.getElementsByClassName("increment")
const totalAmount = document.getElementsByClassName("totalAmount")[0]
const totalAmountNumber = document.getElementsByClassName("totalNumber")[0]
const yourCartElement = document.getElementsByClassName("cart")[0]
const productListElement = document.getElementsByClassName("productsAdded")[0]


let quantity = 1
const createProductItem = (name, price) => `
    <div>
        <h4>${name}</h4>
        <div>
        <p>${quantity}x</p>
        <p>@$${price} <b>$${price}</b></p>
        </div>
    </div>
    <div class="removeProduct">
        <img src="./assets/images/icon-remove-item.svg" alt="remove">
    </div>
`;


const itemNames = []
const itemPrices = []

fetch('data.json')
  .then(response => response.json())
  .then(data => {

    data.forEach((item, index) => {
        itemNames[index] = item.name
        itemPrices[index] = item.price
    });
  })
  .catch(error => console.error('Error al cargar el JSON:', error));


  let totalAmountOfDesserts = 0
  
const indexOfitem = []
for(let i=0;i<addToCartButtons.length;i++){
    addToCartButtons[i].addEventListener("click",()=>{
        addToCartButtons[i].classList.add("clicked")
        yourCartElement.classList.remove("notfilledCart")
         yourCartElement.classList.add("filledCart")
        amountOfItems[i].innerHTML = 1
        totalAmountOfDesserts = parseInt(totalAmountNumber.innerHTML) + 1
        totalAmountNumber.innerHTML = totalAmountOfDesserts

        const newItemAdded = document.createElement("li")

        newItemAdded.classList.add("productAdded")
        newItemAdded.classList.add (`itemAddedNo.${i}`)

        indexOfitem[i] = document.getElementsByClassName(`itemAddedNo.${i}`)

        newItemAdded.innerHTML = createProductItem(itemNames[i], itemPrices[i])

        productListElement.appendChild(newItemAdded)
    })
     decrementButtons[i].addEventListener("click",()=>{
         amountOfItems[i].innerHTML = parseInt(amountOfItems[i].innerHTML) - 1
         totalAmountOfDesserts += -1
         if(amountOfItems[i].innerHTML <= 0){
            addToCartButtons[i].classList.remove("clicked")

            indexOfitem[i][0].remove()
         }
         if(totalAmountOfDesserts === 0){
             yourCartElement.classList.add("notfilledCart")
             yourCartElement.classList.remove("filledCart")

         }
         totalAmountNumber.innerHTML = totalAmountOfDesserts
     })
     incrementButtons[i].addEventListener("click",()=>{
         yourCartElement.classList.remove("notfilledCart")
         yourCartElement.classList.add("filledCart")

         amountOfItems[i].innerHTML = parseInt(amountOfItems[i].innerHTML) + 1
         totalAmountOfDesserts += 1
         totalAmountNumber.innerHTML = totalAmountOfDesserts

     })
}