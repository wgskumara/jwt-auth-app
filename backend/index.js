import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose
.connect(process.env.MONGODB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB'))
                                .catch(err => console.log(err));
                
const PORT = process.env.PORT || 1670;

app.listen(process.env.PORT, () => console.log(`Server running on port :${PORT} 🚀🚀🚀`));
