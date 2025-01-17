const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

mongoose.connect('mongodb+srv://mudassarkareem:mudassarkareem@cluster0.ecqjvhf.mongodb.net/hrflow')
    .then(() => {
        console.log("Server connected with MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

    cloudinary.config({
        cloud_name:"dt6skdss9", 
        api_key:"657694224342241", 
        api_secret:"ZXobMFGvsFgRUAFexe-E4tSWHXc",
      });
      
      cloudinary.api.ping((error, result) => {
        if (error) {
          console.error('Cloudinary configuration error:', error);
        } else {
          console.log('Cloudinary configuration successful:', result);
        }
      });

app.use(express.json());
app.use(express.json({ limit: '10mb' })); // Adjust size limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));



app.use(cors());

// test route
app.get('/', (req, res) => {
    res.send('Hello World');
});



const admin = require('./routes/adminRoutes');
app.use('/api/v1', admin);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
