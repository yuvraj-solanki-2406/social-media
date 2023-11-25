import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { register } from './controllers/auth.js';
import router from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import {verifyToken} from './middleware/auth.js'
import {createPost} from './controllers/posts.js'
import { users, posts } from "./data/index.js";
import Post from './models/Post.js'
import User from './models/user.js'

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json( {limit: "30mb", extended: true } ));
app.use(bodyParser.urlencoded( {limit: "30mb", extended: true } ));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// FILE STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

// Register Route
app.post("/auth/register", upload.single('picture'), register)
app.post("/post", verifyToken, upload.single('picture'), createPost)

// All Routes
app.use("/auth", router)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

// MONGO DB SETUP
const port = process.env.PORT || 5002
mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(port, ()=> console.log(`Server satrted on ${port}`))
    // Added dummy data 
    //User.insertMany(users)
    //Post.insertMany(posts)
}).catch((error)=>console.log(error))

app.get('/', (req, res) => {
    res.send("Hello")
})

// app.listen(port, ()=> console.log(`Server running on ${port}`))