<?php
// Start session to access the session variables
session_start();

// Check if the user is logged in by checking the session variable
if (isset($_SESSION['UserID'])) {
    // Get user information from session variables
    $email = $_SESSION['Email'];
} else {
    // Redirect to login page if not logged in
    header("Location: /CPWC/CPWC/frontend/login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Hub - Welcome</title>
    <link rel="stylesheet" href="/CPWC/CPWC/frontend/css/style.css"> <!-- Link to external CSS file -->
</head>

<body>

    <!-- Header with user information -->
    <header class="header">
        <h1 class="logo">THE HUB</h1>
        <nav class="nav">
            <span class="nav-link">Welcome, <?php echo htmlspecialchars($_SESSION['Email']); ?></span>
            <a href="/CPWC/CPWC/backend/src/profile.php" class="nav-link">Profile</a>
            <a href="./logout.php" class="nav-link">Log Out</a>
        </na>
    </header>

    <main>
        <!-- Hero Section -->
        <section class="hero">
            <h1>Connecting you to professional service providers near you</h1>
            <div class="search-bar">
                <select class="service-options" id="service-options">
                    <option disabled selected value="">Select a service</option>
                </select>
                <select class="location-options" id="location-options">
                    <option disabled selected value="">Choose a city</option>
                </select>
                <input type="date" id="date-input">
                <button id="search-button">Search</button>
            </div>
        </section>

        <section class="services">
            <h2>Services We Provide</h2>
            <div class="service-cards">
                <!-- Static Service Card 1 -->
                <div class="service-card">
                    <div class="service-image">
                        <img src="/CPWC/CPWC/frontend/media/moving.webp" alt="Moving" />
                    </div>
                    <div class="service-title">Moving</div>
                </div>
        
                <!-- Static Service Card 2 -->
                <div class="service-card">
                    <div class="service-image">
                        <img src="/CPWC/CPWC/frontend/media/carpentry.jpg" alt="Carpentry" />
                    </div>
                    <div class="service-title">Carpentry</div>
                </div>
        
                <!-- Static Service Card 3 -->
                <div class="service-card">
                    <div class="service-image">
                        <img src="/CPWC/CPWC/frontend/media/cleaning.jpg" alt="Cleaning" />
                    </div>
                    <div class="service-title">Cleaning</div>
                </div>
        
                <!-- Static Service Card 4 -->
                <div class="service-card">
                    <div class="service-image">
                        <img src="/CPWC/CPWC/frontend/media/window cleaning.png" alt="Window Cleaning" />
                    </div>
                    <div class="service-title">Window Cleaning</div>
                </div>
        
                <!-- Static Service Card 5 -->
                <div class="service-card">
                    <div class="service-image">
                        <img src="/CPWC/CPWC/frontend/media/laundry.jpg" alt="Laundry" />
                    </div>
                    <div class="service-title">Laundry</div>
                </div>
        
                <!-- Static Service Card 6 -->
                <div class="service-card">
                    <div class="service-image">
                        <img src="/CPWC/CPWC/frontend/media/cooking.webp" alt="Cooking" />
                    </div>
                    <div class="service-title">Cooking</div>
                </div>
            </div>
        </section>

        <!-- Dynamic cards -->

        <section>
            <div id="search-results" style="display: none;">
                <h2 id="search-service-title">Service Results</h2>
                <div id="search-results-cards" id="search-results-cards"></div>
            </div>
        </section>

        <!-- Sign-Up Section -->
        <section class="signup-section">
            <h3>Are You a Service Provider?</h3>
            <p>Find out how The Hub can help your business.</p>
            <a href="/CPWC/CPWC/frontend/signup.html">Sign Up Today</a>
        </section>

    </main>

    <!-- Footer -->
    <footer class="footer">
        <p>The HUB | <a href="/CPWC/CPWC/frontend/faq.html" target="_blank">FAQs</a> | <a href="#">Terms and Conditions</a></p>
        <p>&copy; Copyright 2024 The HUB. All Rights Reserved</p>
    </footer>

    <!-- Link to JavaScript file -->
    <script src="/CPWC/CPWC/frontend/js/script.js"></script>
</body>

</html>
