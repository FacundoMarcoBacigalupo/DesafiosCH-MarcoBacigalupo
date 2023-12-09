let btns = document.getElementsByClassName("btn");


async function addToCart(productId) {
    try {
        let createCart = await fetch(`http://localhost:8080/api/carts/${productId}`)
        console.log("Success", createCart)
    }
    catch (error) {
        console.log(error.message)
    }
};



Array.from(btns).forEach(btn => {
    btn.addEventListener("click", function() {
        let productId = this.getAttribute('data-product-id');
        addToCart(productId)
    })
});