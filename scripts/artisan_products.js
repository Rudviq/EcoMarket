// // document.addEventListener('DOMContentLoaded', function() {

//     fetchMyProducts();
// // });

function fetchMyProducts(userId){

    fetch('fetch_products.php?filter=0&artisan_id='+userId)
    .then(response => response.json())
    .then(products => {
        // Display fetched products
        displayProducts2(products);
    })
    .catch(error => console.error('Error fetching products:', error));
}

function displayProducts2(products){

        // console.log('Displaying products...');
        const productGrid = document.getElementById('product-grid');
        productGrid.innerHTML = ''; // Clear existing products from the container
    
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="../assets/${product.Image}" alt="${product.Title}">
                <h3>${product.Title}</h3>
                <p class="description">${product.Description.substring(0, 50)}...</p>
                <p class="rating" id="product-rating-${product.ProductID}"></p>
                <p class="price"><a>$</a>${product.Price}</p>
            `;
    
            
    
            // Add click event listener to each product grid item
            productCard.addEventListener('click', () => {
                // Redirect to product.html with product ID in the URL
                window.location.href = `product.html?id=${product.ProductID}`;
            });
            console.log(product);
            fetch(`fetch_product_reviews.php?id=${product.ProductID}`)
            .then(response => response.json())
            .then(data => { 
                
                const averageRating = parseFloat(data.star.star).toFixed(1);
                
                productGrid.appendChild(productCard);
                const ratingContainer = document.getElementById(`product-rating-${product.ProductID}`);
                // Calculate and display star rating
                ratingContainer.innerHTML = generateStarRating(averageRating, product.ProductID);
            })
            .catch(error => console.error('Error fetching product details:', error));
    
            
        });
    
}

// Function to generate star rating
function generateStarRating(rating, productId) {
    // console.log(`Generating star rating for product ${productId} with rating ${rating}`);
    const starsTotal = 5;
    const starPercentage = (rating / starsTotal) * 100;
    // console.log(`Star percentage: ${starPercentage}`);
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    // console.log(`Rounded star percentage: ${starPercentageRounded}`);

    // Create HTML for star rating
    const starsHTML = `
    <div class="stars-outer">
        <div class="stars-inner" style="width: ${starPercentageRounded};"></div>
    </div>
    `;
     
    return starsHTML;
   
}