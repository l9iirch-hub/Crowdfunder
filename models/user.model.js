import { string } from "joi";
import mongoosse from "mongoose";
 
const userShema = new mongoose.schema({
    name : String,
    email: {type: string, unique: true},
    password: string
    }, {timestamps : true});


    export const User = mongoosse.model("User", userShema);