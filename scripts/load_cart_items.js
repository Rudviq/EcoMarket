let storedCartItems = [];
// const userId = sessionStorage.getItem('user_id');
console.log(userId);
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve cart items from localStorage
    storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    // console.log(storedCartItems);

    if (storedCartItems && storedCartItems.length > 0) {
        
        const len = storedCartItems.length;
        const shoppingTitle = document.getElementById('shop-title');
        shoppingTitle.innerHTML = `
            <div class="col"><h4><b>Shopping Cart</b></h4></div>
            <div class="col align-self-center text-right text-muted">${len} items</div>
        `;

        const cartList = document.getElementById('cart-items_final');
        var total_item_price =0;
        storedCartItems.forEach((item,index) => {
            if(item.userId === userId){
                const cartItem = document.createElement('div');
                cartItem.classList.add('row', 'main', 'align-items-center', 'border-top', 'border-bottom');

                cartItem.innerHTML = `
                    <div class="col-2"><img class="img-fluid" src="../assets/${item.image}"></div>
                    <div class="col">
                        <div class="row text-muted">${item.title}</div>
                        <!-- <div class="row">${item.description}</div>-->
                    </div>
                    <div class="col">
                        <a href="#" style="text-decoration:none; color:black">-</a>
                        <a href="#" class="border" style="text-decoration:none; color:black">${item.quantity}</a>
                        <a href="#" style="text-decoration:none; color:black">+</a>
                    </div>
                    <div class="col">&dollar; ${item.price} <span class="close" onclick="removeCartItems(${index})">&#10005;</span></div>
                `;

                total_item_price = total_item_price + item.price * item.quantity;

                cartList.appendChild(cartItem);
            }
        });
        
        const shoppingCart = document.getElementById('total-item-price');
        const totalItemPrice = total_item_price.toFixed(2);
        shoppingCart.innerHTML = `
            <div class="col" style="padding-left:0;">ITEMS ${len}</div>
            <div class="col text-right">&dollar; ${totalItemPrice}</div>
        `;

        const fprice = 5 + total_item_price;
        const fqprice = fprice.toFixed(2);
        const finalPrice = document.getElementById('total-final-price');
        finalPrice.innerHTML = `
            <div class="col">TOTAL PRICE</div>
            <div class="col text-right">&dollar; ${fqprice}</div>
        `;
        
    }

    document.getElementById('code').addEventListener('input', function() {
        // Get the value of the input field
        const code = this.value.trim();
        // Check if the entered code matches the discount code
        if (code === 'CSE6324') {
            // Apply the discount (e.g., 10% off)
            applyDiscount(10); // Pass the discount percentage as an argument
        } else {
            // Remove the discount if the code doesn't match
            applyDiscount(0);
        }
    });

    function applyDiscount(discount) {
        
        const fprice = 5 + total_item_price - discount;
        const fqprice = fprice.toFixed(2);
        const finalPrice = document.getElementById('total-final-price');
        finalPrice.innerHTML = `
            <div class="col">TOTAL PRICE</div>
            <div class="col text-right">&dollar; ${fqprice}</div>
        `;
    }

    

    document.getElementById('checkoutButton').addEventListener('click', function() {
        window.location.href = 'checkout.html';
    });
});

function removeCartItems(index) {
    
    storedCartItems.splice(index, 1); // Remove item from storedCartItems array
    console.log(storedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(storedCartItems)); // Update local storage
    document.location.reload(); // Refresh the page to update the cart display
}
