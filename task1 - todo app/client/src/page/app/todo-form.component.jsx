import { Form, Col, Button } from "react-bootstrap"
import { ErrorMessage } from "../../component/Validation/validation-message.component"
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


const TodoForm = ({submitEvent, loading=false})=>{
    const todoSchema = Yup.object({
        task: Yup.string().required(),
        assignedTo: Yup.string(),
        priority: Yup.string().matches(/high|medium|low/).default("low")
    })
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(todoSchema)
    });

    const submitForm = (data)=>{
        submitEvent(data);
    }
    
    return (<>
        <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Task: </Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" placeholder="Enter task details..." size="sm" {...register("task", {required: true})}/>
                    <ErrorMessage message={errors?.task?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Assigned To: </Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" placeholder="Enter staff to which task is assigned" size="sm" {...register("assignedTo", {required: false})}/>
                    <ErrorMessage message={errors?.assignedTo?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Priority: </Form.Label>
                <Col sm={9}>
                    <Form.Select size="sm" {...register("priority")}>
                        <option value="">--SELECT ANY ONE--</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </Form.Select>
                    <ErrorMessage message={errors?.priority?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Col sm={{offset: 3, span: 9}}>
                    <Button type="submit" className="btn-sm btn-success me-3" disabled={loading}>Create</Button>
                </Col>
            </Form.Group>
            
        </Form>
    </>)
}

export default TodoForm