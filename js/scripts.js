const addToCartButtons = document.getElementsByClassName("addToCartButton")
const decrementButtons = document.getElementsByClassName("decrement")
const incrementButtons = document.getElementsByClassName("increment")


for(let i=0;i<addToCartButtons.length;i++){
    addToCartButtons[i].addEventListener("click",()=>{
        addToCartButtons[i].classList.add("clicked")
        // addToCartButtons[i].innerHTML =
    })
}