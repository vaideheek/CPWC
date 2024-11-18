document.addEventListener("DOMContentLoaded", function () {
    const serviceProviderCheckbox = document.getElementById("service-provider-checkbox");
    const taxNumberGroup = document.getElementById("tax-number-group");
    const showPasswordButtons = document.querySelectorAll(".show-password");

    // Toggle tax number field visibility
    serviceProviderCheckbox.addEventListener("change", function () {
        taxNumberGroup.style.display = serviceProviderCheckbox.checked ? "block" : "none";
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
});