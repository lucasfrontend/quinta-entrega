const socket = io()
const dataForm = document.querySelector('#formDelete')
const id = document.querySelector('#deleteProd')

dataForm.addEventListener('submit', evt => {
    evt.preventDefault()
    Swal.fire({
        title: 'Está seguro de que desea eliminar este producto?',
        text: 'Va a eliminar este producto.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar.'
    }).then((result) => {
        if (result.isConfirmed) {
            socket.emit('client:productDelete', {
                id: id.value
            })
            console.log(id.value)
        }
    })
})

socket.on('nuevaLista', data => {
    if(data.status === 'error'){
        Swal.fire({
            title: 'Product not Found',
            text: 'Ingrese otro id',
            icon: 'error'
        })
        return {status: 'error', mesage: 'Product not found'}
    }
    let list
    data.forEach(({id, title, price, code, stock, category, description, status, thumbnail}) => {
        list +=`
        <tr>
        <td>${id}</td>
        <td>${title}</td>
        <td>${price}</td>
        <td>${code}</td>
        <td>${stock}</td>
        <td>${category}</td>
        <td>${description}</td>
        <td>${status}</td>
        <td><img
            class="img"
            src="${thumbnail}"
            alt="img del producto"
            /></td>
        </tr>`
    })
    const listAct = `
            <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">code</th>
            <th scope="col">stock</th>
            <th scope="col">category</th>
            <th scope="col">description</th>
            <th scope="col">status</th>
            <th scope="col">thumbnail</th>
            </tr>` + list
    document.getElementById('tableProduct').innerHTML = listAct
    Swal.fire({
        title: 'Producto eliminado',
        timer: 5000,
        icon: 'success'
    })
})

const addForm = document.querySelector('#addProduct')
const product = document.querySelectorAll('input')
const title = document.getElementById('title')
const price = document.getElementById('price')
const code = document.getElementById('code')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const description = document.getElementById('description')
const status = document.getElementById('status')
const thumbnail = document.getElementById('thumbnail')

addForm.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('client:newProduct', {
        title: title.value,
        price: price.value,
        code:  code.value,
        stock: stock.value,
        category: category.value,
        description: description.value,
        status: status.value,
        thumbnail: thumbnail.value
    })
})

socket.on('server:productAdd', (newData) => {
    if(newData.status === 'error'){
        let errorMess = newData.message
        Swal.fire({
            title: 'Error adding product',
            text: newData.message,
            icon: 'error'
        })
        return {status: 'error', errorMess}
    }
    let list
    newData.forEach(({id, title, price, code, stock, category, description, status, thumbnail}) => {
        list +=`
        <tr>
        <td>${id}</td>
        <td>${title}</td>
        <td>${price}</td>
        <td>${code}</td>
        <td>${stock}</td>
        <td>${category}</td>
        <td>${description}</td>
        <td>${status}</td>
        <td><img
            class="img"
            src="${thumbnail}"
            alt="img del producto"
            /></td>
        </tr>`
    })
    const listAct = `
            <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">code</th>
            <th scope="col">stock</th>
            <th scope="col">category</th>
            <th scope="col">description</th>
            <th scope="col">status</th>
            <th scope="col">thumbnail</th>
            </tr>` + list
    document.getElementById('tableProduct').innerHTML = listAct
    Swal.fire({
        title: 'Producto agregado correctamente',
        timer: 5000,
        icon: 'success'
    })
})