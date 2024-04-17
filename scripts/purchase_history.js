// let cartItems =[];
const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
document.addEventListener('DOMContentLoaded', function() {
    // const purchaseHistory = document.getElementById('purchase-history');
    
    // loadPurchaseItems();
    
    displayOrderedItems();

  });
  
 

function displayOrderedItems(){

    const cartList = document.getElementById('purchase-history');
    cartList.innerHTML = ''; // Clear existing cart items
    console.log(purchaseHistory);

    purchaseHistory.forEach((item,index) => {
        if(item.userId===userId){
            const cartItem   = document.createElement('div');
            cartItem.classList.add('cart-item', 'row', 'mb-3', 'border-bottom');
            cartItem.style = 'flex-direction: row;'

            // Product image container
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('col-4');

            // Product image
            const img = document.createElement('img');
            img.src = '../assets/' + item.image;
            img.classList.add('img-fluid', 'rounded');
            imgContainer.appendChild(img);
            cartItem.appendChild(imgContainer);

            // Product details container
            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('col-8', 'd-flex', 'flex-column', 'justify-content-between', 'py-2');
            detailsContainer.style = 'width:30%';

            // Product title
            const title = document.createElement('h3');
            title.textContent =  item.title;
            title.classList.add('mb-1');
            detailsContainer.appendChild(title);

            // Price and quantity details
            const priceQuantity = document.createElement('div');
            priceQuantity.classList.add('text-muted', 'justify-content-between');

            // Price per item
            const price = document.createElement('p');
            price.textContent = 'Price per Item: ' + `$${item.price.toFixed(2)}`;
            price.classList.add('m-0');
            priceQuantity.appendChild(price);

            // Quantity
            const quantity = document.createElement('p');
            quantity.textContent = 'Quantity: ' + item.quantity;
            quantity.classList.add('m-0');
            priceQuantity.appendChild(quantity);

            detailsContainer.appendChild(priceQuantity);

            // Total price
            const total = item.price * item.quantity;
            const totalPrice = document.createElement('p');
            totalPrice.textContent = 'Total Price: ' + `$${total.toFixed(2)}`;
            totalPrice.classList.add('m-0');
            detailsContainer.appendChild(totalPrice);

            // Date
            const date = document.createElement('p');
            date.textContent = 'Bought on: ' + item.date;
            date.classList.add('m-0');
            detailsContainer.appendChild(date);

            cartItem.appendChild(detailsContainer);

            // Feedback section
            const feedbackContainer = document.createElement('div');
            feedbackContainer.classList.add('col-3', 'text-center', 'd-flex', 'flex-column', 'align-items-center');

            // Star rating
            const starRating = document.createElement('div');
            starRating.innerHTML = `
                <p>Rate this product:</p>
                <div class="rating">
                    <input type="radio" id="star5" name="rating" value="5" /><label for="star5"></label>
                    <input type="radio" id="star4" name="rating" value="4" /><label for="star4"></label>
                    <input type="radio" id="star3" name="rating" value="3" /><label for="star3"></label>
                    <input type="radio" id="star2" name="rating" value="2" /><label for="star2"></label>
                    <input type="radio" id="star1" name="rating" value="1" /><label for="star1"></label>
                </div>
            `;
            feedbackContainer.appendChild(starRating);

            // Comments section
            const comments = document.createElement('textarea');
            comments.placeholder = 'Add your comments...';
            comments.classList.add('form-control', 'mb-2');
            feedbackContainer.appendChild(comments);

            // Submit button
            const submitBtn = document.createElement('button');
            submitBtn.textContent = 'Submit';
            submitBtn.classList.add('btn', 'btn-primary');
            submitBtn.addEventListener('click', function() {
                // Add logic to handle feedback submission
                const rating = document.querySelector('input[name="rating"]:checked').value;
                const comment = comments.value;
                // Example: Send feedback data to server or save in local storage
                console.log('Rating:', rating);
                console.log('Comment:', comment);

            
                // Construct SQL query to insert feedback
                const sql = `INSERT INTO feedback (userId, productId, rating, comment, datePosted) VALUES (${userId}, ${item.id}, ${rating}, '${comment}', NOW())`;

                // Execute the SQL query (you need to send this data to your server and handle database operations there)
                fetch('insert_feedback.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ sql: sql })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Feedback inserted successfully:', data);
                    // Optionally, you can display a success message or update the UI
                })
                .catch(error => {
                    console.error('Error inserting feedback:', error);
                    // Optionally, you can display an error message or handle the error
                });

                // Clear input fields after submission
                comments.value = '';
            });
            feedbackContainer.appendChild(submitBtn);

            cartItem.appendChild(feedbackContainer);

            cartList.appendChild(cartItem);
        }
    });
}

