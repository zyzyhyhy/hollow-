let cart = [];
let data;
const sendRequest = async (url) => {
    try {
        const res = await fetch(url)
        if (res.ok) {
            const data = await res.json()
            return data
        }
    } catch (error) {
        throw new Error(error)
    }
}


const createCol = (product) =>{
    const col = document.createElement('div');
        col.classList.add('col-lg-4');
        col.innerHTML = `
    <div class="card">
        <img src=${product.images[0]} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">price:${product.price}$</p>
            <button href="#" class="btn btn-primary" data-productid=${product.id}>Add To Cart</button>
        </div>
    </div>
    `
    return col;
}

const render = (data) => {

    const container = document.getElementById('products');
    data.map(product => {
        const col = createCol(product);
        container.appendChild(col);
    })

}

const handleAdd = ( item) =>{
    const cartBtn = document.getElementById('counter');
    
        const id = item.getAttribute('data-productid')
        const [selectedItem] = data.filter(item => item.id === +id);

        const existing = cart.filter(item => item.id === selectedItem.id)
        
        if(existing.length === 0){
            cart.push({...selectedItem, count: 1});

        } else{
            const itemIndex = cart.findIndex(item => item.id === +id);
            
            cart[itemIndex].count++;
            
        }

        cartBtn.innerHTML = `Cart<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    ${cart.length}
                    <span class="visually-hidden">unread messages</span>
                  </span>`

                  localStorage.setItem('cart', JSON.stringify(cart))
    
}

 const handleShowCart = () =>{
    const total = document.getElementById('total');
    const cartModal = document.getElementById('cart-modal');
    const cartBtn = document.getElementById('counter');
    
        
        if(cart.length === 0){
            cartModal.innerHTML = `<h2>Cart is empty</h2>`;
            total.innerHTML='';
        }else{
            cartModal.innerHTML='';
            const card = document.createElement('div');
            card.classList.add('card'); 
            card.innerHTML = `
            <div class="card-header">
                Products
            </div>
            `
            const ul = document.createElement('ul');
            ul.classList.add('p-1')

            let totalPrice= 0;
            cart.map(cartItem =>{
                const li = document.createElement('li');
                li.classList.add('d-flex', 'justify-content-between')
                li.innerHTML =`<div class="card mb-3">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                        <img src=${cartItem.images[0]} class="img-fluid rounded-start" alt="...">
                                        </div>
                                        <div class="col-md-8">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between">
                                                <h5 class="card-title w-75">${cartItem.title}</h5>
                                                <button type="button" class="btn-close delete-btn" aria-label="Close" data-id=${cartItem.id}></button>
                                            </div>
                                            <p class="card-text">Price: <small class="text-body-secondary">${cartItem.price}$</small></p>
                                            <div class="card-text d-flex justify-content-between">
                                            <div>
                                                count: 
                                            <small class="text-body-secondary count">${cartItem.count}</small>
                                            </div>
                                            <div>
                                            <button class="rounded-circle btn btn-success add-btn" data-id=${cartItem.id}>+</button>
                                            <button class="rounded-circle btn btn-danger remove-btn" data-id=${cartItem.id}>-</button>
                                            </div></div>
                                            <p class="card-text">Total Price: <small class="text-body-secondary total">${cartItem.count* cartItem.price}$</small></p>
                                        </div>
                                        </div>
                                    </div>
                                    </div>`
                ul.appendChild(li);
                totalPrice+= cartItem.price* cartItem.count
                
                
            })
            card.appendChild(ul);
            cartModal.appendChild(card);
            total.innerHTML = `<span>Total:</span> <span>${totalPrice}$</span>`;
            
            const addButtons = document.querySelectorAll('.add-btn');
            const removeButtons = document.querySelectorAll('.remove-btn');
            const deleteButtons = document.querySelectorAll('.delete-btn');


            addButtons.forEach(button =>{
                button.addEventListener('click', () =>{
                    const index = cart.findIndex(item => item.id === +button.getAttribute('data-id'))
                    cart[index].count++;
                    localStorage.setItem('cart', JSON.stringify(cart))
                    const parent = button.parentElement.parentElement
                    parent.querySelector('.count').innerHTML = cart[index].count;
                    const cardBody = parent.parentElement;
                    cardBody.querySelector('.total').innerHTML = cart[index].count * cart[index].price ;
                })
            })

            removeButtons.forEach(button =>{
              button.addEventListener('click', () =>{
                const index = cart.findIndex(item => item.id === +button.getAttribute('data-id'));
                if(cart[index].count > 1){
                    cart[index].count--;
                    localStorage.setItem('cart', JSON.stringify(cart))
                    const parent = button.parentElement.parentElement
                    parent.querySelector('.count').innerHTML = cart[index].count;
                    const cardBody = parent.parentElement;
                    cardBody.querySelector('.total').innerHTML = cart[index].count * cart[index].price ;
                } else if(cart[index].count === 1){
                    const newCart = cart.filter(item => item.id !== +button.getAttribute('data-id'))
                    cart = newCart;
                    button.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
                    localStorage.setItem('cart', JSON.stringify(cart))
                    cart.length !== 0 ? cartBtn.innerHTML = `Cart<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        ${cart.length}
                        <span class="visually-hidden">unread messages</span>
                      </span>`
                    : cartBtn.innerHTML = 'Cart'
                }
              })
            })

            deleteButtons.forEach(button =>{
                button.addEventListener('click', () =>{
                    const newCart = cart.filter(item => item.id !== +button.getAttribute('data-id'))
                    cart = newCart;
                    localStorage.setItem('cart', JSON.stringify(cart))
                    button.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
                    cart.length !== 0 ? cartBtn.innerHTML = `Cart<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        ${cart.length}
                        <span class="visually-hidden">unread messages</span>
                      </span>`
                    : cartBtn.innerHTML = 'Cart'
                })
            })
        
        
    }
}

 const handleClearCart = () =>{
    const cartBtn = document.getElementById('counter');
    const total = document.getElementById('total');
    const cartModal = document.getElementById('cart-modal');

    cartModal.innerHTML= `<h2>Cart is empty</h2>`;
    total.innerHTML='';
        localStorage.removeItem('cart');
        cartBtn.innerHTML='Cart';
        cart = [];
}


const createEventListeners = () => {
    const addBtn = document.querySelectorAll('#products .col-lg-4 .card .card-body button');
    const cartBtn = document.getElementById('counter');
    const clearBtn = document.getElementById('clear');


    addBtn.forEach(item => {
        item.addEventListener('click', handleAdd.bind(this, item))
    })

    cartBtn.addEventListener('click', handleShowCart)

    clearBtn.addEventListener('click',handleClearCart)
}



(async function app() {
    const cartBtn = document.getElementById('counter');
    const localCart = JSON.parse(localStorage.getItem('cart'));
    if(localCart){
        cart = [...localCart]
    } else{
        cart=[];
    }
    cart.length !== 0 ? cartBtn.innerHTML = `Cart<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        ${cart.length}
                        <span class="visually-hidden">unread messages</span>
                      </span>`
        : cartBtn.innerHTML = 'Cart'

    const userName = JSON.parse(localStorage.getItem('user'))
    if(userName){
        const userPlaceholder = document.getElementById('user-name');
        userPlaceholder.innerText = userName.slice(0,1);
        userPlaceholder.classList.remove('d-none')
    }

    data = await sendRequest('https://api.escuelajs.co/api/v1/products')
    render(data);

    createEventListeners()
})()

