import { useState, useEffect } from "react";

let initialId = 0;
function ToDo() {
  const [name, setName] = useState("");

  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchTodo() {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const json = await res.json();
      setList(json);
    }
    fetchTodo();
  }, []);

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleAdd() {
    setList([
      { userId: 1, id: initialId++, title: name, completed: false },
      ...list
    ]);
    setName("");
  }

  function handleDelete(id) {
    const newArr = list.filter((item) => item.id !== id);
    setList(newArr);
  }

  function handleChecked(event, id) {
    console.log(document.getElementById(id));
    document.getElementById(id).style.backgroundColor = event.target.checked
      ? "#dedede"
      : "transparent";
  }
  return (
    <>
      <h2>TO DOs</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="name">Input</label>
        <input type="text" id="name" value={name} onChange={handleChange} />
        <button onClick={handleAdd}>Add</button>
      </form>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              onChange={(e) => handleChecked(e, item.id)}
            />
            <span id={item.id}>{item.title}</span>{" "}
            {new Date().toLocaleDateString()}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default ToDo;
