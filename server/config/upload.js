const fs = require("fs");

const categoriesFolder = "./public/uploads/categories";
const blogsFolder = "./public/uploads/blogs";
const productsFolder = "./public/uploads/products";

const CreateAllFolder = () => {
    if (!fs.existsSync(categoriesFolder)) {
      fs.mkdirSync(categoriesFolder, {
        recursive: true,
      });
    }
  
    if (!fs.existsSync(blogsFolder)) {
      fs.mkdirSync(blogsFolder, {
        recursive: true,
      });
    }
  
    if (!fs.existsSync(productsFolder)) {
      fs.mkdirSync(productsFolder, {
        recursive: true,
      });
    }
  };
  
  module.exports = CreateAllFolder;