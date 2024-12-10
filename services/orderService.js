const Order=require('../model/Order')

exports.placeOrderService=async(userId,products,totalPrice,totalItems,orderId)=>{
    try{
        const newOrder=new Order({
            userId,
            products,
            totalPrice,
            totalItems,
            orderId
        })
        await newOrder.save()
        return newOrder
    }catch(error){
        throw new Error('Error while creating the order: ' + error.message);
    }

}
exports.getUserOrderService=async(userId)=>{
    try {
        const order=await Order.find({userId}).populate('products.productId')
        return order
    } catch (error) {
        console.log(error);
    }
}