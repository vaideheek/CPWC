<?php
include '../db_connect.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $service = $_POST['service'] ?? null;
    $location = $_POST['location'] ?? null;
    $date = $_POST['date'] ?? null;

    $query = "SELECT s.Title, s.Description, sp.Location, s.Price, s.Duration 
              FROM Service s 
              JOIN ServiceProvider sp ON s.ProviderID = sp.ProviderID 
              WHERE s.Status = 'Active'";

    if ($service) {
        $query .= " AND s.Title LIKE ?";
        $params[] = "%$service%";
    }

    if ($location) {
        $query .= " AND sp.Location = ?";
        $params[] = $location;
    }

    $stmt = $conn->prepare($query);
    if (!empty($params)) {
        $stmt->bind_param(str_repeat('s', count($params)), ...$params);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $services = [];
        while ($row = $result->fetch_assoc()) {
            $services[] = $row;
        }
        echo json_encode($services);
    } else {
        echo json_encode([]);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

$conn->close();
?>
