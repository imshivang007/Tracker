const express = require('express');
const http = require('http');
const WebSocket = require('ws');


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000; 

app.use(express.static('public'));


wss.on('connection', (ws) => {
    console.log('Client connected');

    
    let vehicleLocation = { lat: 40.7128, lon: -74.0060 }; // Initial coordinates (NYC)

    const updateLocation = () => {
        vehicleLocation.lat += (Math.random() - 0.5) * 0.001; 
        vehicleLocation.lon += (Math.random() - 0.5) * 0.001;
        ws.send(JSON.stringify(vehicleLocation));
    };

    const locationInterval = setInterval(updateLocation, 2000); 

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(locationInterval);
    });
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
