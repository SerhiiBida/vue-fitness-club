import api from "@/api/axios.js";

export default async function training(to, from) {
    try {
        const trainingId = to.params.id;

        const response = await api.post("/trainings/check-access", {trainingId});

        const access = response.data["is_access"];

        if (!access) {
            return {
                name: "trainings"
            }
        } else {
            return true;
        }

    } catch (error) {
        if (error.response?.status === 401) {
            return {
                name: "login"
            };

        } else {
            return {
                name: "trainings"
            }
        }
    }
};