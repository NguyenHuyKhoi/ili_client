import { validateUrl } from "../validator"

export const createUrl = (data) => {
    //console.log("Create url with :",data)
    if (data == undefined || data == null) {
        return null
    }
    try {
        // If data is string: 
        if (typeof data === 'string' || data instanceof String) {
            // Check format is url:
            if (data != '' && validateUrl(data)) {
                return data
            }
            else {
                return null
            }
        }
        // Check if data is File:
        else if (data instanceof File) {
            const url = URL.createObjectURL(data)
            return url
        }
        else {
            return null
        }
    
    }
    catch (err){
        return null
    }
}