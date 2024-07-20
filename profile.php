<?php
session_start();
require_once "db_connect.php";

// Check if the user is logged in, otherwise redirect to login page
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: login.php");
    exit;
}

// Query database to get user details
$sql = "SELECT username, email FROM users WHERE id = ?";
if ($stmt = $mysqli->prepare($sql)) {
    $stmt->bind_param("i", $param_id);
    
    // Set parameters
    $param_id = $_SESSION["id"];
    
    // Attempt to execute the prepared statement
    if ($stmt->execute()) {
        $stmt->store_result();
        
        // Check if user exists
        if ($stmt->num_rows == 1) {
            $stmt->bind_result($username, $email);
            $stmt->fetch();
        } else {
            // Redirect to login page if user does not exist (should not happen in a properly functioning system)
            header("location: login.php");
            exit;
        }
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
    
    // Close statement
    $stmt->close();
}

// Close connection
$mysqli->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
</head>
<body>
    <h2>User Profile</h2>
    <p><strong>Username:</strong> <?php echo $username; ?></p>
    <p><strong>Email:</strong> <?php echo $email; ?></p>
    
    <a href="reset_password.php">Reset Password</a>
    <br>
    <a href="logout.php">Logout</a>
</body>
</html>
