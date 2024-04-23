<?php
session_start();
require_once "db_connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];
    // $userId = $_POST["UserID"];
    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {

        $row = $result->fetch_assoc();
        $userId = $row['UserID'];
        $_SESSION['user_id'] = $userId;
        $_SESSION['user_name'] = $row['Username'];
        $_SESSION["loggedin"] = true;
        $_SESSION["email"] = $email;
        header("location: homePage.html"); // Redirect to dashboard or homepage
        exit;
    } else {
        
        header("location: login_.php?login_err=Invalid email or password");
        exit();
    }

}
?>
