var filter;
// var selectedCategories;
// var selectedCategories = null;
let currentPage = 1;

const urlParams = new URLSearchParams(window.location.search);
const selectedCategoriesString = urlParams.get('cid');
let selectedCategories = selectedCategoriesString ? selectedCategoriesString.split(',') : null;

// Display all products by default
if(selectedCategories){
    console.log("QwRudviq",selectedCategories);
    fetchAndDisplayProducts(selectedCategories,0,currentPage);
}
else{
    fetchAndDisplayProducts(null,0,currentPage);
}
  
updatePaginationButtons();

// Function to fetch and display products based on selected categories
function fetchAndDisplayProducts(selectedCategories,filter,page) {
    // Fetch products from the server using AJAX
    const cacheBuster = Math.random();
    console.log('Fetching and displaying products...',currentPage);
    if(selectedCategories){
        console.log(selectedCategories,filter);
        fetch('fetch_products.php?categories=' + selectedCategories.join(',') + '&filter=' +filter+'&page=' +page+'&cache=' + cacheBuster)
            .then(response => response.json())
            .then(products => {
                // Display fetched products
                displayProducts1(products);
            })
            .catch(error => console.error('Error fetching products:', error));
    }
    else{
        console.log(selectedCategories,filter);
        fetch('fetch_products.php?filter='+filter+'&page=' +page)
        .then(response => response.json())
        .then(products => {
            // Display fetched products
            displayProducts1(products);
        })
        .catch(error => console.error('Error fetching products:', error));
    }
}

// Function to update the pagination buttons
function updatePaginationButtons() {
    document.getElementById('page-number').innerText = currentPage; // Update the displayed page number
}
// Event listener for the next page button
document.getElementById('next-page').addEventListener('click', () => {
    currentPage++;
    fetchAndDisplayProducts(selectedCategories, filter, currentPage);
    updatePaginationButtons();
});

// Event listener for the previous page button
document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchAndDisplayProducts(selectedCategories, filter, currentPage);
        updatePaginationButtons();
    }
});



// Function to display products
function displayProducts1(products) {
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
            console.log(userId);
            if(userId){
                window.location.href = `product.html?id=${product.ProductID}`;
            }
            else{
                alert('Please login to EcoMarket');
            }
        });
        // console.log('V',product.ProductID);
        fetch(`fetch_product_reviews.php?id=${product.ProductID}`)
        .then(response => response.json())
        .then(data => { 
            
            const averageRating = parseFloat(data.star.star).toFixed(1);
            productGrid.appendChild(productCard);
            const ratingContainer = document.getElementById(`product-rating-${product.ProductID}`);
            // Calculate and display star rating
            ratingContainer.innerHTML =generateStarRating(averageRating, product.ProductID);
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


document.getElementById('price-filter').addEventListener('change', function() {
  const selectedOption = this.value; // Get the selected option value

  // Fetch and display products based on the selected option
  if (selectedOption === 'low-to-high') {
      // Fetch products sorted by price low to high
      filter = 1;
      
  } else if (selectedOption === 'high-to-low') {
      // Fetch products sorted by price high to low
      filter=2;
  } else {
      // Fetch products with default sorting (e.g., no specific sorting)
      filter =0;
  }

  fetchAndDisplayProducts(selectedCategories, filter,currentPage);
});
  
// Fetch categories from the server using AJAX
fetch('fetch_categories.php')
  .then(response => response.json())
  .then(categories => {

    // Select the element where checkboxes will be appended
    const categoryFilter = document.getElementById('category-filter');

    // Iterate over the categories and create checkboxes
    categories.forEach(category => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'category[]';
      checkbox.value = category.CategoryID; // Assuming CName is the column name for category name
      checkbox.id = category.CategoryID; // Assuming CName is unique for each category

      const label = document.createElement('label');
      label.htmlFor = category.CategoryID; // Assuming CName is unique for each category
      label.textContent = category.CName;
      label.style.marginLeft = '10px';
      // label.appendChild(document.createTextNode(category.CName)); // Assuming CName is the column name for category name
      
      
      // Add event listener to checkboxes to detect changes
      checkbox.addEventListener('change', () => {
        // Get all selected checkboxes
        const selectedCheckboxes = Array.from(categoryFilter.querySelectorAll('input[type="checkbox"]:checked'));

        // Get the values of selected checkboxes
        selectedCategories = selectedCheckboxes.map(checkbox => checkbox.value);
        //   console.log(selectedCategories);
        // Update displayed products based on selected categories
        if (selectedCategories.length > 0) {
            fetchAndDisplayProducts(selectedCategories, filter, currentPage);
        } else {
            // If no categories are selected, fetch and display all products
            fetchAndDisplayProducts(null, filter, currentPage);
        }
        // fetchAndDisplayProducts(selectedCategories,filter,currentPage);
      });

      if (selectedCategories && selectedCategories.includes(category.CategoryID)) {
        checkbox.checked = true; // Check the checkbox if the category is selected
      }

      // Append checkbox and label to the categoryFilter element
      categoryFilter.appendChild(checkbox);
      categoryFilter.appendChild(label);
      categoryFilter.appendChild(document.createElement('br'));
    });
  
})
.catch(error => console.error('Error fetching categories:', error));

