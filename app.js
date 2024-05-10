const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const options = {
    method: 'GET',
    url: 'https://genius-palette-api.p.rapidapi.com/palette',
    headers: {
        'X-RapidAPI-Key': '9b470d893amsh95ee3b44ca4df7dp1f1228jsn816c7124eeda',
        'X-RapidAPI-Host': 'genius-palette-api.p.rapidapi.com'
    }
};

async function getColorPalette(color) {
    try {
        const response = await axios.request({
            ...options,
            params: { color }
        });
        return response.data.colorColletion[0].monochromatic;
    } catch (error) {
        throw error;
    }
}

app.get('/palette/:color', async (req, res) => {
    const color = req.params.color;
    try {
        const palette = await getColorPalette(color);
        res.json({ color, palette });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
