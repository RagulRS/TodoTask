import { useState } from "react";
import styles from "./mytodos.module.css";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [editIndex, setEditIndex] = useState(null);

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddTodo = () => {
    if (taskName.trim() !== "") {
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = {
          ...updatedTodos[editIndex],
          taskName,
          description,
        };
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([
          ...todos,
          { taskName, description, status: "not completed" },
        ]);
      }
      setTaskName("");
      setDescription("");
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    const todoToEdit = todos[index];
    setTaskName(todoToEdit.taskName);
    setDescription(todoToEdit.description);
    setEditIndex(index);
  };

  const handleUpdateStatus = (index, newStatus) => {
    const updatedTodos = [...todos];
    updatedTodos[index].status = newStatus;
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return todo.status === "completed";
    } else {
      return todo.status === "not completed";
    }
  });

  return (
    <div className={styles["container"]}>
      <h1>Todo - App</h1>
      <br></br>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={styles["form-group"]}
      >
        <div>
          <label>
          Name:
            <input
              type="text"
              value={taskName}
              onChange={handleTaskNameChange}
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
            />
          </label>
        </div>
        <button className={styles["addtodo"]} onClick={handleAddTodo}>
          {editIndex !== null ? "Update Todo" : "Add Todo"}
        </button>
      </form>
      <div className={styles["head"]}>
        <div>My Todos</div>
        <div>
          <label className={styles["filter"]}>
            Status Filter :    
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="not completed">Not Completed</option>
            </select>
          </label>
        </div>
      </div>

      <div>
        {filteredTodos.map((todo, index) => (
          <div key={index} className={styles["todo-card"]}>
            <div className={styles["content-card"]}>
              <p>
                <b>Name:</b> {todo.taskName}
              </p>
              <p>
                {" "}
                <b>Description:</b> {todo.description}
              </p>
              <div>
                <label>
                  <b>Status: </b>

                  <select
                    value={todo.status}
                    onChange={(e) => handleUpdateStatus(index, e.target.value)}
                  >
                    <option value="not completed">Not Completed</option>
                    <option value="completed">Completed</option>
                  </select>
                </label>
              </div>
              <br />
            </div>
            <div className={styles["btn"]}>
              <button style={{backgroundColor:"green"}} onClick={() => handleEditTodo(index)}>Edit</button>
              <button style={{backgroundColor:"red"}} onClick={() => handleDeleteTodo(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
