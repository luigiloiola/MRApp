const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

app.get('/api/*', async (req, res) => {
    try {
        const url = `http://MarvelRivalsAPI.com/api/v1/${req.params[0]}`;
        const headers = { 'x-api-key': process.env.API_KEY };
        const response = await axios.get(url, { headers });
        console.log(response['status'])
        res.json(response.data);
    } catch (error) {
        res.status(501).json({ error: 'Proxy error', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});