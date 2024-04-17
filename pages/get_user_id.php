<?php
session_start();

// Check if user is logged in and get userId from session
if (isset($_SESSION['user_id'])) {
  $userId = $_SESSION['user_id'];
  echo json_encode(['user_id' => $userId]);
} else {
  echo json_encode(['user_id' => null]);
}
?>
