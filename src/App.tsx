import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./components/model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [completedTodo, setCompletedTodo] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodoList([...todoList, { id: Date.now(), todo, doneTodo: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todoList,
      complete = completedTodo;

    if (source.droppableId === "TodoList") {
      add = active[source.index];

      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === "TodoList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodo(complete);
    setTodoList(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <span className="title">Task</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          completedTodo={completedTodo}
          setCompletedTodo={setCompletedTodo}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
