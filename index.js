const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        console.log("Server connected with MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use(express.json());
app.use('/images', express.static('public/images'));

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

const admin = require('./routes/adminRoutes');
app.use('/api/v1', admin);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
