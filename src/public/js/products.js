let btns = document.getElementsByClassName("btn");


function addToCart(productId) {
    fetch(`http://localhost:8080/api/carts/:${productId}`)
};


for(let i = 0; i < btns.length; i++){
    btns[i].addEventListener("click", function() {
        let productId = this.getAttribute("data-product-id");
        addToCart(productId);
    }); 
}