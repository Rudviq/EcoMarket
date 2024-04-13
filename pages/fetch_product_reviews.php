<?php

    session_start();
    require_once "db_connection.php";

    // Fetch product details based on product ID
    $productId = $_GET['id'];

    $sql = "SELECT AVG(Rating) as star FROM Feedback WHERE ProductId= $productId GROUP BY ProductID;";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        $star = $result->fetch_assoc();
        // echo json_encode($star);
    }
    else {
        // Product not found
        echo json_encode(['error' => 'Reviews not found']);
    }

    $t_sql = "SELECT COUNT(*) as c FROM Feedback WHERE ProductID = $productId GROUP BY ProductID;";
    $t_result = $conn->query($t_sql);

    if($t_result->num_rows > 0){
        $tcount = $t_result->fetch_assoc();
        // echo json_encode($tcount);
    }
    else {
        
        $tcount = ['c' => 0];
    }

    $sql5 = "SELECT COUNT(*) as f FROM Feedback WHERE ProductID = $productId  AND rating=5 GROUP BY ProductID;";
    $result5 = $conn->query($sql5);

    if($result5->num_rows > 0){
        $count5 = $result5->fetch_assoc();
    }
    else {
        $count5 = ['f' => 0];
    }

    $sql4 = "SELECT COUNT(*) as four FROM Feedback WHERE ProductID = $productId  AND rating=4 GROUP BY ProductID;";
    $result4 = $conn->query($sql4);

    if($result4->num_rows > 0){
        $count4 = $result4->fetch_assoc();
    }
    else {
        $count4 = ['four' => 0];
    }

    $sql3 = "SELECT COUNT(*) as three FROM Feedback WHERE ProductID = $productId  AND rating=3 GROUP BY ProductID;";
    $result3 = $conn->query($sql3);

    if($result3->num_rows > 0){
        $count3 = $result3->fetch_assoc();
    }
    else {
        $count3 = ['three' => 0];
    }

    $sql2 = "SELECT COUNT(*) as two FROM Feedback WHERE ProductID = $productId  AND rating=2 GROUP BY ProductID;";
    $result2 = $conn->query($sql2);

    if($result2->num_rows > 0){
        $count2 = $result2->fetch_assoc();
    }
    else {
        $count2 = ['two' => 0];
    }

    $sql1 = "SELECT COUNT(*) as one FROM Feedback WHERE ProductID = $productId  AND rating=1 GROUP BY ProductID;";
    $result1 = $conn->query($sql1);

    if($result1->num_rows > 0){
        $count1 = $result1->fetch_assoc();
    }
    else {
        $count1 = ['one' => 0];
    }
    // Combine product details and rating into a single array
    $response = [
        'tcount' => $tcount,
        'star' => $star,
        'count5' => $count5,
        'count4' => $count4,
        'count3' => $count3,
        'count2' => $count2,
        'count1' => $count1
    ];

    echo json_encode($response);
        
    $conn->close();
?>