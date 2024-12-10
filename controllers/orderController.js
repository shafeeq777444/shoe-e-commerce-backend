const { json } = require("express")
const { placeOrderService, getUserOrderService } = require("../services/orderService")
const asyncHandler =require('../utils/asyncHandler')
exports.placeOrderController=asyncHandler(async(req,res)=>{
    userId=req.user.userid
   const {products,totalPrice,totalItems,orderId}=req.body
        const result=await placeOrderService(userId,products,totalPrice,totalItems,orderId)
        if(result){
            res.json(result)
        }
})

exports.getUserOrderController=asyncHandler(async(req,res)=>{
    userId=req.user.userid
    const result=await getUserOrderService(userId)
    if(result){
        res.json(result)
    }

})