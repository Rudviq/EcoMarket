<?php
session_start();

$response = []; // Initialize an empty array to store the response data

// Check if user is logged in and get userId and userName from session
if (isset($_SESSION['user_id'])) {
  $userId = $_SESSION['user_id'];
  $response['user_id'] = $userId;
} else {
  $response['user_id'] = null;
}

if (isset($_SESSION['user_name'])) {
  $userName = $_SESSION['user_name'];
  $response['user_name'] = $userName;
} else {
  $response['user_name'] = null;
}

// Output the response as JSON
echo json_encode($response);
?>
