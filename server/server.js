const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const cors = require('cors');

// Import Routes
const db = require('./db');
const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes');
const cakeRoutes = require('./routes/cakeRoutes');
const wishRoutes = require('./routes/wishRoutes');
const weddingRoutes = require('./routes/weddingRoutes');
const otpRoutes = require('./routes/otpRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve Static Files
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../FrontEnd/dist");
app.use(express.static(buildPath));

// Serve Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/ai', aiRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cake', cakeRoutes);
app.use('/api/wish', wishRoutes);
app.use('/api/wedding', weddingRoutes);
app.use('/', otpRoutes);

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));

});

// Catch-All Route for SPA
// app.get("*", (req, res) => {
//     res.sendFile(path.join(buildPath, "index.html"));
// });

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
