import axios from "axios";
import { useAuthStore } from "../stores";

const tesloApi = axios.create({
    baseURL: "http://localhost:3000/api",
});

//interceptores
tesloApi.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token; //forma de leer el store desde vanilla
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
)

export {
    tesloApi,
}
