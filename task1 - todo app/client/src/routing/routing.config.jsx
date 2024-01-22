import {BrowserRouter, Route, Routes} from "react-router-dom"
import TodoCreate from "../page/app/todo-create.page"
import TodoList from "../page/app/todo-list.page"
import TodoUpdate from "../page/app/todo-update.page"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
export const Routing = ()=>{
    return (<>
    <ToastContainer/>
        <BrowserRouter>
            <Routes>
                <Route index element={<TodoList/>}/>
                <Route path="/create" element={<TodoCreate/>}/>
                <Route path="/:id" element={<TodoUpdate/>}/>
            </Routes>
        </BrowserRouter>
    </>)
}

