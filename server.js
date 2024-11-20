const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback route for 404
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
