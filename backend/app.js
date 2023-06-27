import express from "express";
import Errormiddleware from './middleware/error.js'
import searchFlight from "./routes/duffelroute.js"
import cors from 'cors'
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())


app.use('/api',searchFlight)

app.use(Errormiddleware)
export default app;