<?php

    session_start();
    require_once "db_connection.php";

    // Fetch product details based on product ID
    $Id = $_GET['id']; // Get product ID from the query parameters
    $sql = "SELECT * FROM users WHERE userID = $Id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Product found, return product details as JSON
        $user= $result->fetch_assoc();
        echo json_encode($user);
    } else {
        // Product not found
        echo json_encode(['error' => 'User not found']);
    }

    $conn->close();
?>
