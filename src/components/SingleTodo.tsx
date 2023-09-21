import React from "react";
import { Todo } from "./model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./style.css";
import { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
interface Props {
  index: number;
  todo: Todo;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todoList, setTodoList, index }: Props) => {
  const [editCheck, setEditCheck] = useState<boolean>(false);
  const [editList, setEditList] = useState(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, todo: editList } : todo
      )
    );
    setEditCheck(false);
  };
  const handleDelete = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };
  const handleDone = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, doneTodo: !todo.doneTodo } : todo
      )
    );
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [editCheck]);
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todo_list ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {editCheck ? (
            <input
              ref={inputRef}
              value={editList}
              onChange={(e) => setEditList(e.target.value)}
              type="text"
              className="input_edit"
            />
          ) : todo.doneTodo ? (
            <s className="todo_text">{todo.todo}</s>
          ) : (
            <span className="todo_text">{todo.todo}</span>
          )}

          <div className="todo_icon_container">
            <span
              className="todo_icon edit"
              onClick={() => {
                if (!editCheck && !todo.doneTodo) {
                  setEditCheck(!editCheck);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span
              className="todo_icon delete"
              onClick={() => handleDelete(todo.id)}
            >
              <AiFillDelete />
            </span>
            <span
              className="todo_icon done"
              onClick={() => handleDone(todo.id)}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
