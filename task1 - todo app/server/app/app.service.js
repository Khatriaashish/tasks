const TodoModel = require("./app.model");

class AppService{
    createTask = async(payload)=>{
        try{
            let todo = new TodoModel(payload);
            return await todo.save();
        }
        catch(except){
            console.log("appSvc.createTask: ", except);
            throw except
        }
    }
    readTasks = async(filter={})=>{
        try{
            let response = await TodoModel.find(filter).sort({sortKey: 1, _id: 'desc'});
            return response;
        }
        catch(except){
            console.log("appSvc.readTasks: ", except);
            throw except
        }
    }
    delete = async(id)=>{
        try{
            let response = await TodoModel.deleteMany();
            return response;
        }
        catch(except){
            console.log("appSvc.deleteAll: ", except);
            throw except
        }
    }
    getById = async(id)=>{
        try{
            let response = await TodoModel.findById(id);
            return response;
        }
        catch(except){
            console.log("appSvc.getById: ", except);
            throw except
        }
    }
    deleteById = async(id)=>{
        try{
            let response = await TodoModel.findByIdAndDelete(id);
            return response;
        }
        catch(except){
            console.log("appSvc.deleteById: ", except);
            throw except
        }
    }
    updateById = async(id, data)=>{
        try{
            
            let response = await TodoModel.findByIdAndUpdate(id, data);
            return response;
        }
        catch(except){
            console.log("appSvc.deleteById: ", except);
            throw except
        }
    }
}

const appSvc = new AppService();

module.exports = appSvc