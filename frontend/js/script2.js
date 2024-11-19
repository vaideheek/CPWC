// Function to load services from the database
async function loadServices() {
    try {
        // Fetch the services data from fetch_data.php
        const response = await fetch('http://localhost/CPWC/CPWC/backend/src/fetch_data.php?type=services');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const services = await response.json();

        // Get the service options dropdown
        const serviceListElements = document.getElementById('service-options');

        // Loop through the services and add them to the dropdown
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service; // Using the service name
            option.textContent = service;
            serviceListElements.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading services:', error);
        alert('Error loading services. Please try again later.');
    }
}

// Function to load locations from the database
async function loadLocations() {
    try {
        // Hardcoded locations from your database
        const locations = [
            "Budapest",
            "Szeged",
            "Debrecen",
            "Miskolc",
            "Pécs"
        ];

        // Get the location options dropdown
        const locationListElements = document.getElementById('location-options');

        // Loop through the locations and add them to the dropdown
        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationListElements.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading locations:', error);
    }
}



// Function to search services based on user inputs
async function searchServices() {
    try {
        const service = document.getElementById('service-options').value;
        const location = document.getElementById('location-options').value;
        const date = document.querySelector('input[type="date"]').value;

        if (!service || !location || !date) {
            alert('Please select a service, location, and date.');
            return;
        }

        // Fetch the search results from the PHP backend
        const response = await fetch(
            `http://localhost/CPWC/CPWC/backend/src/fetch_data.php?type=search&service=${service}&location=${location}&date=${date}`
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const results = await response.json();

        const serviceCards = document.getElementById('service-cards');
        serviceCards.innerHTML = ''; // Clear previous results

        if (results.length === 0) {
            serviceCards.innerHTML = '<p>No services found.</p>';
            return;
        }

        // Display search results as service cards
        results.forEach(result => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.innerHTML = `
                <h3>${result.Title}</h3>
                <p>${result.Description}</p>
                <p><strong>Price:</strong> $${result.Price}</p>
                <p><strong>Duration:</strong> ${result.Duration} minutes</p>
                <button onclick="bookService(${result.ServiceID})">Book Now</button>
            `;
            serviceCards.appendChild(card);
        });
    } catch (error) {
        console.error('Error searching services:', error);
        alert('Error searching services. Please try again later.');
    }
}

// Function to handle service booking
function bookService(serviceID) {
    alert(`Service ${serviceID} booked!`);
    // Redirect to booking page or process booking logic
}

// Add event listener to search button
document.querySelector('.search-bar button').addEventListener('click', searchServices);

// Call the functions to load data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadServices();
    loadLocations();
});


document.addEventListener("DOMContentLoaded", function () {
    loadSection("header.html", "header-placeholder");
    loadSection("footer.html", "footer-placeholder");
});

// Load footer and header to pages
function loadSection(file, elementId) {
    fetch(file)
        .then((response) => response.text())
        .then((data) => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch((error) => console.error("Error loading section:", error));
}