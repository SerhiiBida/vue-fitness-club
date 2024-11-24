import {computed} from "vue";

import env from "../../env.js";

export const useImage = () => {
    const getFullPathPicture = (imagePath) => {
        return env.serverStorage + imagePath;
    };

    return {
        getFullPathPicture
    }
}