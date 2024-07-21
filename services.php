<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tidetrade";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, provider_id, category, title, description, price, created_at FROM services";
$result = $conn->query($sql);

$services = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $services[] = $row;
    }
} else {
    echo "0 results";
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($services);
?>


