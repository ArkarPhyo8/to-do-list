import React from "react";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface typeProps {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodo: Todo[];
  setCompletedTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<typeProps> = ({
  todoList,
  setTodoList,
  completedTodo,
  setCompletedTodo,
}) => {
  return (
    <div className="todo_list_container">
      <Droppable droppableId={"TodoList"}>
        {(provided, snapshot) => (
          <div
            className={`todoActive ${
              snapshot.isDraggingOver ? "dragActive" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todoActiveText">Active Task</span>
            {todoList.map((todo, index) => (
              <SingleTodo
                key={index}
                index={index}
                todo={todo}
                todoList={todoList}
                setTodoList={setTodoList}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodoRemove">
        {(provided, snapshot) => (
          <div
            className={`todoComplete remove ${
              snapshot.isDraggingOver ? "dragRemove" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todoCompleteText">Completed Task</span>
            {completedTodo.map((todo, index) => (
              <SingleTodo
                key={index}
                index={index}
                todo={todo}
                todoList={completedTodo}
                setTodoList={setCompletedTodo}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
