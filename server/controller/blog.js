const blogModel = require("../models/blog")
const { toTitleCase } = require("../config/function");
const fs = require("fs");

class Blog {
    async getAllBlog(req , res ){
        try{
            let Blogs = await blogModel.find({}).sort({_id : -1});
            if(Blogs){
                return res.json({Blogs})
            }
        }catch(err){
            console.log(err)
        }
    }
    async AddBlog(req , res){
        let {author , location , bTitle , article } = req.body;
        let bImage = req.file.filename ;
        const filePath = `../server/public/uploads/blogs/${bImage}`;

        if (!author || !location || !bTitle || !article || !bImage) {
            fs.unlink(filePath , (err)=>{
                if (err) {
                    console.log(err)
                }
                return res.json({ error: "You must fill all" });
            });
        }else {
            bTitle = toTitleCase(bTitle);
            try {
              let checkBlog = await blogModel.findOne({ bTitle: bTitle });
              if (checkBlog) {
                fs.unlink(filePath, (err) => {
                  if (err) {
                    console.log(err);
                  }
                  return res.json({ error: "Blog already exists" });
                });
              } else {
                let newBlog = new blogModel({
                    author,
                    location,
                    bTitle,
                    bImage,
                    article,
                });
                await newBlog.save((err) => {
                  if (!err) {
                    return res.json({ success: "Blog created successfully" });
                  }
                });
              }
            } catch (err) {
                console.log(err);
              }
            }
      }
          async EditBlog(req, res) {
            let { bId , author , location , bTitle , article } = req.body;
            if (!bId || !author || !location || !bTitle || !article) {
              return res.json({ error: "All filled must be required" });
            }
            try {
              let editBlog = blogModel.findByIdAndUpdate(bId, {
                    author,
                    location,
                    bTitle,
                    article,
                    updatedAt: Date.now(),
              });
              let edit = await editBlog.exec();
              if (edit) {
                return res.json({ success: "Blog edit successfully" });
              }
            } catch (err) {
              console.log(err);
            }
        }
        async DeleteBlog(req, res) {
            let { bId } = req.body;
            if (!bId) {
              return res.json({ error: "All filled must be required" });
            } else {
              try {
                let deletedBlogFile = await blogModel.findById(bId);
                const filePath = `../server/public/uploads/blogs/${deletedBlogFile.bImage }`;
        
                let deleteBlog = await blogModel.findByIdAndDelete(bId);
                if (deleteBlog) {
                  // Delete Image from uploads -> Blogs folder 
                  fs.unlink(filePath, (err) => {
                    if (err) {
                      console.log(err);
                    }
                    return res.json({ success: "Blog deleted successfully" });
                  });
                }
              } catch (err) {
                console.log(err);
              }
            }
          }
    
}

const blogController = new Blog();
module.exports = blogController;

    