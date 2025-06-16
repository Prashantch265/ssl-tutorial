// Import necessary modules
const express = require('express');
const https = require('https'); // Node.js built-in module for HTTPS
const fs = require('fs');     // Node.js built-in module for file system operations
const path = require('path');   // Node.js built-in module for path manipulation

// Create an Express application instance
const app = express();

// Define the port for our HTTPS server.
const PORT = 8443;

// --- SSL Certificate Setup ---
// In a real-world scenario, these would be issued by a Certificate Authority (CA).
// For this demonstration, we're using self-signed certificates.
// Make sure 'key.pem' and 'cert.pem' are in the same directory as this script,
// or provide their full paths.

// Paths to the key and certificate files
const privateKeyPath = path.join(__dirname, 'key.pem');
const certificatePath = path.join(__dirname, 'cert.pem');

let privateKey, certificate;

try {
    // Read the private key file
    privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    // Read the certificate file
    certificate = fs.readFileSync(certificatePath, 'utf8');
} catch (error) {
    console.error('Error reading SSL/TLS certificate files:');
    console.error('Please ensure "key.pem" and "cert.pem" are in the same directory,');
    console.error('and that you have generated them using openssl.');
    console.error('Example command: openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365');
    process.exit(1); // Exit the process if files cannot be read
}

// Options for the HTTPS server, including our private key and certificate
const httpsOptions = {
    key: privateKey,
    cert: certificate
};

// --- Express Routes ---

// A simple GET route for the root path that now serves the external HTML document
app.get('/', (req, res) => {
    // Use res.sendFile to send the HTML file.
    // __dirname is the current directory of the script.
    res.sendFile(path.join(__dirname, 'ssl_explanation.html'));
});

// A basic route for testing (still returns JSON, but primarily for demonstration of HTTPS)
app.get('/secure-data', (req, res) => {
    res.json({ message: 'This is sensitive data, transferred securely over HTTPS!', timestamp: new Date().toISOString() });
});


// --- Create and Start the HTTPS Server ---

// Create the HTTPS server using Node.js's 'https' module,
// passing our Express app as the request handler and the SSL options.
const server = https.createServer(httpsOptions, app);

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`HTTPS Server running on https://localhost:${PORT}`);
    console.log('Open your browser and navigate to:');
    console.log(`   https://localhost:${PORT}`);
    console.log('\nNOTE: You will likely see a privacy warning because this is a self-signed certificate.');
    console.log('      You must accept the risk and proceed to view the page.');
});

// Basic error handling for the server
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please choose a different port or stop the other application.`);
    } else {
        console.error('Server error:', error);
    }
});
