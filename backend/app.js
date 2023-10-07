const express = require('express')
const helmet = require("helmet") 

const app = express()
const PORT = 8080


app.use(helmet());

app.get("/search", async (req, res) => {
    const { term, media, limit} = req.query;
    const response = await fetch(`https://itunes.apple.com/search?term=${term}&media=${media}&limit=${limit}`);
    const data = await response.json();
    res.json(data);
});

//For snapshot tests
module.exports = app;
// use the correct port
app.listen(PORT, () => {
    console.log(`Project app listening on port ${PORT}`);
});
