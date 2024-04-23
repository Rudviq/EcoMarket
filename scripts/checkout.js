// Add functionality to make payment button
document.getElementById('makePaymentBtn').addEventListener('click', function() {
    // Retrieve purchased items (for example, from the shopping cart)
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
   