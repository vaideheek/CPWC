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
                        <img src="media/avatar.jpeg" alt="${result.Title}" /> <!-- Placeholder for profile picture -->
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
                link.href = "booking.html";  // Or set this to the desired URL (e.g., 'booking.html')

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
