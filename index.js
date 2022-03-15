import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'

const app = express();
dotenv.config();
var allowedOrigins = ['http://localhost:3000','http://yourapp.com'];



app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors({
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}));

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Memories API')
})

const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
 