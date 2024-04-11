<?php
// Database connection code (Replace with your actual connection code)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ecomarket";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch product details based on product ID
$productId = $_GET['id']; // Get product ID from the query parameters
$sql = "SELECT * FROM products WHERE ProductID = $productId";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Product found, return product details as JSON
    $product = $result->fetch_assoc();
    echo json_encode($product);
} else {
    // Product not found
    echo json_encode(['error' => 'Product not found']);
}

$conn->close();
?>
