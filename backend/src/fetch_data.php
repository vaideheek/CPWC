<?php
include '../db_connect.php'; // Make sure this path is correct

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);  // Enable error reporting
ini_set('display_errors', 1);

// Start session to check if the user is logged in
session_start();

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['type'])) {
        $type = $_GET['type'];

        if ($type === 'categories') {
            // Fetch categories from the Category table
            $query = "SELECT Name, Description FROM Category";
            $result = $conn->query($query);

            if ($result && $result->num_rows > 0) {
                $categories = [];
                while ($row = $result->fetch_assoc()) {
                    $categories[] = $row; // Collect categories
                }
                $response['categories'] = $categories;
            } else {
                $response['categories'] = [];  // Empty array if no categories are found
            }
        } elseif ($type === 'services') {
            // Fetch service titles from the Service table
            $query = "SELECT DISTINCT Title FROM Service WHERE Status = 'Active'";
            $result = $conn->query($query);

            if ($result && $result->num_rows > 0) {
                $services = [];
                while ($row = $result->fetch_assoc()) {
                    $services[] = $row['Title']; // Collect service titles
                }
                $response['services'] = $services;
            } else {
                $response['services'] = [];  // Empty array if no services are found
            }
        } elseif ($type === 'locations') {
            // Fetch unique locations from ServiceProvider
            $query = "SELECT DISTINCT Location FROM ServiceProvider";
            $result = $conn->query($query);

            if ($result && $result->num_rows > 0) {
                $locations = [];
                while ($row = $result->fetch_assoc()) {
                    $locations[] = $row['Location']; // Collect locations
                }
                $response['locations'] = $locations;
            } else {
                $response['locations'] = [];  // Empty array if no locations are found
            }
        } if ($type === 'search') {
            // Search for services based on the selected service and/or location
            $service = $_GET['service'] ?? 'Any Service';
            $location = $_GET['location'] ?? 'Any Location';
            $date = $_GET['date'] ?? '';
        
            // Base query
            $query = "SELECT s.ServiceID, s.Title, s.Description, s.Price, s.Duration, sp.Location, sp.ProviderID, AVG(r.RatingScore) AS Rating
            FROM Service s
            JOIN ServiceProvider sp ON s.ProviderID = sp.ProviderID
            LEFT JOIN Rating r ON s.ServiceID = r.ServiceID
            WHERE s.Status = 'Active'";
        
            // Add conditions dynamically based on user selections
            if ($service !== 'Any Service') {
                $query .= " AND s.Title LIKE '%$service%'";
            }
        
            if ($location !== 'Any Location') {
                $query .= " AND sp.Location = '$location'";
            }
        
            if (!empty($date)) {
                // Add a condition for the date, ensuring there are no bookings for that day
                $query .= " AND NOT EXISTS (SELECT * FROM booking b WHERE b.ServiceID = s.ServiceID AND b.ScheduledDate = '$date')";
            }
        
            $query .= " GROUP BY s.ServiceID";

            // Execute the query
            $result = $conn->query($query);
        
            if ($result && $result->num_rows > 0) {
                $services = [];
                while ($row = $result->fetch_assoc()) {
                    $services[] = $row; // Collect matching service details
                }
                $response['services'] = $services;
            } else {
                $response['services'] = []; // No matching services found
            }
        
        } else {
            $response['error'] = 'Invalid type parameter';
        }
    } else {
        $response['error'] = 'Type parameter is missing';
    }

    // Check if the user is logged in and add user info to the response
    if (isset($_SESSION['UserID'])) {
        // Include user's name and logout option
        $response['user'] = [
            'name' => $_SESSION['Name'],
            'logout_url' => 'logout.php'
        ];
    }

} else {
    $response['error'] = 'Invalid request method';
}

$conn->close();

// Output the response as JSON
echo json_encode($response);
?>
