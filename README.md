# Express.js HTTPS Server (SSL/TLS Demonstration)

This repository contains a simple Express.js application designed to demonstrate how to set up and run a basic HTTPS server using Node.js's built-in `https` module and self-signed SSL/TLS certificates.

## 🚀 Features

* Serves content over HTTPS.

* Illustrates the need for SSL/TLS certificates for secure communication.

* Highlights the browser's response to self-signed certificates (privacy warnings).

* Includes a basic `/secure-data` endpoint to show JSON data over a secure connection.

## 📦 Technologies Used

* **Node.js**: JavaScript runtime environment.

* **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.

* **HTTPS Module**: Node.js's built-in module for creating HTTPS servers.

* **`fs` Module**: Node.js's built-in file system module for reading certificate files.

* **`path` Module**: Node.js's built-in module for handling file paths.

## 📋 Prerequisites

Before running this application, ensure you have:

* [Node.js](https://nodejs.org/) installed on your machine.

* [npm](https://www.npmjs.com/) (Node Package Manager) - usually comes with Node.js.

* [OpenSSL](https://www.openssl.org/) - typically pre-installed on Linux/macOS. For Windows, you might need to install it (e.g., via Git Bash or a dedicated OpenSSL installer).

## 🔑 Generating Self-Signed Certificates

For this demonstration, we'll use self-signed certificates. **In a production environment, you would obtain certificates from a trusted Certificate Authority (CA) like Let's Encrypt, DigiCert, etc.**

1. **Open your terminal** (or Git Bash on Windows).

2. **Navigate to the root directory of this project.**

3. **Run the following command to generate `key.pem` (private key) and `cert.pem` (certificate):**

   ```
   openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365
   ```

   You will be prompted to enter information (Country Name, State or Province Name, Locality Name, Organization Name, Organizational Unit Name, Common Name, Email Address). For "Common Name", it's usually best to enter `localhost` for local development.

## 🛠️ Installation

1. **Clone this repository** (or copy the `app.js` file and generate the certificates as above).

2. **Navigate to the project directory** in your terminal.

3. **Install the necessary npm packages:**

   ```
   npm install express
   ```

## 🚀 Running the Application

1. **Ensure you have generated `key.pem` and `cert.pem`** in the project's root directory.

2. **Start the server** from your terminal:

   ```
   node app.js
   ```

   You should see output similar to this:

   ```
   HTTPS Server running on https://localhost:8443
   Open your browser and navigate to:
      https://localhost:8443

   NOTE: You will likely see a privacy warning because this is a self-signed certificate.
         You must accept the risk and proceed to view the page.
   ```

## 🌐 Accessing the Application

Open your web browser and go to:

👉 **`https://localhost:8443`**

### Important Note on Browser Warnings:

Since you are using a self-signed certificate, your browser will display a security warning (e.g., "Your connection is not private", "NET::ERR_CERT_AUTHORITY_INVALID"). This is **expected behavior** and demonstrates how browsers validate certificates. To proceed, you will need to click on "Advanced" or "Proceed anyway" (or similar options depending on your browser) to bypass the warning.

Once bypassed, you will see the content served over 👉 **`https://localhost:8443/secure-data`** a secure (encrypted) HTTPS connection.
