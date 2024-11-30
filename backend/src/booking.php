<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['UserID'])) {
    header("Location: /CPWC/CPWC/frontend/login.html");
    exit();
}

// Include the database connection
include '../db_connect.php';

// Get the serviceID from the query parameter
$serviceID = $_GET['serviceID'] ?? null;

// Ensure serviceID is not null or empty
if (empty($serviceID)) {
    echo json_encode(['error' => 'Service ID is required']);
    exit();
}

// Fetch service details from the database
$query = "SELECT s.Title, s.Description, s.Price, b.ScheduledDate, b.ScheduledTime
          FROM Service s
          LEFT JOIN Booking b ON s.ServiceID = b.ServiceID
          WHERE s.ServiceID = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $serviceID);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $serviceData = $result->fetch_assoc();
    echo json_encode($serviceData);  // Return service data as JSON
} else {
    echo json_encode(['error' => 'No service found for the given ID.']);
}

$stmt->close();
$conn->close();
?>
