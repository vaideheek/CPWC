<?php
// Start session to access session variables
session_start();

// Check if the user is logged in by checking the session variable
if (!isset($_SESSION['UserID'])) {
    // Redirect to login page if not logged in
    header("Location: /CPWC/CPWC/frontend/login.html");
    exit();
}

// Include database connection
include '../db_connect.php';

// Get user ID from session
$userID = $_SESSION['UserID'];

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Collect user data from the form
    $name = trim($_POST['name']);
    $phone = trim($_POST['phone']);
    $address = trim($_POST['address']);

    // Update user details in the database
    $query = "UPDATE user SET Name = ?, Phone = ?, Address = ? WHERE UserID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sssi", $name, $phone, $address, $userID);

    if ($stmt->execute()) {
        // Successfully updated
        $_SESSION['success'] = "Profile updated successfully!";
    } else {
        // Update failed
        $_SESSION['error'] = "Failed to update profile. Please try again.";
    }

    $stmt->close();
    $conn->close();

    // Redirect back to profile page
    header("Location: profile.php");
    exit();
}
?>
