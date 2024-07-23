<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $service_id = $_POST['service_id'];
    $user_id = $_POST['user_id'];
    $rating = $_POST['rating'];
    $comment = $_POST['comment'];

    $stmt = $conn->prepare("INSERT INTO reviews (service_id, user_id, rating, comment) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiis", $service_id, $user_id, $rating, $comment);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Review submitted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to submit review."]);
    }

    $stmt->close();
    $conn->close();
}
?>
