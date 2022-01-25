import FireBaseApp from "./config";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import Resizer from "react-image-file-resizer";
const storage = getStorage();
const metadata = {
    contentType: 'image/jpeg'
};
export const IMAGE_CATEGORIES = {
    PROFILE_BANNER: {
        path: 'images/users/',
        prefix: 'banner_',
        width: 500,
        height: 100
    },
    PROFILE_AVATAR: {
        path: 'images/users/',
        prefix: 'avatar_',
        width: 50,
        height: 50
    },
    GAME_COVER: {
        path: 'images/games/',
        prefix: 'cover_',
        width: 100,
        height: 100
    },
    COLLECTION_COVER: {
        path: 'images/collections/',
        prefix: 'cover_',
        width: 100,
        height: 100
    },
    QUESTION_IMAGE: {
        path: 'images/games/questions/',
        prefix: 'question_',
        width: 160,
        height: 100
    },
    COMMON: {
        path: 'images/other/',
        prefix: '',
        width: 100,
        height: 100
    }
}


class FirebaseHelper {
    static zipImage = (file, category = IMAGE_CATEGORIES.COMMON) => {
        console.log("Config:", category.width, category.height);
        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                file, 
                category.width, 
                category.height,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            )
        })
    }
    static uploadImage = async (file, category = IMAGE_CATEGORIES.COMMON) => {
        return new Promise(async (resolve, reject) => {
            // Validate inputs: 
            if (file == null || file === undefined) {
                resolve(null)
                return
            }
            if ((file instanceof File) === false) {
                console.log("File is not file type");
                // alway uploaded -> return link
                if (typeof file === 'string' || file instanceof String) {
                    console.log("File is string ");
                    resolve(file)
                    return
                }
                else {
                    resolve(null)
                    return
                }
            }


            const fullPath = category.path + category.prefix + Math.floor(Date.now() / 1000) + '.jpg';
                      
            console.log("Full path:", fullPath);
            console.log("File: ", file);
            const zipped = await this.zipImage(file, category);

            const storageRef = ref(storage, fullPath);
            const uploadTask = uploadBytesResumable(storageRef, zipped, metadata);
            
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
              (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default: 
                        break
                    
                }
              }, 
              (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
 
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    default: 
                        break
                }
                resolve(null)
              }, 
              async () => {
                // Upload completed successfully, now we can get the download URL
                let url = await getDownloadURL(uploadTask.snapshot.ref)
                resolve(url)
              }
            )
        })
    }
}

export default FirebaseHelper 