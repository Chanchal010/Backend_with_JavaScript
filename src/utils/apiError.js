class ApiError extends Error{
    constructor(
        statuscode,
        message = "Something went Wrong",
        errors = [],
        stack = ""
    ){
        this.statuscode = statuscode
        this.message = message
        this.errors = errors
        this.stack = stack
        this.data = data
        this.success = false;

        if (stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }