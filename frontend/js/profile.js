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
