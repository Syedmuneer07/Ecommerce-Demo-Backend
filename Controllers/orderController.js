const Order = require("../models/Order");

exports.createOrder = async (req, res, next) => {
  try {
    let {products, totalAmount, paymentMethod, razorpayPaymentId} = req.body
    
    if(paymentMethod !== "Razorpay" && paymentMethod === "COD"){
      razorpayPaymentId = null // if payment method is cash on delivery, razorpay payment id will be null
    }

    const order = new Order({
      userId: req.user.id,
       products, 
       totalAmount,
        paymentMethod,
        razorpayPaymentId 
    });
        console.log("USER:", req.user);
        await order.save()
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("products.productId");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order found", order });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("products.productId");
    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrdersForAdmin  = async (req, res, next) => {
  try {
    
    const page=req.query.page ? parseInt(req.query.page) :1;

    const limit=req.query.limit ? parseInt(req.query.limit) : 5;

    if(!req.user.isAdmin){

    return res.status(403).json({ message: "You are not authorized to get all orders, only admin can get all orders" });
    }
    const skipValue = (page - 1) * limit;
    const orders = await Order.find().populate("products.productId").skip(skipValue).limit(limit).sort({createdAt:-1}); // sort by createdAt in descending order
    
    // Get total count for pagination
    const totalOrders = await Order.countDocuments();
    const totalPages = Math.ceil(totalOrders / limit);
    
    res.status(200).json({ 
      message: "Orders fetched successfully", 
      orders,
      totalPages,
      totalOrders,
      currentPage: page
    });
  } catch (err) {
    next(err);
  }
};
