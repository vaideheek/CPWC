<?php
// Include database connection
include '../db_connect.php';

// Start session to store user info upon successful login
session_start();

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Collect email and password from form
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = "Invalid email format!";
        header("Location: ../../frontend/login.html"); // Redirect back to login page
        exit();
    }

    // Prepare the SQL query to check if the email exists
    $sql = "SELECT * FROM user WHERE Email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Check if the email exists
    if ($result->num_rows > 0) {
        // Fetch the user details
        $user = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $user['Password'])) {
            // Password is correct, start a session and store user info
            $_SESSION['UserID'] = $user['UserID'];
            $_SESSION['Name'] = $user['Name'];
            $_SESSION['Role'] = $user['Role'];

            // Redirect to the homepage or dashboard
            header("Location: /CPWC/CPWC/frontend/index.html"); // Corrected path to the homepage
            exit();
        } else {
            // Incorrect password
            $_SESSION['error'] = "Invalid password!";
            alert('Please select a service, location, and date.');
            header("Location: /CPWC/CPWC/frontend/login.html"); // Redirect back to login page
            exit();
        }
    } else {
        // Email not found
        $_SESSION['error'] = "No user found with that email address!";
        header("Location: /CPWC/CPWC/frontend/index.html"); // Redirect back to login page
        exit();
    }

    // Close the database connection
    $conn->close();
}
?>
