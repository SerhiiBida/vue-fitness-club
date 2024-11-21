import {computed} from "vue";

import env from "../../env.js";

export const useImage = (imagePath) => {
    const getFullPathPicture = computed(() => {
        return env.serverStorage + imagePath;
    });

    return {
        getFullPathPicture
    }
}