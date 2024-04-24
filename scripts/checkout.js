// Add functionality to make payment button
document.getElementById('makePaymentBtn').addEventListener('click', function() {
    // Retrieve purchased items (for example, from the shopping cart)
    const cardNumberInput = document.querySelector('#collapseOne input[placeholder="0000 0000 0000 0000"]');
    const expiryDateInput = document.querySelector('#collapseOne input[placeholder="MM/YY"]');
    const cvcInput = document.querySelector('#collapseOne input[placeholder="000"]');
    // const paypalEmailInput = document.querySelector('#collapseTwo input[placeholder="Paypal email"]');

    // Check if all fields are filled
    if (cardNumberInput.value.trim() === '' || expiryDateInput.value.trim() === '' || cvcInput.value.trim() === '' ) {
        alert('Please fill in all fields.');
        return; // Prevent further execution
    }

    // Check if card number is exactly 16 digits long
    if (!/^\d{16}$/.test(cardNumberInput.value.trim())) {
        alert('Card number must be exactly 16 digits long.');
        return; // Prevent further execution
    }

    // Check if expiry date is in MM/YY format
    if (!/^\d{2}\/\d{2}$/.test(expiryDateInput.value.trim())) {
        alert('Expiry date must be in MM/YY format.');
        return; // Prevent further execution
    }

    // Check if MM value does not exceed 12
    const [mm, yy] = expiryDateInput.value.trim().split('/');
    if (parseInt(mm) > 12) {
        alert('Month value must not exceed 12.');
        return; // Prevent further execution
    }

    // Check if CVV is exactly 3 digits long and contains only numbers
    if (!/^\d{3}$/.test(cvcInput.value.trim())) {
        alert('CVV must be exactly 3 digits long and contain only numbers.');
        return; // Prevent further execution
    }

    // If all fields are filled, proceed with payment
    alert('Payment successful!');
    const purchasedItems = []; // Replace with actual logic to retrieve purchased items

    // Add purchased items to purchase history (for example, store in local storage)
    addToPurchaseHistory(purchasedItems);
  });

  function addToPurchaseHistory(purchasedItems) {
    const currentDate = new Date().toISOString().split('T')[0];
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    cartItems.forEach(x => {
        x.date = currentDate;

        console.log(x);
        // Construct SQL query to insert feedback
        const sql = `UPDATE products SET Stock = Stock - ${x.quantity} WHERE productId = ${x.id}`;

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
            console.log('Stock Updated successfully:', data);
            // Optionally, you can display a success message or update the UI
        })
        .catch(error => {
            console.error('Error inserting feedback:', error);
            // Optionally, you can display an error message or handle the error
        });
    });
    purchaseHistory.push(...cartItems);
    // console.log(purchaseHistory);
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
    

    // Filter out items where userId is not 1
    const updatedCartItems = cartItems.filter(item => item.userId !== userId);

    // Update localStorage with filtered cartItems
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  
      // Redirect to purchase history page or display a success message
      window.location.href = 'purchase_history.html';
  }
   