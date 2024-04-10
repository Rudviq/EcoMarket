<?php

session_start();
require_once "db_connection.php";

// Fetch categories from the database
$sql = "SELECT * FROM categories";
$result = $conn->query($sql);

// Check if categories exist
if ($result->num_rows > 0) {
 
    $categories = [];

    // Fetch products and store them in the array
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }

    // Convert the products array to JSON format
    $json_categories = json_encode($categories);

    // Output the JSON data
    echo $json_categories;
} else {
    echo "0 results";
}
$conn->close();
?>
