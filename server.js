const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public')); // Serve your HTML file from a 'public' directory

app.get('/list-files', async (req, res) => {
    try {
        const files = await fs.readdir('mermaid-files'); // Directory containing your .mmd and .mermaid files
        const mermaidFiles = files.filter(file => file.endsWith('.mmd') || file.endsWith('.mermaid'));
        res.json(mermaidFiles);
    } catch (error) {
        res.status(500).json({ error: 'Error listing files' });
    }
});

app.get('/get-file/:fileName', async (req, res) => {
    try {
        const filePath = path.join('mermaid-files', req.params.fileName);
        const content = await fs.readFile(filePath, 'utf-8');
        res.set('Content-Type', 'text/plain');
        res.send(content);
    } catch (error) {
        res.status(500).json({ error: 'Error reading file' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});