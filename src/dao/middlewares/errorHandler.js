import { EErrors } from "../../service/errors/Enums.service.js";


export const errorHandler = (error, req, res, next) =>{
    switch(error.code){
        case EErrors.AUTH_ERROR:
            res.status(401).json({status:"Error", error:error.cause})


        case EErrors.DATABASE_ERROR:
            res.status(500).json({status:"Error", error:error.message})


        case EErrors.INVALID_JSON:
            res.status(401).json({status:"Error", error:error.cause})


        case EErrors.INVALID_TYPES_ERROR:
            res.status(404).json({status:"Error", error:error.cause})


        case EErrors.CART_NOT_FOUND:
            res.status(404).json({status:"Error", error:error.message})


        case EErrors.PRODUCT_NOT_FOUND:
            res.status(404).json({status:"Error", error:error.message})


        case EErrors.ROUTING_ERROR:
            res.status(404).json({status:"Error", error:error.cause})


        case EErrors.INVALID_PARAM:
            res.status(404).json({status:"Error", error:error.message})


        default:
            res.status(500).json({status:"Error", error:error.message})
    }
}