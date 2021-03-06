import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors({
  origin: '*'
})); 

app.use(function(req, res, next) {
 
  res.setHeader('Access-Control-Allow-Origin', 'https://memories-344309.web.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next()
});


app.use('/posts', postRoutes);
app.use('/user', userRoutes)
 
app.get('/', (req, res) => {
    res.send('Hello to Memories API')
})



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message)); 
 