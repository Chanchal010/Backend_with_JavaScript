// const asyncHandler = (func) => async (req,res,next) => {
//     try {
//         return await func(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: true,
//             message: err.message
//         })
//     }
// }


const asyncHandler = (requestHandler) => {
    return ( req , res , next ) => {
        Promise
        .resolve(requestHandler( req , res , next ))
        .catch((err) => next(err))
    }
}

export { asyncHandler }

