// Function to fetch data from the backend
async function fetchData(type, params = {}) {
    const queryParams = new URLSearchParams({ type, ...params }).toString();
    const response = await fetch(`http://localhost/CPWC/CPWC/backend/src/fetch_data.php?${queryParams}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${type} data.`);
    }
    return response.json();
}


// Load services dynamically
async function loadServiceDropdown() {
    try {
        const response = await fetchData('services'); // Fetch services from the backend
        const serviceDropdown = document.getElementById('service-options');

        // Ensure the "Any Service" option always exists at the start
        serviceDropdown.innerHTML = `<option value="Any Service" selected>Any Service</option>`; // Default option

        response.services.forEach(service => {
            const option = document.createElement('option');
            option.value = service;
            option.textContent = service;
            serviceDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading services dropdown:', error);
        alert('Failed to load services. Please try again later.');
    }
}

// Static locations array
const locations = [
    "Budapest",
    "Szeged",
    "Debrecen",
    "Miskolc",
    "Pécs"
];

// Load locations dynamically
async function loadLocations() {
    try {
        const locationDropdown = document.getElementById('location-options');

        // Ensure the "Any Location" option always exists at the start
        locationDropdown.innerHTML = `<option value="Any Location" selected>Any Location</option>`; // Default option

        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading locations:', error);
        alert('Failed to load locations. Please try again later.');
    }
}


// Save the service data in localStorage when a service is selected
function saveServiceData(service) {
    console.log('Saving service:', service);
    localStorage.setItem('selectedService', JSON.stringify(service));
}

// Function to search for services based on user input
async function searchServices() {
    try {
        // Collect user inputs
        const service = document.getElementById('service-options').value || '';
        const location = document.getElementById('location-options').value || '';
        const date = document.querySelector('input[type="date"]').value || '';

        if (!service && !location && !date) {
            alert('Please select at least one search criterion.');
            return;
        }

        const params = { service, location, date }; // Query parameters
        const response = await fetchData('search', params); // Fetch search results from backend

        const resultsContainer = document.getElementById('search-results-cards');
        resultsContainer.innerHTML = ''; // Clear previous results

        if (response.services && response.services.length === 0) {
            resultsContainer.innerHTML = '<p>No matching services found.</p>';
        } else if (response.services) {
            response.services.forEach(result => {
                // Create a search result card structure
                const card = document.createElement('div');
                card.className = 'search-result-card';
                card.innerHTML = `
                    <div class="search-result-image">
                        <img src="/CPWC/CPWC/frontend/media/avatar.jpeg" alt="${result.Title}" /> <!-- Placeholder for profile picture -->
                    </div>
                    <div class="search-result-details">
                        <h3 class="search-result-title">${result.Title}</h3>
                        <p class="search-result-description">${result.Description}</p>
                        <p class="search-result-price">HUF ${result.Price}</p>
                        <p class="search-result-location">${result.Location}</p>
                        <p class="search-result-rating">Rating: ${result.Rating || 'N/A'} <span class="stars">${'★'.repeat(result.Rating || 0)}</span></p >
                    </div >
                    `;
                const button = document.createElement('button');
                button.textContent = 'Book Now';

                // Create the <a> tag
                const link = document.createElement('a');
                link.href = "/CPWC/CPWC/frontend/booking.html";  // Or set this to the desired URL (e.g., 'booking.html')

                button.addEventListener('click', () => {
                    saveServiceData(result); // Pass the result object directly
                });
                // Append the button to the <a> tag
                link.appendChild(button);

                // Append the <a> tag to the card
                card.appendChild(link);
                resultsContainer.appendChild(card);
            });
        }

        // Show the search results section
        document.getElementById('search-results').style.display = 'block';
    } catch (error) {
        console.error('Error searching services:', error);
        alert('Failed to search for services. Please try again later.');
    }
}
// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load categories, services, and locations on page load
    loadLocations();
    loadServiceDropdown();

    // Add event listener for search functionality
    document.getElementById('search-button').addEventListener('click', searchServices);
});
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Hub</title>
    <link rel="stylesheet" href="css/style.css"> <!-- Link to external CSS file -->
</head>

<body>

    <!-- Placeholder for Header -->
    <header class="header">
        <h1 class="logo">THE HUB</h1>
        <nav class="nav">
            <a href="./login.html" class="nav-link">Log In</a>
            <a href="./signup.html" class="nav-link">Sign Up</a>
        </nav>
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
                <!-- Service Card 1 -->
                <div class="service-card" data-category="Moving">
                    <div class="service-image">
                        <img src="/CPWC/CPWC/frontend/media/moving.webp" alt="Moving" />
                    </div>
                    <div class="service-title">Moving</div>
                </div>

                <!-- Service Card 2 -->
                <div class="service-card" data-category="Carpentry">
                    <div class="service-image">
                        <img src="/CPWC/CPWC/frontend/media/carpentry.jpg" alt="Carpentry" />
                    </div>
                    <div class="service-title">Carpentry</div>
                </div>

                <!-- Service Card 3 -->
                <div class="service-card" data-category="Cleaning">
                    <div class="service-image">
                        <img src="/CPWC/CPWC/frontend/media/cleaning.jpg" alt="Cleaning" />
                    </div>
                    <div class="service-title">Cleaning</div>
                </div>

                <!-- Add more service cards as needed -->
            </div>
        </section>

        <section>
            <div id="search-results" style="display: none;">
                <h2 id="search-service-title">Service Results</h2>
                <div id="search-results-cards"></div>
            </div>
        </section>

        <!-- Sign-Up Section -->
        <section class="signup-section">
            <h3>Are You a Service Provider?</h3>
            <p>Find out how The Hub can help your business.</p>
            <a href="signup.html">Sign Up Today</a>
        </section>

    </main>

    <!-- Footer -->
    <footer class="footer">
        <p>The HUB | <a href="faq.html">FAQs</a> | <a href="#">Terms and Conditions</a></p>
        <p>&copy; Copyright 2024 The HUB. All Rights Reserved</p>
    </footer>

    <!-- Link to JavaScript file (if needed for other functionalities) -->
    <script src="js/script.js"></script>

    

</body>

</html>
