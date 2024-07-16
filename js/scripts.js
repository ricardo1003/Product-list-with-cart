const addToCartButtons = document.getElementsByClassName("addToCartButton")
const decrementButtons = document.getElementsByClassName("decrement")
const amountOfItems = document.getElementsByClassName("amount")
const incrementButtons = document.getElementsByClassName("increment")


for(let i=0;i<addToCartButtons.length;i++){
    addToCartButtons[i].addEventListener("click",()=>{
        addToCartButtons[i].classList.add("clicked")
        amountOfItems[i].innerHTML = 1
    })
    decrementButtons[i].addEventListener("click",()=>{
        amountOfItems[i].innerHTML = parseInt(amountOfItems[i].innerHTML) - 1
        if(amountOfItems[i].innerHTML <= 0){
            addToCartButtons[i].classList.remove("clicked")
        }
    })
    incrementButtons[i].addEventListener("click",()=>{
        amountOfItems[i].innerHTML = parseInt(amountOfItems[i].innerHTML) + 1
    })
}