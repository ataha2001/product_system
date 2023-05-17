let productName = document.getElementById('productName')
let category = document.getElementById('category')
let productQTY = document.getElementById('productQTY')
let productPrice = document.getElementById('productPrice')
let productView = document.getElementById('productsDetails')
let productsList = []
let saveButton = document.getElementById('buttonDiv')


function getProductData() {
    const product = {
        id: Math.ceil((Math.random() * 100 )-1).toString(),
        productName : productName.value,
        category : category.value,
        qty : productQTY.value,
        price: productPrice.value
    }
    productsList.push(product)
    displatData(product)
}

function displatData(product) {
    let myHtml = ""
    productsList.forEach(function (product) {
        myHtml += `   

            <tr ondblclick="showProductData(${product.id}, action='VIEW')" title="double click to show this row data">
                <th>${product.id}</th>
                <td>${product.productName}</td>
                <td>${product.category}</td>
                <td>${product.qty}</td>
                <td>${product.price} LE</td>
                <td>
                <div class="d-flex justify-content-between w-50">
                    <i class="fa-regular fa-eye view" onclick="showProductData(${product.id}, action='VIEW')" title="view this row data" style="color:blue;cursor: pointer; "></i>
                    <i class="fa-regular fa-pen-to-square update" onclick="showProductData(${product.id}, action='UPDATE')" title="update this row data" style="margin-left: 20px;color:green;cursor: pointer;"></i>
                    <i class="fa-solid fa-trash-can delete" onclick="showProductData(${product.id},action='DEL')" title="delete this row data" style="margin-left: 20px;color:red;cursor: pointer;"></i>
                </div>    
                </td>
            </tr>
        `
    })
    productView.innerHTML = myHtml
    clearFields()
}
function clearFields() {
    document.getElementById('productName').value =""
    document.getElementById('category').selectedIndex = 0
    document.getElementById('productQTY').value = 0
    document.getElementById('productPrice').value = 0
}
function colseModal() {
    let myModal = document.getElementById('exampleModal')
    let modal = bootstrap.Modal.getInstance(myModal)
    clearFields()
    modal.hide();
}
function deleteProduct(id) {
    let newList = productsList.filter(function (product) {
        return product.id != id
    })
    productsList= newList
    displatData()
}

function addNewProduct() {
    let myModal = document.getElementById('exampleModal')
    let modal = bootstrap.Modal.getInstance(myModal)
    let modalTitle = document.getElementById('modal-title')
    let saveBtn = document.getElementById('saveBtn')
    modalTitle.innerText = "Add New Product"

    saveButton.innerHTML = `
        <button  type="button" onclick="getProductData()" class="btn btn-outline-info" title="click to save data" data-bs-dismiss="modal" id="saveBtn">Save</button>
    `

    modal.show()
}
function showProductData(id,action) {
    clearFields()
    let myModal = document.getElementById('exampleModal')
    let modal = bootstrap.Modal.getInstance(myModal)
    let modalProductName = document.getElementById('productName')
    let modalProductCategory = document.getElementById('category')
    let modalProductQty = document.getElementById('productQTY')
    let modalProductPrice = document.getElementById('productPrice')
    let updatedList =[]
    updatedList = productsList.forEach(product => {
        if (product.id == id ){
            modalProductName.value = product.productName
            modalProductCategory.value = product.category
            modalProductQty.value = product.qty
            modalProductPrice.value = product.price
        }

    });
    
    let modalTitle = document.getElementById('modal-title')
    if (action == "UPDATE"){
        modalTitle.innerText = "Update Product"
    
        saveButton.innerHTML = `
            <button  type="button" onclick="updateProduct(${id})" class="btn btn-outline-success" title="click to save updates" data-bs-dismiss="modal" id="saveBtn">Update</button>
    `
    } else if(action == "DEL"){
        modalTitle.innerText = "Delete Product"
    
        saveButton.innerHTML = `
            <button  type="button" onclick="deleteProduct(${id})" class="btn btn-outline-danger" title="click to delete row" data-bs-dismiss="modal" id="saveBtn">Delete</button>
    `
    } else if (action == 'VIEW'){
        modalTitle.innerText = "View Product"
        saveButton.innerHTML=""
    }
    
    modal.show()

}

function updateProduct(id) {
    let updatedList =[]
    updatedList = productsList.forEach(product => {
        if (product.id == id){
            product.productName = productName.value
            product.category = category.value
            product.qty = productQTY.value
            product.price = productPrice.value
        }
        return updatedList
    });

    displatData(updatedList)
    
}