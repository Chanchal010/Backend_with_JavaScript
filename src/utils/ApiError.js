class ApiError extends Error{
    constructor(
        statuscode,
        message = "Something went Wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statuscode = statuscode
        this.message = message
        this.errors = errors
        this.data = null
        this.success = false;

        if (stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }


// class ApiError extends Error {
//     constructor(
//         statusCode,
//         message= "Something went wrong",
//         errors = [],
//         stack = ""
//     ){
//         super(message)
//         this.statusCode = statusCode
//         this.data = null
//         this.message = message
//         this.success = false;
//         this.errors = errors

//         if (stack) {
//             this.stack = stack
//         } else{
//             Error.captureStackTrace(this, this.constructor)
//         }

//     }
// }

// export { ApiError }