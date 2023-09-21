import React ,{useRef} from 'react'
import "./style.css"

interface Prop{
  todo:string,
  setTodo:React.Dispatch<React.SetStateAction<string>>
  handleAdd:(e: React.FormEvent)=>void,
}
const InputField:React.FC<Prop> = ({todo,setTodo,handleAdd}) => {
  const inputRef=useRef<HTMLInputElement>(null)
  return (
    <>
     <form className="input" onSubmit={(e)=>{
      handleAdd(e)
       inputRef.current?.blur();
    }}>
        <input ref={inputRef} value={todo} onChange={e => setTodo(e.target.value)} type="text" placeholder="Enter a task" className='input_box'/>
        <button className='btn_box'>Go</button>
      </form> 
    </>
  )
}

export default InputField
