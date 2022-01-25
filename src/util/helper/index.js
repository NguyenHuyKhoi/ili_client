import { validateUrl } from "../validator"
import no_image from '../../asset/image/no_image_available.jpg'
export const createUrl = (data) => {
    //console.log("Create url with :",data)
    if (data == null) {
        return no_image
    }
    try {
        // If data is string: 
        if (typeof data === 'string' || data instanceof String) {
            // Check format is url:
            if (data !== '' && validateUrl(data)) {
                return data
            }
            else {
                return no_image
            }
        }
        // Check if data is File:
        else if (data instanceof File) {
            const url = URL.createObjectURL(data)
            return url
        }
        else {
            return no_image
        }
    
    }
    catch (err){
        return no_image
    }
}

export const printDate = (date) => {
    return  date.getDate() + "/"
                + (date.getMonth()+1)  + "/" 
                + date.getFullYear() + ", "  
                + date.getHours() + ":"  
                + date.getMinutes()
}