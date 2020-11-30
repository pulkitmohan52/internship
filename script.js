const cartBtn= document.querySelectorAll('.cart-btn');
cartBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {

        //getting the actual image that we have to place in the cart 
        const fullPath= e.target.parentElement.parentElement.previousElementSibling.firstElementChild.src;
        const pos= fullPath.indexOf("storeImage") + 10;
        let partialPath= fullPath.slice(pos);

        const item= {};
        
        //getting the item name
        let name= e.target.parentElement.previousElementSibling.firstElementChild.textContent;
        item.name= name;

        //getting the item price 
        let price= e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.innerText;
        item.price=price;

        //getting the item quantity 
        let quantity= e.target.nextElementSibling.nextElementSibling.value;
        item.quantity= quantity;

        //setting the item price=
        let partPrice= price.slice(1,3);
        let partQuantity= quantity.slice(0, quantity.indexOf("kg"));
        let itemTotalPrice= partPrice * partQuantity;
        item.itemTotalPrice= itemTotalPrice;
        
        //adding the details in the cart 
        const cartItem= document.createElement('div');
        cartItem.classList.add("cart-item","d-flex", "justify-content-between", "text-capitalize", "my-3");

        cartItem.innerHTML= `
            
            <div class="item-text">
                <p>${item.name}</p>
                <p>${item.price}</p>
            </div>
            <p>${item.quantity}</p>
            <p class="cart-item-price">${item.itemTotalPrice}</p>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
                <i class="fas fa-trash"></i>
            </a>
        `
        const total=document.querySelector('.cart-total');
        cart.insertBefore(cartItem, total);

        // const msgBox= document.createElement('div');
        // msgBox.classList.add('alert' ,'alert-success', 'text-center');
        // msgBox.textContent= `${item.name} added to the cart`;
        
        // const cont=document.querySelector('.max-height');
        // cont.append(msgBox);
        // cont.scrollIntoView();

        // setTimeout(() => document.querySelector('.alert').remove() , 3000);
        showTotal();

    });
});

const cart= document.querySelector('#cart');

const cartInfo= document.querySelector('#cart-info');
cartInfo.addEventListener('click', () => {
    cart.classList.toggle('open');
});

function showTotal(){
    const prices=[];
    const items= document.querySelectorAll('.cart-item-price');
    items.forEach(item => {
    	// console.log(item);
        //price.push(item.textContent);
        prices.push(parseInt(item.textContent));
    })
    //updating the count in the cart
    let itemCount= document.getElementById('item-count');
    itemCount.innerText= prices.length;
    let totalAmount= prices.reduce((total, item) => total+item, 0);
    document.querySelector('.cart-total').innerText= `Total : ₹${totalAmount}`;
    document.querySelector('.item-total').innerText= `${totalAmount}`;
}
