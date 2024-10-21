const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cors = require("cors"); // Import cors middleware
const cloudinary = require('cloudinary').v2;
const authRoutes = require("./routes/auth");


// Load environment variables from a .env file
dotenv.config({ path: "config/.env" });

const app = express();

// Parse JSON request bodies
app.use(express.json());

app.use(cors());


// Call the function to connect to the database
connectDatabase();

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// Use the user routes
app.use("/api/auth", authRoutes);


// Global error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
