import NavBarComponent from "../../component/NavBar/NavBar.component"
import { Container, Card } from "react-bootstrap"
import TodoForm from "./todo-form.component"
import { useState } from "react"
const TodoUpdate = () => {
    const [loading, setLoading] = useState(false);
    const submitHandler = ()=>{

    }
    return (<>
        <NavBarComponent />
        <Container fluid className="px-4">
            <h1 className="mt-4">Update task</h1>
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

export default TodoUpdate