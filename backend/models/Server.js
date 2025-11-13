const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());

// -------------------- DB CONNECT --------------------
mongoose.connect("mongodb://127.0.0.1:27017/amazonclone")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log("Mongo error:",err));


// -------------------- MODELS --------------------

const Product=mongoose.model("Product",{
  title:String,
  price:Number,
  rate:Number,
  img:String
});

const Seller=mongoose.model("Seller",{
  username:String,
  password:String
});

const Customer = mongoose.model("Customer", {
  name:String,
  email:String,
  phone:String,
  address:String,
  password:String
});

const Order = mongoose.model("Order",{
  customerId:String,
  items:Array,
  address:String,
  payment:String,
  status:String,     // Processing, Shipped, Out for Delivery, Delivered, Cancelled
  eta:String,        // “1 day”, “2 days”, “Today evening”
  date:String
});


// -------------------- SELLER ROUTES --------------------

app.post("/seller/register",async(req,res)=>{
  const {username,password}=req.body;
  await Seller.create({username,password});
  res.json({msg:"Seller registered"});
});

app.post("/seller/login",async(req,res)=>{
  const {username,password}=req.body;

  const seller=await Seller.findOne({username,password});
  if(!seller) return res.json({ok:false});

  res.json({ok:true});
});


// -------------------- PRODUCT ROUTES --------------------

app.post("/product/add",async(req,res)=>{
  const {title,price,rate,img}=req.body;
  await Product.create({title,price,rate,img});
  res.json({ok:true});
});

app.get("/products",async(req,res)=>{
  const products=await Product.find();
  res.json(products);
});

app.delete("/product/delete/:id", async (req,res)=>{
  try{
    await Product.findByIdAndDelete(req.params.id);
    res.json({ok:true});
  }catch(err){
    res.json({ok:false, error:err});
  }
});


// -------------------- CUSTOMER ROUTES --------------------

app.post("/customer/signup", async (req,res)=>{
  const {name,email,phone,address,password} = req.body;

  const exists = await Customer.findOne({email});
  if(exists) return res.json({ok:false, msg:"Email already registered"});

  await Customer.create({name,email,phone,address,password});
  res.json({ok:true});
});

app.post("/customer/login", async (req,res)=>{
  const {email,password} = req.body;

  const c = await Customer.findOne({email,password});
  if(!c) return res.json({ok:false});

  res.json({ok:true, customer:c});
});


// -------------------- ORDER ROUTES --------------------

app.get("/orders/:customerId", async (req,res)=>{
  const orders = await Order.find({customerId:req.params.customerId});
  res.json(orders);
});

app.post("/order/cancel", async(req,res)=>{
  const {id} = req.body;
  await Order.findByIdAndUpdate(id,{status:"Cancelled"});
  res.json({ok:true});
});

// ⭐ PLACE ORDER
app.post("/order/place", async(req,res)=>{
  try{
    await Order.create(req.body);
    res.json({ok:true});
  }catch(err){
    console.log(err);
    res.json({ok:false});
  }
});
// GET all orders for seller (all customers)
app.get("/seller/orders", async (req,res)=>{
  const orders = await Order.find();
  res.json(orders);
});

// UPDATE order status and delivery ETA
app.post("/seller/order/update", async (req,res)=>{
  const {id, status, eta} = req.body;

  await Order.findByIdAndUpdate(id,{
    status,
    eta
  });

  res.json({ok:true});


});

// get all orders for seller
app.get("/orders/all", async (req,res)=>{
  const all = await Order.find();
  res.json(all);
});

// update order status + ETA
app.post("/order/update", async (req,res)=>{
  const {id,status,eta} = req.body;
  await Order.findByIdAndUpdate(id,{status,eta});
  res.json({ok:true});
});




// -------------------- START SERVER --------------------

app.listen(4000,()=>console.log("Server running on port 4000"));
