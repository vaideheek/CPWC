// script.js

// Function to load services from JSON and display them
async function loadServices() {
    try {
        // Fetch the JSON data
        const response = await fetch('services.json');
        const services = await response.json();

        // Get the service cards container
        const serviceCardsContainer = document.getElementById('service-cards');
        const serviceListElements = document.getElementById('service-options');

        // Loop through the services and create each card
        services.forEach(service => {

            // Create list item
            const item = document.createElement('option');
            item.classList.add('service-option');
            item.textContent = service.name;

            // Create anchor element to wrap the card
            const anchor = document.createElement('a');
            anchor.href = service.link;
            anchor.target = '_blank'; // Open link in a new tab (optional)

            // Create card div
            const card = document.createElement('div');
            card.classList.add('service-card');


            // Create and append the image
            const img = document.createElement('img');
            img.src = service.image;
            img.alt = service.name;
            card.appendChild(img);

            // Create and append the service name overlay
            const cardTitle = document.createElement('div');
            cardTitle.classList.add('service-card-title');
            cardTitle.textContent = service.name;
            card.appendChild(cardTitle);

            // Append card to the anchor
            anchor.appendChild(card);

            // Append anchor to the container
            serviceCardsContainer.appendChild(anchor);
            serviceListElements.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading services:', error);
    }
}




async function loadLocations() {
    try {
        // Fetch the JSON data
        const response = await fetch('locations.json');
        const locations = await response.json();

        // Get the service cards container
        const locationListElements = document.getElementById('location-options');

        // Loop through the services and create each card
        locations.forEach(location => {

            // Create list item
            const item = document.createElement('option');
            item.classList.add('location-option');
            item.textContent = location.City;


            // Append anchor to the container
            locationListElements.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading services:', error);
    }
}


// Call the function to load services when the page loads
document.addEventListener('DOMContentLoaded', loadServices);
// Call the function to load services when the page loads
document.addEventListener('DOMContentLoaded', loadLocations);