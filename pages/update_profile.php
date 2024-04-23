<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            margin: 30px auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            text-align: center;
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input[type="text"],
        input[type="email"],
        input[type="password"] {
            width: calc(100% - 22px);
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
        }
        button[type="submit"],
        button[type="button"] {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            display: inline-block;
            margin-right: 10px;
        }
        button[type="submit"]:hover,
        button[type="button"]:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <?php include 'header.php'; ?><br>
    <br>
    <div class="container">
        <br>
        <br>
        <h2>Profile</h2>
        <?php
        session_start();

        // Check if user is logged in
        if (!isset($_SESSION['email'])) {
            // Redirect to login page if not logged in
            header("Location: login.html");
            exit();
        }

        // Retrieve the email of the logged-in user
        $email = $_SESSION['email'];

        // Database connection parameters
        $servername = "localhost";
        $username = "root"; // Replace with your MySQL username
        $password = ""; // Replace with your MySQL password
        $database = "ecomarket"; // Replace with your database name

        // Create connection
        $conn = new mysqli($servername, $username, $password, $database);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Query to retrieve user details based on email
        $query = "SELECT * FROM users WHERE email = '$email'";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            // Fetch user details
            $row = $result->fetch_assoc();
            $fullname = $row['fullname'];
            $email = $row['email'];
            $address1 = $row['address1'];
            $address2 = $row['address2'];
            $city = $row['city'];
            $state = $row['state'];
            $zip = $row['zip'];

            // Close database connection
            $conn->close();
        ?>
        <form id="profileForm" action="update_profile.php" method="post" onsubmit="return confirmSave()">
            <label for="fullname">Full Name:</label>
            <input type="text" id="fullname" name="fullname" value="<?php echo $fullname; ?>" required disabled>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="<?php echo $email; ?>" required disabled>
            <label for="address1">Address Line 1:</label>
            <input type="text" id="address1" name="address1" value="<?php echo $address1; ?>" disabled>
            <label for="address2">Address Line 2:</label>
            <input type="text" id="address2" name="address2" value="<?php echo $address2; ?>" disabled>
            <label for="city">City:</label>
            <input type="text" id="city" name="city" value="<?php echo $city; ?>" disabled>
            <label for="state">State:</label>
            <input type="text" id="state" name="state" value="<?php echo $state; ?>" disabled>
            <label for="zip">Zip:</label>
            <input type="text" id="zip" name="zip" value="<?php echo $zip; ?>" disabled>
            <button type="button" onclick="editProfile()">Edit</button>
            <button type="submit" id="saveButton" style="display: none;">Save</button>
            <br>
            <br>
        </form>
        <?php
        } else {
            echo "User not found.";
        }
        ?>
    </div>
    <script>
        function editProfile() {
            document.getElementById('fullname').removeAttribute('disabled');
            document.getElementById('address1').removeAttribute('disabled');
            document.getElementById('address2').removeAttribute('disabled');
            document.getElementById('city').removeAttribute('disabled');
            document.getElementById('state').removeAttribute('disabled');
            document.getElementById('zip').removeAttribute('disabled');
            document.getElementById('saveButton').style.display = 'inline-block';
        }

        function confirmSave() {
            var result = confirm("Are you sure you want to save the changes?");
            if (result) {
                return true;
            } else {
                return false;
            }
        }
    </script>
</body>
</html>
