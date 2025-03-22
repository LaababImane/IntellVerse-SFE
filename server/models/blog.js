const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
    {
        author : {
            type : String, 
            required : true,
            maxlength : 32,
        },
        location : {
            type : String ,
        },
        bTitle : {
             type : String ,
             required : true ,
        },
        bImage : {
            type : String,
        },
        article : {
            type : String,
            required : true ,
        }

    },
    { timestamps : true}
)
const blogModel = mongoose.model("blogs" , blogSchema);
module.exports = blogModel;