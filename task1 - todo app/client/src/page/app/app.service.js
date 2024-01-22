import HttpService from "../../repository/http.service";

class AppService extends HttpService{
    taskLists = async(search="")=>{
        try{
            const data = await this.getRequest(
                '/?search='+search
            )
            return data;
        }
        catch(except){
            throw except;
        }
    }
    
    createTask = async(data)=>{
        try{
            const response = await this.postRequest(
                '/', 
                data
            )
            return response;
        }
        catch(except){
            throw except;
        }
    }

    deleteById = async(id)=>{
        try{
            const response = await this.deleteRequest(
                '/'+id
            )
            return response;
        }
        catch(except){
            throw except;
        }
    }

    deleteAll = async(id)=>{
        try{
            const response = await this.deleteRequest(
                '/'
            )
            return response;
        }
        catch(except){
            throw except;
        }
    }

    markComplete = async(id, data={})=>{
        try{
            const response = await this.putRequest(
                '/mark-completed/'+id,
                data
            )
            return response;
        }
        catch(except){
            throw except;
        }
    }
}

const appSvc = new AppService();
export default appSvc