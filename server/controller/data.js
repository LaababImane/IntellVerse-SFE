const categoryModel = require("../models/categories");
const productModel = require("../models/products");
const orderModel = require("../models/orders");
const userModel = require("../models/users");


class Data {
    async getAllData(req, res) {
        try {
          let Categories = await categoryModel.find({}).count();
          let Products = await productModel.find({}).count();
          let Orders = await orderModel.find({}).count();
          let Users = await userModel.find({}).count();
          if (Categories && Products && Orders) {
            return res.json({ Categories, Products, Orders, Users });
          }
        } catch (err) {
          console.log(err);
        }
      }
    
}
const dataController = new Data();
module.exports = dataController;
