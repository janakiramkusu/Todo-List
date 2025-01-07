require("dotenv").config(); // Load environment variables
const { app } = require("./app");
const mongoose = require("mongoose");

const dbname = process.env.DB_NAME || "satdb";
const port = process.env.PORT || 7001;

// Connect to MongoDB
mongoose
  .connect(`mongodb://127.0.0.1:27017/${dbname}`)
  .then(() => console.log(`DB is connected on: ${dbname}`))
  .catch((err) => console.error(`DB connection error: ${err.message}`));

// Start the server
app.listen(port, () => console.log(`Server is active on port: ${port}`));
