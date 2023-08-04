<?php

$mysqli = require __DIR__ . "/database.php";

if (isset($_GET["email"])) {
    $email = $_GET["email"];

    // Check if the email is empty
    if (empty($email)) {
        $response = ["available" => true]; // Email is available if empty
    } else {
        $stmt = $mysqli->prepare("SELECT COUNT(*) FROM user WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();

        $response = ["available" => $count === 0];
    }

    echo json_encode($response);
}
