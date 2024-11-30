<?php
// Start the session
session_start();

// Include the database connection
include '../db_connect.php';

// Check if the user is logged in by verifying the session variable
if (!isset($_SESSION['UserID'])) {
    header("Location: /CPWC/CPWC/frontend/login.html");  // Redirect if not logged in
    exit();
}

// Get user data based on session
$userID = $_SESSION['UserID'];
$query = "SELECT Name, Email, Phone, Address FROM user WHERE UserID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();

// Fetch user data
$userData = $result->fetch_assoc();
$stmt->close();

// Get services and comments for the user
$servicesQuery = "SELECT Title, Description FROM service WHERE ProviderID = ?";
$stmt = $conn->prepare($servicesQuery);
$stmt->bind_param("i", $userID);
$stmt->execute();
$servicesResult = $stmt->get_result();
$services = $servicesResult->fetch_all(MYSQLI_ASSOC);

$commentsQuery = "SELECT Feedback, RatingScore FROM rating WHERE UserID = ?";
$stmt = $conn->prepare($commentsQuery);
$stmt->bind_param("i", $userID);
$stmt->execute();
$commentsResult = $stmt->get_result();
$comments = $commentsResult->fetch_all(MYSQLI_ASSOC);
$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile | The Hub</title>
    <link rel="stylesheet" href="/CPWC/CPWC/frontend/css/profile.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body>
    <!-- Header -->
    <header class="header">
        <a href="./">
            <h1 class="logo">THE HUB</h1>
        </a>
        <nav class="nav">
            <a href="/CPWC/CPWC/backend/src/profile.php" class="nav-link active">Profile</a>
            <a href="/CPWC/CPWC/backend/src/logout.php" class="nav-link">Log Out</a>
        </nav>
    </header>

    <!-- Main Content -->
    <main class="container">
        <div class="profile-box">
            <!-- Profile Icon -->
            <div class="profile-icon">
                <img src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="User Icon">
                <div class="rating">
                    <i class="fa fa-star yellow"></i>
                    <i class="fa fa-star yellow"></i>
                    <i class="fa fa-star yellow"></i>
                    <i class="fa fa-star yellow"></i>
                    <i class="fa fa-star"></i>
                </div>
            </div>

            <!-- Profile Information -->
            <div class="profile-info">
                <h2>Profile Information</h2>
                <form id="profile-form">
                    <label>Name</label>
                    <input type="text" id="name" value="John Doe" disabled>
                    <label>Email</label>
                    <input type="email" id="email" value="john.doe@example.com" disabled>
                    <label>Phone</label>
                    <input type="tel" id="phone" value="123-456-7890" disabled>
                    <label>Address</label>
                    <input type="text" id="address" value="1234 Street, City, Country" disabled>
                    <button type="button" id="edit-btn">Edit</button>
                </form>
            </div>

            <!-- Services -->
             <!-- Services -->
             <div class="profile-services">
                <h3>My Services</h3>
                <ul>
                    <?php foreach ($services as $service) : ?>
                        <li><?php echo htmlspecialchars($service['Title']) . " - " . htmlspecialchars($service['Description']); ?></li>
                    <?php endforeach; ?>
                </ul>
                <button id="add-service-btn" class="btn">Add New Service</button>
                <div id="add-service-form-container" class="hidden">
                    <form id="add-service-form">
                        <label for="service-name">Service Name</label>
                        <input type="text" id="service-name" name="service-name" placeholder="Enter service name"
                            required>
                        <label for="service-date">Date</label>
                        <input type="date" id="service-date" name="service-date" required>
                        <div class="file-upload-container">
                            <label for="file-upload" class="custom-file-upload">
                                Choose File
                            </label>
                            <input type="file" id="file-upload" />
                        </div>
                        <button type="submit" class="btn">Submit</button>
                    </form>
                </div>
            </div>

            <!-- Services -->
            <!-- <section class="services">
                <h3>My Services</h3>
                <div class="service-cards" id="service-cards"></div>
                <button id="add-service-btn" class="btn">Add New Service</button>
                <div id="add-service-form-container" class="hidden">
                    <form id="add-service-form">
                        <label for="service-name">Service Name</label>
                        <input type="text" id="service-name" name="service-name" placeholder="Enter service name"
                            required>
                        <label for="service-date">Date</label>
                        <input type="date" id="service-date" name="service-date" required>
                        <div class="file-upload-container">
                            <label for="file-upload" class="custom-file-upload">
                                Choose File
                            </label>
                            <input type="file" id="file-upload" />
                        </div>
                        <button type="submit" class="btn">Submit</button>
                    </form>
                </div>
            </section> -->



            <!-- Comments -->
            <div class="profile-comments">
                <h3>User Comments</h3>
                <ul>
                    <li>"Great service!" - Alice</li>
                    <li>"Very helpful and professional." - Bob</li>
                    <li>"Highly recommended!" - Charlie</li>
                </ul>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <p>The HUB | <a href="/CPWC/CPWC/frontend/faq.html" target="_blank">FAQs</a> | <a href="#">Terms and Conditions</a></p>
        <p>&copy; Copyright 2024 The HUB. All Rights Reserved</p>
    </footer>

    <script src="/CPWC/CPWC/frontend/js/profile.js"></script>
</body>

</html>

