const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    // Read the previous submissions from the file
    fs.readFile('output.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            data = 'No previous submissions found.';
        }
        
        // Render the HTML form with previous submissions
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Form Submission</title>
            </head>
            <body>
                <h1>Group Chat</h1>
                <form action="/submit" method="POST">
                    <label for="username">Username:</label><br>
                    <input type="text" id="username" name="username" required><br><br>

                    <input type="text" id="inputText" name="inputText" required><br><br>

                    <button type="submit">Send</button>
                </form>
                
                <h2>Text:</h2>
                <pre>${data}</pre>
            </body>
            </html>
        `);
    });
});

// Handle form submission
app.post('/submit', (req, res) => {
    const username = req.body.username;
    const inputText = req.body.inputText;
    const submission = `${username}: ${inputText}\n`;

    // Append the submission to the file
    fs.appendFile('output.txt', submission, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }

        // Redirect back to the form page
        res.redirect('/');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
