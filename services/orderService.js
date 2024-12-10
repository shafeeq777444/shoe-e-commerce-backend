const Order=require('../model/Order')
const CustomError = require('../utils/customError')

exports.placeOrderService=async(userId,products,totalPrice,totalItems,orderId)=>{

        const newOrder=new Order({
            userId,
            products,
            totalPrice,
            totalItems,
            orderId
        })
        await newOrder.save()
        return newOrder
}
// Get User Orders Service
exports.getUserOrderService = async (userId) => {
        if (!userId) {
            throw new CustomError("User ID is required to fetch orders", 400);
        }
    
        const orders = await Order.find({ userId }).populate('products.productId');
    
        if (!orders || orders.length === 0) {
            throw new CustomError("No orders found for this user", 404);
        }
    
        return orders;
    };