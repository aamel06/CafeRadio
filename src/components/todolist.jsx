import { useState , useEffect, useContext, useRef} from 'react';
import DraggableContainer from './draggable_panel';
import { ToDoListContext } from '../App';

function Task({item, text}){
    const {todolistState, setToDoList} = useContext(ToDoListContext)
    const textRef = useRef(null)
    const [status, setStatus] = useState(false)
    return(
        <div id='task'>
        <tr style={{overflow:'auto'}}>
            <td style={{width:'10%', textAlign:'center'}}>
                <input type='checkbox' onChange={() => {
                    setStatus(!status)

                }}/>
            </td>
            <td
                style={{textDecoration: status ? 'line-through' : 'none',
                        opacity: status ? '50%' : '100%',
                        width: '80%'
                 }}
            >{text}</td>
            <td style={{width:'10%'}}>
                <button onClick={() => {
                    const updatedTasks = todolistState.filter(t => t !== item);
                    setToDoList(updatedTasks)
                }}>×</button>
            </td>
        </tr>
        </div>
    )
}

function ToDoList(){
    const {todolistState, setToDoList} = useContext(ToDoListContext);
    const textRef = useRef(null)

    return(
        <DraggableContainer idName='todolistpanel'>
            <h3>To Do List</h3>
            <table id='tasks' >
                <tbody >
                    {todolistState.map(([text], index) => (
                    <Task key={index} item={todolistState[index]} text={text}/>
                    ))}
                </tbody>
            </table>
            <div id='addtask'>
                <input id='adder' type='text' placeholder='Add Task...' required ref={textRef}/>
                <button  onClick={() => {
                    const updatedTasks = [...todolistState, [textRef.current?.value]];
                    setToDoList(updatedTasks);
                    textRef.current.value = ''
                }}>Add</button>
            </div>
        </DraggableContainer>
    )
}

export default ToDoList;