<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tide_trade";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user ID from session
$user_id = $_SESSION['user_id'];

$name = $_POST['name'];
$description = $_POST['description'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$location = $_POST['location'];

// Handle image uploads
$profile_image = $_POST['current_profile_image'];
$work_image = $_POST['current_work_image'];

if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] == UPLOAD_ERR_OK) {
    $profile_image = 'uploads/' . basename($_FILES['profile_image']['name']);
    move_uploaded_file($_FILES['profile_image']['tmp_name'], $profile_image);
}

if (isset($_FILES['work_image']) && $_FILES['work_image']['error'] == UPLOAD_ERR_OK) {
    $work_image = 'uploads/' . basename($_FILES['work_image']['name']);
    move_uploaded_file($_FILES['work_image']['tmp_name'], $work_image);
}

// Update provider profile
$sql = "UPDATE providers SET description=?, phone=?, address=?, location=?, profile_image=?, work_image=? WHERE user_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssi", $description, $phone, $address, $location, $profile_image, $work_image, $user_id);

if ($stmt->execute()) {
    echo "Profile updated successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
