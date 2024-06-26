let cartItems = [];
let c = 0;


document.addEventListener('DOMContentLoaded', function() {
  
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  // Fetch product details using the retrieved product ID
  fetchProductReviews(productId);
  // fetchProductDetails(productId);
  // loadCartItems();

  fetch(`fetch_user_details.php?id=${userId}`)
    .then(response => response.json())
    .then(user => {
      // Populate HTML elements with product details
        // console.log("Qwerty");
        if (user.isAdmin === '1') {
            
          fetchProductDetailsArt(productId);
          sideBarRight = document.getElementById('sidebarright');
          sideBarRight.style.display = "none";
        } else {
          fetchProductDetails(productId);
          loadCartItems();
        }
    })
    .catch(error => console.error('Error fetching user details:', error));

  
});
  
  function loadCartItems() {
    // Retrieve cart items from localStorage
    const storedCartItems = localStorage.getItem('cartItems');

    // Check if there are stored cart items
    if (storedCartItems) {
        // Parse the JSON string back into an array
        cartItems = JSON.parse(storedCartItems);
        
        // Display the retrieved cart items in the sidebar
        displayCartItems();
    }
}

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
          <p>Artisan: ${product.ArtisanName}</p>
          <p class="price">Price: $${product.Price}</p>
          <p class="rating" id="product-rating"></p>
          <p class="quant" >Quantity: <input type=number min="0" max="${product.Stock}" id="quantity"></p>
          <button onclick="addToCart('${product.ProductID}','${product.Title}','${product.Image}','${product.Price}',${product.Stock})">Add to Cart</button>
          <button onclick="continueShoppingBtn()">Continue Shopping</button>
          <br>
          <p class="avail"> Available Stock:  ${product.Stock}</p>

        </div>
    `;
      // Display star rating
      const ratingContainer = document.getElementById('product-rating');
      ratingContainer.innerHTML = c;
      
    })
    .catch(error => console.error('Error fetching product details:', error));
}
// const continueShoppingBtn = document.getElementById('continueShoppingBtn');
//   if (continueShoppingBtn) {
//     continueShoppingBtn.addEventListener('click', function() {
//       // Redirect the user to the shop.html page
//       console.log("Bhavsar");
//       window.location.href = 'shop.html';
//     });
//   }

function continueShoppingBtn(){
        window.location.href = 'shop.html';
}


function addToCart(id,title,image, price,stock) {
  // Get the quantity input value 
  const quantityInput = document.getElementById('quantity');
  const quantity = parseInt(quantityInput.value);
  id = parseInt(id);

  stock = parseInt(stock);

  const existingCartItemIndex = cartItems.findIndex(item => item.id === id && item.userId === userId);

  if (existingCartItemIndex !== -1) {
        // If the product is already in the cart, update its quantity
        if((cartItems[existingCartItemIndex].quantity + quantity) <=stock){
          cartItems[existingCartItemIndex].quantity += quantity;
        }
  } else {
    if(quantity>0 && quantity<=stock){

        // If the product is not in the cart, add it as a new item
        cartItems.push({ id, title, price, image, quantity, userId });
    }
    else{
      alert("Enter Quantity Less than the available stock");
    }
  }

  // Display the cart items in the sidebar
  displayCartItems();
  saveCartItems();
}

function saveCartItems() {
  // Save cart items to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function displayCartItems() {
  const cartList = document.getElementById('cart-items1');
  cartList.innerHTML = ''; // Clear existing cart items

  cartItems.forEach((item,index) => {
    if(item.userId===userId){
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

      // Remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => removeCartItem(index));
      cartItem.appendChild(removeButton);

      cartList.appendChild(cartItem);
    }
  });
}

function fetchProductDetailsArt(productId){
      fetch(`fetch_product_details.php?id=${productId}`)
      .then(response => response.json())
      .then(product => {
        // Populate HTML elements with product details
        const productDetailsContainer = document.getElementById('product-details');
        productDetailsContainer.innerHTML = `
          <img src="../assets/${product.Image}" alt="${product.Title}">
          <div class="details">
            <h2 style="margin-top:60px;">${product.Title}</h2>
            <p>Description: ${product.Description}</p>
            <p class="price">Price: $${product.Price}</p>
            <p class="rating" id="product-rating"></p>
            <p class="quant" >Update Stock: <input type=number min="0"  id="update-stock"></p>
            <button onclick="updateStock(${product.ProductID})">Update Stock</button>
            <p class="avail"> Available Stock:  ${product.Stock}</p>

          </div>
      `;
        // Display star rating
        const ratingContainer = document.getElementById('product-rating');
        ratingContainer.innerHTML = c;
        
      })
      .catch(error => console.error('Error fetching product details:', error));
}

function updateStock(pid){
    
    const upstock = parseInt(document.getElementById("update-stock").value);
    console.log(upstock);
      if(upstock>0){
          const sql = `UPDATE products SET Stock = Stock + ${upstock} WHERE productId = ${pid}`;

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
              window.location.href = 'homePage_artisan.html';
              // Optionally, you can display a success message or update the UI
          })
          .catch(error => {
              console.error('Error inserting STOCK:', error);
              // Optionally, you can display an error message or handle the error
          });
        }
}
// Function to remove a cart item
function removeCartItem(index) {
  
  cartItems.splice(index, 1); // Remove the item from the cartItems array
  displayCartItems(); // Update the cart display
  saveCartItems(); // Save the updated cart items to local storage
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

        const averageRating = parseFloat(data.star.star).toFixed(1);
        c= generateStarRating(averageRating);
        const productRating = document.getElementById('rating__average');
        productRating.innerHTML = `
          <h1>${averageRating}</h1>
          <p class="rating" id="product-rating1"></p>
          <p style="margin-bottom: 0;">${data.tcount.c}</p>
      `;

        const ratingContainer = document.getElementById('product-rating1');
        ratingContainer.innerHTML = c;
        
        // const ratingProgress = parseFloat(data.star.star).toFixed(1);
        const ratingProgress = document.getElementById('rating__progress');
        ratingProgress.innerHTML = `
          <div class="rating__progress-value">
            <p style="margin-bottom: 0;">5 <span class="star">&#9733; </span></p>
            <div class="progress">
              <div class="bar1"></div>
            </div>
            <p style="margin-bottom: 0;">${data.count5.f}</p>
          </div>
          <div class="rating__progress-value">
            <p style="margin-bottom: 0;">4 <span class="star">&#9733; </span></p>
            <div class="progress">
              <div class="bar2"></div>
            </div>
            <p style="margin-bottom: 0;">${data.count4.four}</p>
          </div>
          <div class="rating__progress-value">
            <p style="margin-bottom: 0;">3 <span class="star">&#9733; </span></p>
            <div class="progress">
              <div class="bar3"></div>
            </div>
            <p style="margin-bottom: 0;">${data.count3.three}</p>
          </div>
          <div class="rating__progress-value">
            <p style="margin-bottom: 0;">2<span class="star">&#9733; </span></p>
            <div class="progress">
              <div class="bar4"></div>
            </div>
            <p style="margin-bottom: 0;">${data.count2.two}</p>
          </div>
          <div class="rating__progress-value">
            <p style="margin-bottom: 0;">1<span class="star">&#9733; </span></p>
            <div class="progress">
              <div class="bar5"></div>
            </div>
            <p style="margin-bottom: 0;">${data.count1.one}</p>
          </div>
      `;

      const  sum = parseInt(data.count5.f) + parseInt(data.count4.four) + parseInt(data.count3.three) + parseInt(data.count2.two) + parseInt(data.count1.one);
      const percentage1 =  (data.count1.one/sum) *100;
      const percentage2 =  (data.count2.two/sum) *100;
      const percentage3 =  (data.count3.three/sum) *100;
      const percentage4 =  (data.count4.four/sum) *100;
      const percentage5 =  (data.count5.f /sum) *100;
      
      document.documentElement.style.setProperty('--bar-width-1', `${percentage5}%`);
      document.documentElement.style.setProperty('--bar-width-2', `${percentage4}%`);
      document.documentElement.style.setProperty('--bar-width-3', `${percentage3}%`);
      document.documentElement.style.setProperty('--bar-width-4', `${percentage2}%` );
      document.documentElement.style.setProperty('--bar-width-5', `${percentage1}%`);


      })
      .catch(error => console.error('Error fetching product details:', error));
  
}

 // Add event listener to the "Go to Cart" button
 document.getElementById('go-to-cart').addEventListener('click', function() {
  // Redirect the user to the cart page (replace 'cart.html' with your actual cart page URL)
  console.log("Rudviq");
  window.location.href = 'cart_demo.html';
});

