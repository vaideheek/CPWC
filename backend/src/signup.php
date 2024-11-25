<?php
// Include database connection
include '../db_connect.php';

// Function to sanitize input
function sanitizeInput($data)
{
    return htmlspecialchars(stripslashes(trim($data)));
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $email = sanitizeInput($_POST['email']);
    $password = sanitizeInput($_POST['password']);
    $role = sanitizeInput($_POST['role']);
    $taxID = isset($_POST['taxID']) ? sanitizeInput($_POST['taxID']) : null; // Only for providers

    // Check if email already exists
    $sql = "SELECT * FROM User WHERE Email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "Email is already taken. Please choose another one.";
        exit();
    }

    // Validate password
    if (!preg_match("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/", $password)) {
        echo "Password must have at least 10 characters, one letter, one number, and one special character.";
        exit();
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Validate tax number if the role is "Provider"
    if ($role == 'Provider' && empty($taxID)) {
        echo "Tax number is required for service providers.";
        exit();
    }

    // Prepare SQL to insert new user
    $sql = "INSERT INTO User (Email, Password, Role, TaxID) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Bind parameters
    if ($role == 'Provider') {
        $stmt->bind_param("ssss", $email, $hashedPassword, $role, $taxID);
    } else {
        $taxID = null;  // Set taxID to null for customers
        $stmt->bind_param("ssss", $email, $hashedPassword, $role, $taxID); // Bind only 3 params if no taxID
    }

    // Execute query
    if ($stmt->execute()) {
        echo "Registration successful!";
        // Redirect to login page or index
        header("Location: /CPWC/frontend/login.html"); // Change this to your login page
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
