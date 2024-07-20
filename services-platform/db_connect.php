<?php
$servername = "localhost";
$username = "root"; // Replace with your MySQL username
$password = ""; // No password
$dbname = "tide_trade_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conns->connect_error);
} else {
    echo "Connected successfully";
}
?>

