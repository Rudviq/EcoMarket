let cartItems = [];
let c = 0;

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Fetch product details using the retrieved product ID
  fetchProductReviews(productId);
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
            <p class="rating" id="product-rating"></p>
            <p class="quant" >Quantity: <input type=number min="0" max="${product.Stock}" id="quantity"></p>
            <button onclick="addToCart('${product.Title}','${product.Image}',${product.Price})">Add to Cart</button>
            <button >Continue Shopping</button>
            <br>
            <p class="avail"> Available Stock:  ${product.Stock}</p>

          </div>
      `;

        // Display star rating
        const ratingContainer = document.getElementById('product-rating');
        ratingContainer.innerHTML = c;
        // console.log(c);
      })
      .catch(error => console.error('Error fetching product details:', error));
  }

  function addToCart(title,image, price) {
    // Get the quantity input value
    console.log("In addTocart");
    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput.value);
    console.log(quantity);
    // Add the selected product to the cart array
    cartItems.push({ title, price,image, quantity});
    
    
    // Display the cart items in the sidebar
    displayCartItems();
  }

  function displayCartItems() {
    const cartList = document.getElementById('cart-items1');
    cartList.innerHTML = ''; // Clear existing cart items
  
    cartItems.forEach(item => {
     
      const cartItem   = document.createElement('div');
      cartItem.classList.add('cart-item');

      const imgTitleItem = document.createElement('div');
      imgTitleItem.classList.add('img-title-item');

      const cartItem1 = document.createElement('div');
      cartItem1.classList.add('cart-item-image');
      imgTitleItem.appendChild(cartItem1);

      // Product image
      const img = document.createElement('img');
      img.src = '../assets/' + item.image;
      cartItem1.appendChild(img);

      const cartItem2 = document.createElement('div');
      cartItem2.classList.add('cart-item-details');
      imgTitleItem.appendChild(cartItem2);
      // Product title
      const title = document.createElement('h3');
      title.textContent = item.title;
      cartItem2.appendChild(title);
  
      // Product price
      const price = document.createElement('p');
      price.textContent = `$${item.price}`;
      cartItem2.appendChild(price);
  
      cartItem.appendChild(imgTitleItem);
      // Quantity controls
      const quantityControl = document.createElement('div');
      quantityControl.classList.add('quantity-control');

      const decreaseLink = document.createElement('a');
      decreaseLink.href = '#';
      decreaseLink.classList.add('quantity-button');
      decreaseLink.textContent = '-';
      decreaseLink.style.textDecoration = 'none';
      decreaseLink.style.color = 'black';
      decreaseLink.addEventListener('click', () => decreaseQuantity(item));
      quantityControl.appendChild(decreaseLink);

      const quantityLink = document.createElement('a');
      quantityLink.classList.add('border');
      quantityLink.href = '#';
      quantityLink.textContent = item.quantity;
      quantityLink.style.textDecoration = 'none';
      quantityLink.style.color = 'black';
      quantityControl.appendChild(quantityLink);

      const increaseLink = document.createElement('a');
      increaseLink.href = '#';
      increaseLink.classList.add('quantity-button');
      increaseLink.textContent = '+';
      increaseLink.style.textDecoration = 'none';
      increaseLink.style.color = 'black';
      increaseLink.addEventListener('click', () => increaseQuantity(item));
      quantityControl.appendChild(increaseLink);
      
      cartItem.appendChild(quantityControl);
  
      cartList.appendChild(cartItem);
    });
  }
  
  // Function to decrease the quantity of a cart item
function decreaseQuantity(item) {
  if (item.quantity > 1) {
      item.quantity--;
      displayCartItems(cartItems);
  }
}

// Function to increase the quantity of a cart item
function increaseQuantity(item) {
  item.quantity++;
  displayCartItems(cartItems);
}

function fetchProductReviews(productId){
  fetch(`fetch_product_reviews.php?id=${productId}`)
      .then(response => response.json())
      .then(data => {
        console.log("Rudviq");
        const averageRating = parseFloat(data.star.star).toFixed(1);
        const productRating = document.getElementById('rating__average');
        productRating.innerHTML = `
          <h1>${averageRating}</h1>
          <div class="star-outer">
            <div class="star-inner">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          </div>
          <p style="margin-bottom: 0;">${data.tcount.c}</p>
      `;

        c= generateStarRating(averageRating);
        
        // const ratingProgress = parseFloat(data.star.star).toFixed(1);
        const ratingProgress = document.getElementById('rating__progress');
        ratingProgress.innerHTML = `
          <div class="rating__progress-value">
            <p style="margin-bottom: 0;">5 <span class="star">&#9733; </span></p>
            <div class="progress">
              <div class="bar"></div>
            </div>
            <p style="margin-bottom: 0;">${data.count5.f}</p>
          </div>
          <div class="rating__progress-value">
            <p style="margin-bottom: 0;">4 <span class="star">&#9733; </span></p>
            <div class="progress">
              <div class="bar"></div>
            </div>
            <p style="margin-bottom: 0;">${data.count4.four}</p>
          </div>
          <div class="rating__progress-value">
            <p style="margin-bottom: 0;">3 <span class="star">&#9733; </span></p>
            <div class="progress">
              <div class="bar"></div>
            </div>
            <p style="margin-bottom: 0;">${data.count3.three}</p>
          </div>
          <div class="rating__progress-value">
            <p style="margin-bottom: 0;">2<span class="star">&#9733; </span></p>
            <div class="progress">
              <div class="bar"></div>
            </div>
            <p style="margin-bottom: 0;">${data.count2.two}</p>
          </div>
          <div class="rating__progress-value">
            <p style="margin-bottom: 0;">1<span class="star">&#9733; </span></p>
            <div class="progress">
              <div class="bar"></div>
            </div>
            <p style="margin-bottom: 0;">${data.count1.one}</p>
          </div>
      `;
     

      })
      .catch(error => console.error('Error fetching product details:', error));
  
}