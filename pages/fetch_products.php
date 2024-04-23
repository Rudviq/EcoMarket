<?php
session_start();
require_once "db_connection.php";

$page = isset($_GET['page']) ? $_GET['page'] : 1;
$limit = 16; // Number of products per page
$offset = ($page - 1) * $limit;


// SQL query to fetch products
$sql = "SELECT * FROM products P";

// If selected categories are provided, add a WHERE clause to filter products by those categories
if (isset($_GET['categories'])) {
    // Fetch selected categories from the query parameters
        $selectedCategories = isset($_GET['categories']) ? explode(',', $_GET['categories']) : array();
    $sql .= " INNER JOIN productcategories PC ON PC.ProductID = P.ProductID INNER JOIN Categories C ON C.CategoryID = PC.CategoryID WHERE C.CategoryID IN ('" . implode("', '", $selectedCategories) . "')";
}


$filter = isset($_GET['filter']) ? $_GET['filter'] : null;
if($filter){
    if($filter== 1){
        $sql .= " ORDER BY P.Price ASC";
        // $sql .= " OFFSET $offset LIMIT $limit ";
       
    }
    elseif($filter ==  2){
        $sql .= " ORDER BY P.Price DESC";
        // $sql .= " LIMIT $limit OFFSET $offset";
    }
    elseif($filter ==  12){
        $sql .= " LIMIT 12";
    }
    else{
        // $sql .= " LIMIT $limit OFFSET $offset";
    }
    

}

if(isset($_GET['artisan_id'])){
    $artisanID = $_GET['artisan_id'];
    $sql .= " WHERE ArtisanID = $artisanID";
}

// $sql .= " LIMIT $limit OFFSET $offset";
// $sql .=" LIMIT 50";

// Execute the query
$result = $conn->query($sql);



// Check if there are any products
if ($result->num_rows > 0) {
    // Initialize an empty array to store products
    $products = [];

    // Fetch products and store them in the array
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    // Convert the products array to JSON format
    $json_products = json_encode($products);

    // Output the JSON data
    echo $json_products;
} else {
    echo "No products found.";
}

// Close database connection
$conn->close();
?>
