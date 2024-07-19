const addToCartButtons = document.getElementsByClassName("addToCartButton")
const decrementButtons = document.getElementsByClassName("decrement")
const amountOfItems = document.getElementsByClassName("amount")
const incrementButtons = document.getElementsByClassName("increment")
const totalAmount = document.getElementsByClassName("totalAmount")[0]
const totalAmountNumber = document.getElementsByClassName("totalNumber")[0]
const yourCartElement = document.getElementsByClassName("cart")[0]

let totalAmountOfDesserts = 0

for(let i=0;i<addToCartButtons.length;i++){
    addToCartButtons[i].addEventListener("click",()=>{
        addToCartButtons[i].classList.add("clicked")
        yourCartElement.classList.remove("notfilledCart")
         yourCartElement.classList.add("filledCart")
        amountOfItems[i].innerHTML = 1
        totalAmountOfDesserts = parseInt(totalAmountNumber.innerHTML) + 1
        totalAmountNumber.innerHTML = totalAmountOfDesserts
    })
     decrementButtons[i].addEventListener("click",()=>{
         amountOfItems[i].innerHTML = parseInt(amountOfItems[i].innerHTML) - 1
         totalAmountOfDesserts += -1
         if(amountOfItems[i].innerHTML <= 0){
             addToCartButtons[i].classList.remove("clicked")
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