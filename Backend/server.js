// const { rateLimit } = require('express-rate-limit')
const express = require("express");
const axios = require('axios');
const cors = require("cors");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const app = express();
const port = 4000;

app.use(cors());
app.use(require("./router/router"))

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

