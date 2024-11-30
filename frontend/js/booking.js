document.addEventListener("DOMContentLoaded", () => {
    // Get the serviceID from the selected service in localStorage
    const service = JSON.parse(localStorage.getItem('selectedService'));

    if (service) {
        const serviceID = service.ServiceID;

        // Fetch service data from the server using the serviceID
        fetch(`/CPWC/CPWC/backend/src/booking.php?serviceID=${serviceID}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                    return;
                }

                // Populate the service details in the UI
                document.getElementById("service-name").textContent = data.Title;
                document.getElementById("service-description").textContent = data.Description;
                document.getElementById("service-price").textContent = `HUF ${data.Price}`;
                
                // Format and display the date and time
                if (data.ScheduledDate) {
                    document.getElementById("service-date").textContent = formatDate(data.ScheduledDate);
                }

                if (data.ScheduledTime) {
                    document.getElementById("service-time").textContent = formatTime(data.ScheduledTime);
                }

                // Handle optional image
                const imageElement = document.getElementById("service-image");
                imageElement.src = data.ImagePath ? data.ImagePath : "/CPWC/CPWC/frontend/media/avatar.jpeg";
            })
            .catch(error => {
                console.error("Error fetching service data:", error);
                alert("An error occurred while fetching the service details.");
            });
    } else {
        alert('No service selected. Please select a service first.');
    }
});

// Helper function to format the date in a readable way
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Helper function to format the time in a readable way
function formatTime(timeString) {
    const date = new Date('1970-01-01T' + timeString + 'Z'); // Assuming time is in the format HH:mm:ss
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
