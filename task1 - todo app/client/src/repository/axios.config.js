import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 3000000,
    timeoutErrorMessage: "Server timed out",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

axiosInstance.interceptors.response.use(
    (response)=>{
        return response.data;
    },
    (error)=>{
        throw error.response.data;
    }
)

export default axiosInstance