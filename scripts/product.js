document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Fetch product details using the retrieved product ID
  fetchProductDetails(productId);
  });
  
  function fetchProductDetails(productId) {
    // Fetch product details from the server using AJAX
    fetch(`fetch_product_details.php?id=${productId}`)
      .then(response => response.json())
      .then(product => {
        // Populate HTML elements with product details
        const productDetailsContainer = document.getElementById('product-details');
        productDetailsContainer.innerHTML = `
          <img src="../assets/${product.Image}" alt="${product.Title}">
          <div class="details">
            <h2>${product.Title}</h2>
            <p>Description: ${product.Description}</p>
            <p class="price">Price: $${product.Price}</p>
            <p class="rating">Rating: ${product.Rating} Stars</p>
            <p class="quant">Quantity: <input type=number></p>
            <button onclick="addToCart(${product.ProductID})">Add to Cart</button>
            <br>
            <p class="avail"> Available Stock:  ${product.Stock}</p>

          </div>
        `;
      })
      .catch(error => console.error('Error fetching product details:', error));
  }
  