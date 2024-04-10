<?php


$conn = new mysqli('localhost', 'root', '', 'ecomarket');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch categories from the database
$sql = "SELECT Cname FROM categories";
$result = $conn->query($sql);

$categories = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row["category_name"];
    }
}

// Close database connection
$conn->close();

// Output categories as JSON
echo json_encode($categories);
?>
