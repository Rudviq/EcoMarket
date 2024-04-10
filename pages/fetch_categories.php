<?php
// Database connection code (Replace with your actual connection code)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ecomarket";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch categories from the database
$sql = "SELECT * FROM categories";
$result = $conn->query($sql);

// Check if categories exist
if ($result->num_rows > 0) {
    // Output data of each row
    // while($row = $result->fetch_assoc()) {
    //     echo '<div class="category-card">';
    //     echo '<img src="../assets/' . $row["image"] . '" alt="' . $row["name"] . '">';
    //     echo '<div class="category-text">';
    //     echo '<span><h3>' . $row["name"] . '</h3></span>';
    //     echo '</div>';
    //     echo '</div>';
    // }

    $categories = [];

    // Fetch products and store them in the array
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }

    // Convert the products array to JSON format
    $json_categories = json_encode($categories);

    // Output the JSON data
    echo $json_categories;
} else {
    echo "0 results";
}
$conn->close();
?>
