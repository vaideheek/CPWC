document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const email = emailField.value;
    const password = passwordField.value;

    // Remove previous error messages and styles
    clearErrors();

    if (email === "test@example.com" && password === "password") {
        // Redirect to another page
        window.location.href = "welcome.html";
    } else {
        // If email is incorrect, show error
        if (email !== "test@example.com") {
            showError(emailField, "Email address is not registered");
        }

        // If password is incorrect, show error
        if (password !== "password") {
            showError(passwordField, "Incorrect password");
        }
    }
});

// Function to show error message and apply red border
function showError(inputElement, message) {
    inputElement.classList.add('is-invalid'); // Add Bootstrap's red border class

    // Create the error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback'; // Add Bootstrap's error message class
    errorDiv.innerText = message;

    // Insert the error message after the input field
    inputElement.parentNode.appendChild(errorDiv);
}

// Function to clear previous error messages and styles
function clearErrors() {
    const invalidElements = document.querySelectorAll('.is-invalid');
    invalidElements.forEach(function (element) {
        element.classList.remove('is-invalid');
    });

    const errorMessages = document.querySelectorAll('.invalid-feedback');
    errorMessages.forEach(function (error) {
        error.remove();
    });
}


