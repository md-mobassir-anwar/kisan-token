
// File Location: kisan-token/track.js

async function trackToken() {
    const inputField = document.getElementById('tokenInput');
    if (!inputField) return;

    // Clean up input value (e.g., '#2' becomes '2')
    const typedId = inputField.value.trim().replace('#', '');

    if (!typedId) {
        alert('Please enter a valid Token Number!');
        return;
    }

    try {
        const response = await fetch(`https://kisan-token-backend-app.onrender.com/api/bookings/${typedId}`);
        const data = await response.json();

        if (response.ok) {
            alert(`Token Found!\n\nID: #${data.id}\nFarmer Name: ${data.farmerName}\nMobile: ${data.mobileNumber}`);
        } else {
            alert(data.message || 'Token not found!');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Server error. Make sure server.js is running on port 5000.');
    }
}
