import {ApiResponse} from "../utils/api-response.js"
import {ApiError} from "../utils/api-error.js"

const healthCheck = (req, res) => {
    try {
        res.status(200).json(new ApiResponse(200, null, "Server is healthy"))
    }
    catch(error){
        res.status(500).json(new ApiError(500, "Internal server error", [error.message]))
    }
}

export {healthCheck}