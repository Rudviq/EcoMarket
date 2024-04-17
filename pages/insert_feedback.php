<?php
session_start();
require_once "db_connection.php";

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the SQL query from the request body
    $data = json_decode(file_get_contents("php://input"), true);
    $sql = $data['sql'];

    // Execute the SQL query
    if ($conn->query($sql) === TRUE) {
        // Feedback inserted successfully
        $response = array("success" => true, "message" => "Feedback inserted successfully");
        echo json_encode($response);
    } else {
        // Failed to insert feedback
        $response = array("success" => false, "message" => "Error: " . $conn->error);
        echo json_encode($response);
    }
} else {
    // Invalid request method
    $response = array("success" => false, "message" => "Invalid request method");
    echo json_encode($response);
}

// Close the database connection
$conn->close();
?>
