const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
    {
        fullName :{
            type: String ,
            required :true,
        },
        email :{
            type : String ,
            required : true ,
            trim : true ,
            index: { unique: true },
            match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        },
        message :{
            type : String,
            required : true,
        }
    },
    {timestamps: true }
);

const contactModel = mongoose.model("contacts" , contactSchema);
module.exports = contactModel;