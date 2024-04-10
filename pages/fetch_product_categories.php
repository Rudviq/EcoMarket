<?php

$conn = new mysqli('localhost', 'root', '', 'ecomarket');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch product categories from the database
$sql = "SELECT ProductID, GROUP_CONCAT(CategoryID) AS CategoryIDs FROM productcategories GROUP BY ProductID";
$result = $conn->query($sql);

// Check if product categories exist
if ($result->num_rows > 0) {
    $productCategories = array();

    // Store product categories in an associative array
    while ($row = $result->fetch_assoc()) {
        $productCategories[$row['ProductID']] = explode(',', $row['CategoryIDs']);
    }

    // Convert the product categories array to JSON format
    echo json_encode($productCategories);
} else {
    echo "0 results";
}

$conn->close();
?>
