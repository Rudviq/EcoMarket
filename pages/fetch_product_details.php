<?php

    session_start();
    require_once "db_connection.php";

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
