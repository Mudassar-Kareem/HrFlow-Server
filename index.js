const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://mudassarkareem:mudassarkareem@cluster0.ecqjvhf.mongodb.net/hrflow')
    .then(() => {
        console.log("Server connected with MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use(express.json());
app.use('/images', express.static('public/images'));

app.use(cors({
    origin: "https://hr-flow-client.vercel.app", //"http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

// test route
app.get('/', (req, res) => {
    res.send('Hello World');
});

const admin = require('./routes/adminRoutes');
app.use('/api/v1', admin);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
