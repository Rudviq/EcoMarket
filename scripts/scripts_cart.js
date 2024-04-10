function addToCart(itemName) {
    // Create a new div element
    var newItem = document.createElement("div");
    
    // Add HTML content for the cart item
    newItem.innerHTML = '<p>' + itemName + '</p>';
    
    // Append the new item to the cart section
    document.getElementById("cart-items").appendChild(newItem);
    
    // Show the cart section
    document.querySelector(".cart-section").style.display = "block";
  }
  