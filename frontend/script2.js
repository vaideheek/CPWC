// Function to load services from the database
async function loadServices() {
    try {
        // Fetch the services data from fetch_data.php
        const response = await fetch('http://localhost/CPWC/CPWC/backend/src/fetch_data.php?type=services');
        const services = await response.json();

        // Get the service options dropdown
        const serviceListElements = document.getElementById('service-options');

        // Loop through the services and add them to the dropdown
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service;
            option.textContent = service;
            serviceListElements.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading services:', error);
    }
}

// Function to load locations from the database
async function loadLocations() {
    try {
        // Fetch the locations data from fetch_data.php
        const response = await fetch('http://localhost/CPWC/CPWC/backend/src/fetch_data.php?type=locations');
        const locations = await response.json();

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

// Call the functions to load data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadServices();
    loadLocations();
});