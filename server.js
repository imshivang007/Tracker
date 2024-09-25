const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Create an Express app
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

// WebSocket to send vehicle location updates to the client
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Simulate vehicle movement (latitude and longitude changes)
    let vehicleLocation = { lat: 40.7128, lon: -74.0060 }; // Initial coordinates (NYC)

    const updateLocation = () => {
        vehicleLocation.lat += (Math.random() - 0.5) * 0.001; // Random small movement
        vehicleLocation.lon += (Math.random() - 0.5) * 0.001;
        ws.send(JSON.stringify(vehicleLocation));
    };

    const locationInterval = setInterval(updateLocation, 2000); // Update every 2 seconds

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(locationInterval);
    });
});

// Start server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
