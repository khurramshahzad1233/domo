import express from "express"
import { bookflightcontroller, searchflightcontroller } from "../controller/duffelcontroller.js";
const router=express.Router();

router.route("/search/flight").post(searchflightcontroller);
router.route('/search/flight/book').post(bookflightcontroller);



export default router;