<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize user input
    $input = json_decode(file_get_contents('php://input'), true);
    $email = filter_var($input["email"], FILTER_SANITIZE_EMAIL);

    // Replace with actual database connection details
    $servername = "localhost";
    $username = "username";
    $password_db = "password";
    $dbname = "database_name";

    // Create connection
    $conn = new mysqli($servername, $username, $password_db, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // SQL query to check if the email exists
    $sql = "SELECT id FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);

    // Execute the query
    $stmt->execute();
    $stmt->store_result();

    // Check if a user was found
    if ($stmt->num_rows > 0) {
        // Generate a unique password reset token
        $token = bin2hex(random_bytes(50));
        
        // Store the token in the database with an expiration time
        $expire_time = date("Y-m-d H:i:s", strtotime('+1 hour'));
        $update_sql = "UPDATE users SET reset_token = ?, reset_expire = ? WHERE email = ?";
        $update_stmt = $conn->prepare($update_sql);
        $update_stmt->bind_param("sss", $token, $expire_time, $email);
        $update_stmt->execute();

        // Send password reset link to the user's email
        $reset_link = "http://yourwebsite.com/reset-password.php?token=" . $token;
        $subject = "Password Reset Request";
        $message = "Click the following link to reset your password: " . $reset_link;
        $headers = "From: no-reply@yourwebsite.com";

        if (mail($email, $subject, $message, $headers)) {
            $response = array("success" => true);
        } else {
            $response = array("success" => false, "message" => "Failed to send email.");
        }
    } else {
        // Email not found
        $response = array("success" => false, "message" => "Email not found.");
    }

    // Close the prepared statement and database connection
    $stmt->close();
    $conn->close();

    // Send JSON response back to the JavaScript frontend
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
} else {
    // If the request method is not POST, redirect to forgot password page
    header("Location: forgot-password.html");
    exit;
}
?>
