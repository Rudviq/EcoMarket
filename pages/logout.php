<?php

session_start();
require_once "db_connection.php";

unset($_SESSION['user_id']);
unset($_SESSION['user_name']);

echo json_encode('Logged Out');
?>