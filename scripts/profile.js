// const userId = sessionStorage.getItem('user_id');

document.addEventListener('DOMContentLoaded', function() {
    // Get user data from localStorage

    fetch(`fetch_user_details.php?id=${userId}`)
    .then(response => response.json())
    .then(user => {
      // Populate HTML elements with product details
      const userDetailsContainer = document.getElementById('product-details');
      userDetailsContainer.innerHTML = `
        <img src="../assets/${user.Photo} ">
        <div class="details">
        <h2 style="margin-top: 30px">User Details</h2>
          <p style="margin-top: 20px;">Name: ${user.Username}  ${user.LastName}</p>
                <p>Email: ${user.Email}</p>
                <!-- Add more user details here -->
                <button onclick="window.location.href='../pages/update_profile.html'" class="upload-btn">Edit Profile Now</button>
            
        </div>
    `;
        const uploadSection = document.getElementById('upload-sec');
        if (user.isAdmin === '1') {
            uploadSection.style.display = 'block';
        
        } else {
            uploadSection.style.display = 'none';
        }
    })
    .catch(error => console.error('Error fetching user details:', error));


    fetch('fetch_categories.php')
    .then(response => response.json())
    .then(categories => {
        console.log(categories);
        // Populate categories in select dropdown
        const categoryFilter = document.getElementById('categories');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.CategoryID;
            option.textContent = category.CName;
            categoryFilter.appendChild(option);
        });
    
    })
    .catch(error => console.error('Error fetching categories:', error));


    const uploadBtn = document.getElementById('upload-btn');

    uploadBtn.addEventListener('click',function(event){
        event.preventDefault(); 

        const pname = document.getElementById('product-name').value;
        const desc = document.getElementById('product-description').value;
        const fileInput = document.getElementById('product-image');
        const file = fileInput.files[0]; // Get the first file selected
        const fileName = file ? file.name : ''; // Check if a file is selected and get its name
        const price = parseFloat(document.getElementById('product-price').value);
        const stock = parseInt(document.getElementById('product-stock').value);
        const category = parseInt(document.getElementById('categories').value);
        // userId = parseInt(userId);
        console.log("Qweaerasd");
        const sql = `INSERT INTO products(Title, Description, Price, Image, CreatedAt, Stock,ArtisanID) VALUES('${pname}','${desc}',${price},'${fileName}',NOW(),${stock},${userId})`;

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


        fetch(`get_recent_product.php`)
        .then(response => response.json())
        .then(product => {
            console.log(product);
            const pid = parseInt(product.ProductID);
            const sql1 = `INSERT INTO productcategories VALUES(${pid},${category})`;
            fetch('insert_feedback.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sql: sql1 })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Product category inserted successfully:', data);

                document.getElementById('product-name').value = '';
                document.getElementById('product-description').value = '';
                document.getElementById('product-image').value = '';
                document.getElementById('product-price').value = '';
                document.getElementById('product-stock').value = '';
                document.getElementById('categories').value = '';
                // Optionally, you can display a success message or update the UI
            })
            .catch(error => {
                console.error('Error inserting prodcuct category:', error);
                // Optionally, you can display an error message or handle the error
            });
        
        })
        .catch(error => console.error('Error product id details:', error));

        
    });
});
