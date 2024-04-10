<?php
// Connect to your database (replace dbname, username, password with your actual credentials)
$conn = new mysqli('localhost', 'root', '', 'ecomarket');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



// SQL query to fetch products
$sql = "SELECT * FROM products P";

// If selected categories are provided, add a WHERE clause to filter products by those categories
if (isset($_GET['categories'])) {
    // Fetch selected categories from the query parameters
        $selectedCategories = isset($_GET['categories']) ? explode(',', $_GET['categories']) : array();
    $sql .= " INNER JOIN productcategories PC ON PC.ProductID = P.ProductID INNER JOIN Categories C ON C.CategoryID = PC.CategoryID WHERE C.CategoryID IN ('" . implode("', '", $selectedCategories) . "')";
}

// Execute the query
$result = $conn->query($sql);



// Check if there are any products
if ($result->num_rows > 0) {
    // Initialize an empty array to store products
    $products = [];

    // Fetch products and store them in the array
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    // Convert the products array to JSON format
    $json_products = json_encode($products);

    // Output the JSON data
    echo $json_products;
} else {
    echo "No products found.";
}

// Close database connection
$conn->close();
?>
