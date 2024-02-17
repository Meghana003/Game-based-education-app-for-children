document.getElementById("name-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent form submission

    var name = document.getElementById("name-input").value; // Get the entered name
    window.location.href = "options.html?name=" + encodeURIComponent(name); // Redirect to options.html with name as URL parameter
});