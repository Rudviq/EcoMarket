<?php

    session_start();
    require_once "db_connection.php";


    
    // Fetch product details based on product ID
    $productId = $_GET['id']; // Get product ID from the query parameters
    $sql = "SELECT * FROM feedback f JOIN users u ON u.UserID = f.UserID WHERE ProductID = $productId";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Product found, return product details as JSON
        $products = array(); // Array to hold all fetched products
        while ($row = $result->fetch_assoc()) {
            // Add each row (product) to the array
            $products[] = $row;
        }
        // $product = $result->fetch_assoc();
        echo json_encode($products);
    } else {
        // Product not found
        echo json_encode(['error' => 'Product not found']);
    }

    $conn->close();
?>
