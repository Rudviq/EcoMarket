<?php
// Include your database connection file
include 'db_connection.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the user ID and updated details from the POST request
    $userId = $_POST['userId'];
    $updatedUsername = $_POST['username'];
    $updatedEmail = $_POST['email'];
    $updatedLastName = $_POST['lastname'];

    // Prepare the SQL statement to update user details
    $sql = "UPDATE users SET Username = ?, Email = ?, LastName = ? WHERE UserID = ?";

    // Prepare and execute the statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind parameters
        $stmt->bind_param("sssi", $updatedUsername, $updatedEmail, $updatedLastName, $userId);

        // Attempt to execute the prepared statement
        if ($stmt->execute()) {
            // Fetch the updated details from the database
            $updatedDetails = array(
                'username' => $updatedUsername,
                'email' => $updatedEmail,
                'lastname' => $updatedLastName,
                'redirect_url' => 'profile.html' // Profile page URL
            );

            // Convert the updated details array to JSON format
            echo json_encode($updatedDetails);
        } else {
            // If the update fails, return an error message
            http_response_code(500);
            echo json_encode(array('error' => 'Failed to update user details'));
        }

        // Close statement
        $stmt->close();
    } else {
        // If the SQL statement preparation fails, return an error message
        http_response_code(500);
        echo json_encode(array('error' => 'Error preparing SQL statement'));
    }

    // Close connection
    $conn->close();
} else {
    // If the request method is not POST, return an error message
    http_response_code(405);
    echo json_encode(array('error' => 'Method Not Allowed'));
}
?>
