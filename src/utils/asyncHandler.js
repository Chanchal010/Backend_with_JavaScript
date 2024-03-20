// let asyncHandler = () => {}
// let asyncHandler = (func) => async {() => {}}

const asyncHandler = (func) => async (req,res,next) => {
    try {
        await func(req, res, next)
    } catch (error) {
        res.status(error.code || 506).json({
            success: true,
            message: error.message
        })
        
    }
}

// im promise ---

// const asyncHandler = (requestHandler) => {
//     (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
//     }
// }






export {asyncHandler}


