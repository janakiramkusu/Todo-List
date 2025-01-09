require("dotenv").config(); // Load environment variables
const { app } = require("./app");
const mongoose = require("mongoose");

// Load environment variables
const dbUri = process.env.MONGO_URI; // MongoDB Atlas URI
const port = process.env.PORT || 7001;

// Connect to MongoDB
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error(`MongoDB connection error: ${err.message}`));

// Start the server
app.listen(port, () => console.log(`Server is active on port: ${port}`));
