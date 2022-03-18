const express = require("express");
const app = express();
const PORT = 6969;
const userData = require("../MOCK_DATA.json");

app.listen(PORT, () => {
  console.log("Server running");
});
