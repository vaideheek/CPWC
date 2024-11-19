document.addEventListener("DOMContentLoaded", function () {
    const serviceProviderCheckbox = document.getElementById("service-provider-checkbox");
    const taxNumberGroup = document.getElementById("tax-number-group");
    const showPasswordButtons = document.querySelectorAll(".show-password");
    const signupForm = document.getElementById("signup-form");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirm-password");
    const roleField = document.getElementById("role"); // Role hidden field

    // Set role dynamically based on the checkbox
    serviceProviderCheckbox.addEventListener("change", function () {
        // Update the role value based on the checkbox state
        if (serviceProviderCheckbox.checked) {
            roleField.value = "Provider";  // Set role to Provider if checkbox is checked
            taxNumberGroup.style.display = "block";  // Show tax number input field
        } else {
            roleField.value = "Customer";  // Set role to Customer if checkbox is not checked
            taxNumberGroup.style.display = "none";  // Hide tax number input field
        }
    });

    // Toggle password visibility
    showPasswordButtons.forEach(button => {
        button.addEventListener("click", function () {
            const passwordInput = this.previousElementSibling;
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                this.textContent = "Hide";
            } else {
                passwordInput.type = "password";
                this.textContent = "Show";
            }
        });
    });

    // Form submission handling
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;

        // Validate password
        if (!validatePassword(password)) {
            alert("Password must have at least 10 characters, one letter, one number, and one special character.");
            return; // Stop form submission if password is invalid
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return; // Stop form submission if passwords don't match
        }

        // If all validation passes, submit the form
        signupForm.submit(); // Actually submit the form after validation
    });
});

// Validate password function
function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    return passwordRegex.test(password);
}
