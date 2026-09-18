// File Location: kisan-token/status.js

async function loadStatus() {
    try {
        // Fetch all saved bookings from the database
        const response = await fetch('http://localhost:5000/api/bookings');
        const bookings = await response.json();

        // Check if there are any bookings stored
        if (!bookings || bookings.length === 0) {
            console.log("No bookings found in database.");
            return;
        }

        // Get the most recent booking entry
        const latestBooking = bookings[0];

        // Update the HTML elements on status.html with database values
        if (document.getElementById("statusToken")) {
            document.getElementById("statusToken").textContent = '#' + latestBooking.id;
        }
        if (document.getElementById("statusFarmer")) {
            document.getElementById("statusFarmer").textContent = latestBooking.farmerName;
        }

    } catch (error) {
        console.error('Error fetching status from database:', error);
    }
}

// Automatically load booking status when page loads
window.addEventListener('DOMContentLoaded', loadStatus);