class ApiResponce{
    constructor(
        statuscode,
        data,
        message = "Success"
    ){
        this.statuscode = statuscode
        this.data = data
        this.message = message
        this.success = this.success < 500
    }
}

export { ApiResponce }