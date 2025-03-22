const userModel = require("../models/users");
const bcrypt = require("bcryptjs");

class User {
  async getAllUser(req, res) {
    try {
      let Users = await userModel
        .find({})
/*         .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email") */
        .sort({ _id: -1 });
      if (Users) {
        return res.json({ Users });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getUserByDay(req , res){
       try{
         let UserByDay = await userModel.aggregate([
          {
            $addFields: {
              createdAtDate: {
                $toDate: "$createdAt"
              },
              
            }
          },
          {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$createdAtDate"
                }
              },
              count: {
                $sum: 1
              }
            }
          },
          {
            $project: {
              count: 1,
              date: "$_id",
              _id: 0
            }
          }
        ]);
        res.json({UserByDay});
      } catch (error) {
        console.log(error)
      }
    };


    async getSingleUser(req , res){
        let { uId } = req.body;
        if(!uId){
            return res.json({error : "All filles must be required"});
        }else{
            try{
              let User = await userModel
              .findById(uId)
              .select("name email phoneNumber userImage updatedAt createdAt");
              if(User){
                  return res.json({User})
              }  
            }catch(err){
                console.log(err);
            }
        }
    }
    async AddUser(req, res) {
        let { allProduct, user, amount, transactionId, address, phone } = req.body;
        if (!allProduct || !user || !amount || !transactionId || !address || !phone) {
          return res.json({ message: "All filled must be required" });
        } else {
          try {
            let newUser = new userModel({
              allProduct,
              user,
              amount,
              transactionId,
              address,
              phone,
            });
            let save = await newUser.save();
            if (save) {
              return res.json({ success: "User created successfully" });
            }
          } catch (err) {
            return res.json({ error: error });
          }
        }
      }
      async EditUser(req, res) {
        let { uId, name, phoneNumber } = req.body;
        if (!uId || !name || !phoneNumber) {
          return res.json({ message: "All filled must be required" });
        } else {
          let currentUser = userModel.findByIdAndUpdate(uId, {
            name: name,
            phoneNumber: phoneNumber,
            updatedAt: Date.now(),
          });
          currentUser.exec((err, result) => {
            if (err) console.log(err);
            return res.json({ success: "User updated successfully" });
          });
        }
      }
      async getDeleteUser(req, res) {
        let { oId, status } = req.body;
        if (!oId || !status) {
          return res.json({ message: "All filled must be required" });
        } else {
          let currentUser = userModel.findByIdAndUpdate(oId, {
            status: status,
            updatedAt: Date.now(),
          });
          currentUser.exec((err, result) => {
            if (err) console.log(err);
            return res.json({ success: "User updated successfully" });
          });
        }
      }
      async changePassword(req, res) {
        let { uId, oldPassword, newPassword } = req.body;
        if (!uId || !oldPassword || !newPassword) {
          return res.json({ message: "All filled must be required" });
        } else {
          const data = await userModel.findOne({ _id: uId });
          if (!data) {
            return res.json({
              error: "Invalid user",
            });
          } else {
            const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
            if (oldPassCheck) {
              newPassword = bcrypt.hashSync(newPassword, 10);
              let passChange = userModel.findByIdAndUpdate(uId, {
                password: newPassword,
              });
              passChange.exec((err, result) => {
                if (err) console.log(err);
                return res.json({ success: "Password updated successfully" });
              });
            } else {
              return res.json({
                error: "Your old password is wrong!!",
              });
            }
          }
        }
      }
}
const ordersController = new User();
module.exports = ordersController;