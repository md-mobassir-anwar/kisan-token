// File Location: kisan-token/booking.js

document.getElementById('submitBtn').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevents the browser page from reloading

    // 1. Get input values from HTML
    const name = document.getElementById('farmerName').value;
    const mobile = document.getElementById('mobileNumber').value;

    // 2. Simple check to make sure fields are not empty
    if (!name || !mobile) {
        alert("Please enter both Name and Mobile Number!");
        return;
    }

    try {
        // 3. Send data to backend server
        const response = await fetch('http://localhost:5000/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ farmerName: name, mobileNumber: mobile })
        });

        // 4. Read response from server
        const result = await response.json();
        alert(result.message);

    } catch (error) {
        console.error('Error connecting to backend:', error);
        alert('Server connection failed. Make sure "node server.js" is running in your terminal!');
    }
});