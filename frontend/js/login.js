document.addEventListener("DOMContentLoaded", function () {
    const showPasswordButtons = document.querySelectorAll(".show-password");

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

document.getElementById('login-form').onsubmit = function() {
    console.log('Form submitted!');
};
