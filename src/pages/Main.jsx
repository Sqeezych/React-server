import Form from "../components/Form";
import TaskList from "../components/TaskList";

export default function Main () {
    return (
        <div className="container">
            <h1>Мой список дел</h1>
            <Form /> 
            <TaskList/>
        </div>
    )
}