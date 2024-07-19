const addToCartButtons = document.getElementsByClassName("addToCartButton")
const decrementButtons = document.getElementsByClassName("decrement")
const amountOfItems = document.getElementsByClassName("amount")
const incrementButtons = document.getElementsByClassName("increment")
const totalAmount = document.getElementsByClassName("totalAmount")[0]
const totalAmountNumber = document.getElementsByClassName("totalNumber")[0]
const yourCartElement = document.getElementsByClassName("cart")[0]

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data[0].name);

    const item1Name = data[0].name
    const item2Name = data[1].name
    const item3Name = data[2].name
    const item4Name = data[3].name
    const item5Name = data[4].name
    const item6Name = data[5].name
    const item7Name = data[6].name
    const item8Name = data[7].name
    const item9Name = data[8].name

    const item1Price = data[0].price
    const item2Price = data[1].price
    const item3Price = data[2].price
    const item4Price = data[3].price
    const item5Price = data[4].price
    const item6Price = data[5].price
    const item7Price = data[6].price
    const item8Price = data[7].price
    const item9Price = data[8].price
  })
  .catch(error => console.error('Error al cargar el JSON:', error));


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