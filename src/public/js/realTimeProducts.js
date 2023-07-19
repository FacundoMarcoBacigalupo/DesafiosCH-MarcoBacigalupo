const socketClient = io()

const div = document.getElementById("div")

socketClient.on("products", (data) =>{
    console.log(data.products)
    div.innerHTML = ""
    data.products.forEach(element => {
        div.innerHTML += `
        <p>${element.title}</p>
        <br>
        <p>${element.description}</p>
        <br>
        <p>${element.code}</p>
        <br>
        <p>$${element.price}</p>
        <br>
        <p>${element.stock}</p>
        <br>
        <p>${element.category}</p>
        <hr>
        `
    })
})


Swal.fire({
    title: 'New product',
    html: `
    <input type="text" id="title" class="swal2-input" placeholder="title">
    <input type="text" id="description" class="swal2-input" placeholder="description">
    <input type="number" id="code" class="swal2-input" placeholder="code">
    <input type="number" id="price" class="swal2-input" placeholder="price">
    <input type="number" id="stock" class="swal2-input" placeholder="stock">
    <input type="text" id="category" class="swal2-input" placeholder="category">
    `,
    confirmButtonText: 'send new product',
    allowOutsideClick: false,
    focusConfirm: false,
    preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title').value
        const description = Swal.getPopup().querySelector('#description').value
        const code = Swal.getPopup().querySelector('#code').value
        const price = Swal.getPopup().querySelector('#price').value
        const stock = Swal.getPopup().querySelector('#stock').value
        const category = Swal.getPopup().querySelector('#category').value

        if (!title || !description || !code || !price || !stock || !category) {
            Swal.showValidationMessage(`Complete all camps`)
        }
        return { title, description, code, price, stock, category }
        }
    })

.then((result) =>{
    socketClient.emit("newProduct", {result})
})