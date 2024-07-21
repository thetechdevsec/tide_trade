document.addEventListener("DOMContentLoaded", () => {
    const bookingsTable = document.getElementById("bookings-table");

    // Example: Add interactivity if needed
    // For instance, adding a filter or sorting functionality

    // Show a message if there are no bookings
    if (bookingsTable && bookingsTable.querySelectorAll("tbody tr").length === 0) {
        document.querySelector("main").innerHTML = "<p>No bookings yet.</p>";
    }
});