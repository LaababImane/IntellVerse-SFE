const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const usersRoute = require("./routes/usersRoutes")
const contactRoute = require("./routes/contactRoutes")
const blogRoute = require("./routes/blogRoutes")
const categoryRoute = require("./routes/categoriesRoutes");
const productRoute = require("./routes/productsRoutes")
const orderRoute = require("./routes/ordersRoutes")
const authRoute = require("./routes/authRoutes")
const paymentRoute = require("./routes/paymentRoutes");
const dataRoute = require("./routes/dataRoutes");

// Database Connection 
mongoose.connect(process.env.DATABASE ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then((result) => 
       console.log("Database Connected Successfully"))
    .catch((err)=> console.log("Database Not Connected !!!" + err));

//Routes
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({extended : false}));
app.use(express.json());


// Routes
app.use("/api", authRoute);
app.use("/api/user", usersRoute);
app.use("/api/contactus", contactRoute)
app.use("/api/blog", blogRoute)
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/braintree", paymentRoute);
app.use("/api/data", dataRoute);

// set up route
app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to Imane\'s Project',
    });
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log("Server is running on " , PORT)
});
