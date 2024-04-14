document.addEventListener('DOMContentLoaded', function() {
    // Retrieve cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (storedCartItems && storedCartItems.length > 0) {
        const len = storedCartItems.length;
        const shoppingTitle = document.getElementById('shop-title');
        shoppingTitle.innerHTML = `
            <div class="col"><h4><b>Shopping Cart</b></h4></div>
            <div class="col align-self-center text-right text-muted">${len} items</div>
        `;

        const cartList = document.getElementById('cart-items_final');
        var total_item_price =0;
        storedCartItems.forEach(item => {
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
                <div class="col">&dollar; ${item.price} <span class="close">&#10005;</span></div>
            `;

            total_item_price = total_item_price + item.price * item.quantity;

            cartList.appendChild(cartItem);
        });
        
        const shoppingCart = document.getElementById('total-item-price');
        const totalItemPrice = total_item_price.toFixed(2);
        shoppingCart.innerHTML = `
            <div class="col" style="padding-left:0;">ITEMS ${len}</div>
            <div class="col text-right">&dollar; ${totalItemPrice}</div>
        `;
        // var discount = 0;
        // const promo = document.getElementById('code');

        // if(promo === 'CSE6324'){
        //     discount = 50;
        // }

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
        // Calculate the discounted total price
        // const totalPrice = parseFloat(document.getElementById('totalPrice').textContent.slice(1)); // Assuming the total price is displayed as $XXX.XX
        // const discountedPrice = totalPrice -discount;
        
        // // Update the displayed discounted price
        // document.getElementById('totalPrice').textContent = '$' + discountedPrice.toFixed(2);

        const fprice = 5 + total_item_price - discount;
        const fqprice = fprice.toFixed(2);
        const finalPrice = document.getElementById('total-final-price');
        finalPrice.innerHTML = `
            <div class="col">TOTAL PRICE</div>
            <div class="col text-right">&dollar; ${fqprice}</div>
        `;
    }

    

    document.getElementById('checkoutButton').addEventListener('click', function() {
        // Redirect to the checkout page
        window.location.href = 'checkout.html';
    });
});
