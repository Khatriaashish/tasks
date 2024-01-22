import { Badge, Button, Card, Container, Spinner, Form, Row, Col } from "react-bootstrap"
import NavBarComponent from "../../component/NavBar/NavBar.component"
import { NavLink } from "react-router-dom"
import { toast } from "react-toastify";
import appSvc from "./app.service";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const TodoList = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = async (search = "") => {
        try {
            setLoading(true);
            const response = await appSvc.taskLists(search);
            setData(response.result);
        }
        catch (except) {
            console.log(except);
            toast.error(except.message);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            let response = await appSvc.deleteById(id);
            toast.success("Task Deleted successfully");
            fetchData();
        }
        catch (except) {
            toast.error("Task cannot be deleted");
        }
        finally {
            setLoading(false);
        }
    }
    const handleReset = async () => {
        try {
            setLoading(true);
            let response = await appSvc.deleteAll();
            toast.success("Task Board Cleared");
            fetchData();
        }
        catch (except) {
            toast.error("Tasks couldn't be deleted");
        }
        finally {
            setLoading(false);
        }
    }

    const handleMarkComplete = async (id) => {
        try {
            setLoading(true);
            let response = await appSvc.markComplete(id);
            console.log(response);
            toast.success("Well done!!");
            fetchData();
        }
        catch (except) {
            toast.error("Task cannot be marked completed");
        }
        finally {
            setLoading(false);
        }
    }

    //for search
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleSearch = (data) => {
        console.log(data.search);
        fetchData(data.search);
    }
    return (<>
        <NavBarComponent />
        <Container fluid className="px-4">
            <h1 className="mt-4">To-do List</h1>
        </Container>
        <Card className="m-4">
            <Card.Header>
                <h4 className="float-start">Task Board</h4>
                <Button type="submit" className="btn-sm btn-danger float-end" onClick={(e) => {
                    e.preventDefault();
                    const confirmed = confirm("Warning!! This will delete all tasks. Are your sure you want to continue?");
                    if (confirmed)
                        handleReset();
                }}>Clear All</Button>
                <NavLink to="/create" className="btn btn-sm btn-success float-end me-3">Add todo task</NavLink>

            </Card.Header>
            <Card.Body className="text-center">
                {
                    loading ?
                        <Spinner variant='dark'></Spinner> : (data ? <>
                            <Form className="row mb-4" onSubmit={handleSubmit(handleSearch)}>
                                <Col sm={6}>
                                    <Form.Control type="text" className="me-2" size="sm" placeholder="Search..." {...register("search")} />
                                </Col>
                                <Col sm={4}>
                                    <Button type="submit" className="btn-sm btn-success float-start" disabled={loading}>Search</Button>
                                </Col>
                            </Form>
                            {
                                data.map((item, ind) => (
                                    <>
                                        <Row>
                                            <Col sm={12} md={{ offset: 4, span: 4 }}>
                                                <Card className="mb-3">
                                                    <Card.Header>
                                                        {
                                                            item.status === 'completed' ? <h5 className="float-start"><strike>{item.task}</strike></h5> : <h5 className="float-start">{item.task}</h5>
                                                        }

                                                        {/* <NavLink to="/create" className="btn btn-sm btn-warning float-end me-3">Edit</NavLink> */}
                                                        <Button type="submit" onClick={(e) => {
                                                            e.preventDefault();
                                                            const confirmed = confirm("Are you sure you want to delete?");
                                                            if (confirmed)
                                                                handleDelete(item._id);
                                                        }} className="btn-sm btn-danger float-end me-3">Delete</Button>
                                                    </Card.Header>
                                                    <Card.Body >

                                                        {
                                                            item.status === 'completed' ? "" : <Button type="submit" className="btn-sm btn-primary" onClick={(e) => {
                                                                e.preventDefault();
                                                                const confirmed = confirm("Are you sure task is completed?");
                                                                if (confirmed)
                                                                    handleMarkComplete(item._id);
                                                            }}>Mark Complete</Button>
                                                        }
                                                        <br />
                                                        Assigned To: {item.assignedTo}<br />
                                                        Priority: {item.priority}<br />
                                                        Status: <Badge bg={`${item.status === 'completed' ? 'success' : 'danger'}`}>{item.status}</Badge>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>


                                    </>
                                ))
                            }
                        </> : <div className="text-center">
                            <div colSpan={5}>Nothing to do</div><br />
                            <NavLink to="/create" className="btn btn-sm btn-success">Add new todo task</NavLink>
                        </div>)
                }

            </Card.Body>
        </Card>
    </>)
}

export default TodoList