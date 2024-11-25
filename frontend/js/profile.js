document.getElementById("edit-btn").addEventListener("click", function () {
    const inputs = document.querySelectorAll("#profile-form input");
    const isDisabled = inputs[0].disabled;

    inputs.forEach(input => (input.disabled = !isDisabled));

    this.textContent = isDisabled ? "Save" : "Edit";
});