<?php
session_start();
require_once "db_connection.php";

// SQL query to fetch products
$sql = "SELECT * FROM products";

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
