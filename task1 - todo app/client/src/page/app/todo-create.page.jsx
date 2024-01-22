import NavBarComponent from "../../component/NavBar/NavBar.component"
import { Container, Card } from "react-bootstrap"
import TodoForm from "./todo-form.component"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import appSvc from "./app.service"
import {toast} from "react-toastify";
const TodoCreate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async(data)=>{
        try{
            console.log(data)
            setLoading(true);
            let response = await appSvc.createTask(data);
            toast.success("Task Created Successfully");
            navigate("/")
        }
        catch(except){
            console.log(except);
            toast.error(except.message);
        }
        finally{
            setLoading(false);
        }
    }
    return (<>
        <NavBarComponent />
        <Container fluid className="px-4">
            <h1 className="mt-4">Create task</h1>
        </Container>
        <Card className="mb-4">
            <Card.Header>
                <h4 className="float-start">To-do Form</h4>
            </Card.Header>
            <Card.Body>
                <TodoForm submitEvent={submitHandler} loading={loading} />
            </Card.Body>

        </Card>
    </>)
}

export default TodoCreate