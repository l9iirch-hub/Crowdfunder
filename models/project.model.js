import mogoose from "mongoose"

const projectShema = new mongoose.Schema({
    title : string ,
    description : string , 
    goalAmount : Number ,
    currentAmount : {
        type : Number ,
        default : 0
    },
    userId: {
        type: mogoose.Schema.Types.ObjectId,
        ref: "User"
    }
    
}, {timestamps : true});
export const project = mogoose.model("Project", projectShema)
