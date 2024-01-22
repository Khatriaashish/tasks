import axiosInstance from "./axios.config";

class HttpService{
    postRequest = async(url, data={})=>{
        try{
            let response = await axiosInstance.post(url, data);
            return response;
        }
        catch(except){
            console.log("PostReq: ", except);
            throw except;
        }
    }

    getRequest = async(url, data={})=>{
        try{
            let response = await axiosInstance.get(url, data);
            return response;
        }
        catch(except){
            console.log("GetReq: ", except);
            throw except;
        }
    }

    deleteRequest = async(url)=>{
        try{
            let response = await axiosInstance.delete(url);
            return response;
        }
        catch(except){
            console.log("DeletetReq: ", except);
            throw except;
        }
    }

    putRequest = async(url, data={})=>{
        try{
            let response = await axiosInstance.put(url, data);
            return response;
        }
        catch(except){
            console.log("putReq: ", except);
            throw except;
        }
    }
}

export default HttpService;