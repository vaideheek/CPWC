// Profile Edit functionality
document.getElementById("edit-btn").addEventListener("click", function () {
    const inputs = document.querySelectorAll("#profile-form input");
    const isDisabled = inputs[0].disabled;

    // Toggle the disabled state of inputs
    inputs.forEach(input => input.disabled = !isDisabled);

    // Toggle button text and visibility
    if (isDisabled) {
        this.textContent = "Save"; // Change button text to Save
    } else {
        this.textContent = "Edit"; // Change button text back to Edit
    }

    // Show or hide the Save button
    document.getElementById('save-btn').style.display = isDisabled ? 'inline-block' : 'none'; 
    this.style.display = isDisabled ? 'none' : 'inline-block'; // Hide Edit button when Save is visible
});

// Show add service form
document.getElementById("add-service-btn").addEventListener("click", function() {
    const formContainer = document.getElementById('add-service-form-container');
    formContainer.classList.toggle('hidden');  // Toggle visibility of the add service form
});

// Optional: Submit the service form (Add your submission logic here)
document.getElementById("add-service-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent page refresh on form submission

    const serviceName = document.getElementById('service-name').value;
    const serviceDate = document.getElementById('service-date').value;

    if (!serviceName || !serviceDate) {
        alert("Please fill in all fields.");
        return;
    }

    // Example: Here you would submit the form data to the server via AJAX (or a normal form submission)
    alert('Service submitted: ' + serviceName + ' on ' + serviceDate);
});
