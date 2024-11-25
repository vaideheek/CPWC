<?php
// Include your database connection
include '../db_connect.php';

// Start a session if needed
session_start();

// Fetch users from the database
$sql = "SELECT UserID, Password FROM User"; // Select only the UserID and Password fields
$result = $conn->query($sql);

// Check if there are any users
if ($result->num_rows > 0) {
    // Loop through the users and hash their passwords
    while ($user = $result->fetch_assoc()) {
        // Hash the password using password_hash function
        $hashedPassword = password_hash($user['Password'], PASSWORD_DEFAULT);

        // Prepare the SQL query to update the password
        $updateSql = "UPDATE User SET Password = ? WHERE UserID = ?";
        $stmt = $conn->prepare($updateSql);
        $stmt->bind_param("si", $hashedPassword, $user['UserID']);
        
        // Execute the query
        if ($stmt->execute()) {
            echo "Password for user ID " . $user['UserID'] . " has been updated successfully.<br>";
        } else {
            echo "Error updating password for user ID " . $user['UserID'] . ": " . $stmt->error . "<br>";
        }
    }
} else {
    echo "No users found in the database.<br>";
}

// Close the database connection
$conn->close();
?>
