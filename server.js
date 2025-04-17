const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
const apiDir = path.join(__dirname, 'api');
fs.readdirSync(apiDir).forEach(file => {
  if (file.endsWith('.ts') || file.endsWith('.js')) {
    const routeName = file.replace(/\.(ts|js)$/, '');
    const handler = require(`./api/${file}`);
    
    app.all(`/api/${routeName}`, async (req, res) => {
      try {
        await handler(req, res);
      } catch (error) {
        console.error(`Error in ${routeName} handler:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    
    console.log(`Registered API route: /api/${routeName}`);
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 