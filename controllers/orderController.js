const { json } = require("express")
const { placeOrderService, getUserOrderService } = require("../services/orderService")
exports.placeOrderController=async(req,res)=>{
    userId=req.user.userid
   const {products,totalPrice,totalItems,orderId}=req.body
    try{
        const result=await placeOrderService(userId,products,totalPrice,totalItems,orderId)
        if(result){
            res.json(result)
        }

    }catch(error){
        res.json({message: error.message})
    }

}

exports.getUserOrderController=async(req,res)=>{
    userId=req.user.userid
    const result=await getUserOrderService(userId)
    if(result){
        res.json(result)
    }

}