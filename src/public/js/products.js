let btns = document.getElementsByClassName("btn");


async function addToCart() {
    try {
        let result = await fetch("http://localhost:8080/api/carts")
        console.log("Sucess", result)
    }
    catch (error) {
        console.log(error.message)
    }
};



Array.from(btns).forEach(btn => {
    btn.addEventListener("click", function() {
        addToCart()
    })
});