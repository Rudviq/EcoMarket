// Retrieve cart items from local storage
var cartItems = JSON.parse(localStorage.getItem("cartItems"));

// Display cart items
var cartItemsContainer = document.getElementById("cart-items");
if (cartItems) {
  cartItems.forEach(function(item) {
    var newItem = document.createElement("p");
    newItem.textContent = item;
    cartItemsContainer.appendChild(newItem);
  });
} else {
  var emptyCartMessage = document.createElement("p");
  emptyCartMessage.textContent = "Your cart is empty";
  cartItemsContainer.appendChild(emptyCartMessage);
}

// Handle checkout button click
document.getElementById("checkout-btn").addEventListener("click", function() {
  // You can add checkout functionality here
  alert("Redirecting to checkout page...");
});
