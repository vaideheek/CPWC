<?php
include '../db_connect.php'; // Adjust the path based on your project structure

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);  // Enable error reporting
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['type'])) {
        $type = $_GET['type'];

        if ($type === 'services') {
            // Fetch service categories
            $query = "SELECT Name FROM Category";
            $result = $conn->query($query);

            if ($result && $result->num_rows > 0) {
                $services = [];
                while ($row = $result->fetch_assoc()) {
                    $services[] = $row['Name'];
                }
                echo json_encode($services);
            } else {
                echo json_encode([]);  // Empty array if no services are found
            }
        } elseif ($type === 'locations') {
            // Fetch unique locations
            $query = "SELECT Location FROM ServiceProvider";
            $result = $conn->query($query);

            if ($result && $result->num_rows > 0) {
                $locations = [];
                while ($row = $result->fetch_assoc()) {
                    $locations[] = $row['Location'];
                }
                echo json_encode($locations);
            } else {
                echo json_encode([]);  // Empty array if no locations are found
            }
        } else {
            echo json_encode(['error' => 'Invalid type parameter']);
        }
    } else {
        echo json_encode(['error' => 'Type parameter is missing']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

$conn->close();
?>
