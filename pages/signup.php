<?php


    session_start();
    require_once "db_connection.php";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $fname = $_POST["fname"];
        $lname = $_POST["lname"];
        $email = $_POST["email"];
        $password = $_POST["password"];
        $cpassword = $_POST["cpassword"];

        if($password != $cpassword){
            // $_SESSION["signup_err"] = "Passwords do not match.";
            header("location: signup_.php?signup_err=Passwords do not match."); // Redirect back to the signup page
            exit;
        }

        // Check if the email is already registered
        $sql = "SELECT UserID FROM users WHERE email = '$email'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            header("location: signup_.php?signup_err=Email already registered");
            exit;
        }

        // Generate username (first letter of last name + first name)
        $username = $fname;

        // Determine the default photo based on the first letter of the first name
        $defaultPhoto = "../assets/" . strtolower(substr($fname, 0, 1)) . ".png";

        // Insert user data into database
        $sql = "INSERT INTO users(Username, LastName, email, Password, Photo) VALUES('$username', '$lname', '$email', '$password', '$defaultPhoto')";
        if ($conn->query($sql) === TRUE) {
            header("location: login_.php?signup_success=Ready to Login");
            exit;
        } else {
            header("location: signup_.php?signup_err=Error");
            exit;
        }


    }

?>