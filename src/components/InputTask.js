import { Select, Input, Button, Header, Icon, Grid } from "semantic-ui-react"
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const options = [
    { key: "deporte", text:"Deporte", value:"deporte"},
    { key: "casa", text:"Casa", value:"casa"},
    { key: "trabajo", text:"Trabajo", value:"trabajo"},
    { key: "viajes", text:"viajes", value:"viajes"},
    { key: "otra", text:"Otra", value:"otra"},

]

export default function InputTask(props) {
    const [task, setTask] = useState({
        idTask: "",
        taskName: "",
        categoryTask: ""
    });
        
    const [error, setError] = useState(false);
    const {createTask} = props;

    const onChangeTask = (e) => {
        
        setTask({
            ...task,
             [e.target.name]: e.target.value
           })
    }

    const onChangeCategoryTask = (e, data) =>{
        setTask({
            ...task,
             [data.name]: data.value
           })
    }
    const onSumitTask =(e) => {
        e.preventDefault(); //que no recargue la pag
        if (task.taskName==="" || task.categoryTask==="") {
            setError(true);
            return;
        }

       setError(false);

       task.idTask = uuidv4();

       createTask(task);

       setTask({
        idTask: "",
        taskName: "",
        categoryTask: ""
       })
    }

    return(
        <>
         <Grid  centered columns={2}>
            <Input type="text" action >
              <>
              <Input size="small" icon="caret right" placeholder="Escribe tu tarea..." iconPosition="left" name="taskName" value={task.taskName}
              onChange={onChangeTask} />
              </>
              <>
              <Select compact options={options} className="select-form-task" name="categoryTask" placeholder="Categoria" value={task.categoryTask}
              onChange={onChangeCategoryTask} />
              </>
              <>
              <Button type="submit" onClick={onSumitTask} inverted color='blue'> Añadir Tarea </Button>
              </>
            </Input>
         </Grid>
         {error && (
             <Grid centered>
                <Header as="h4" color="red" className="alert-error-form">
                <Icon name="close"/>
                <Header.Content>Escribe tu tarea para añadirla</Header.Content>
                <Icon name="close"/>
                </Header>
             </Grid>
               )}
        </>
 )}