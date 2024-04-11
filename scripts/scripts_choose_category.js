var filter;
var selectedCategories = null;

// Function to fetch and display products based on selected categories
function fetchAndDisplayProducts(selectedCategories,filter) {
    // Fetch products from the server using AJAX
    if(selectedCategories){
        
        fetch('fetch_products.php?categories=' + selectedCategories.join(',') + '&filter=' +filter)
            .then(response => response.json())
            .then(products => {
                // Display fetched products
                displayProducts(products);
            })
            .catch(error => console.error('Error fetching products:', error));
    }
    else{
        fetch('fetch_products.php?filter='+filter)
        .then(response => response.json())
        .then(products => {
            // Display fetched products
            displayProducts(products);
        })
        .catch(error => console.error('Error fetching products:', error));
    }
}

// Function to display products
function displayProducts(products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; // Clear existing products from the container

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="../assets/${product.Image}" alt="${product.Title}">
            <h3>${product.Title}</h3>
            <p class="description">${product.Description.substring(0, 50)}...</p>
            <!--<p class="rating">${product.Rating} Stars</p>--> 
            <br>
            <p class="price"><a>$</a>${product.Price}</p>
        `;

        // Add click event listener to each product grid item
        productCard.addEventListener('click', () => {
            console.log("hasudh");
            // Redirect to product.html with product ID in the URL
            window.location.href = `product.html?id=${product.ProductID}`;
        });

        productGrid.appendChild(productCard);
    });
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

  fetchAndDisplayProducts(selectedCategories, filter);
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
          console.log(selectedCategories);
        // Update displayed products based on selected categories
        fetchAndDisplayProducts(selectedCategories,filter);
      });

      // Append checkbox and label to the categoryFilter element
      categoryFilter.appendChild(checkbox);
      categoryFilter.appendChild(label);
      categoryFilter.appendChild(document.createElement('br'));
    });
  
})
.catch(error => console.error('Error fetching categories:', error));

// Display all products by default
fetchAndDisplayProducts(null,0);
  
