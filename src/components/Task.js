import React, { useEffect, useState } from "react";

const Task = ({ task, todoList, provider, id, getAllTasks }) => {
  const [completed, setCompleted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(task.content);

  const handleChange = async () => {
    if (provider && provider.getSigner) {
      const signer = await provider.getSigner();
      if (todoList && todoList.connect) {
        let transaction = await todoList.connect(signer).toggleCompleted(id);
        await transaction.wait();
        setCompleted((prevCompleted) => !prevCompleted);
      }
    }
  };

  // const handleUpdate = async () => {
  //   if (todoList && provider) {
  //     const signer = provider.getSigner();
  //     await todoList.connect(signer).updateTask(id, updatedContent);
  //     setEditing(false);
  //     await getAllTasks(todoList);
  //   }
  // };
  
  // const handleDelete = async () => {
  //   if (todoList && provider) {
  //     const signer = provider.getSigner();
  //     await todoList.connect(signer).deleteTask(id);
  //     await getAllTasks(todoList);
  //   }
  // };


  useEffect(() => {
    setCompleted(task.completed);
  }, [task.completed]);

  return (
    <li className="task">
      {editing ? (
        <div>
          <input
            type="text"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          {/* <button onClick={handleUpdate}>Save</button> */}
        </div>
      ) : (
        <>
          <label htmlFor={id}>
            <input
              onChange={handleChange}
              type="checkbox"
              id={id}
              checked={completed}
            />
            <p className={completed ? "checked" : ""}>{task.content}</p>
          </label>
          <div className="settings">
            <i onClick={() => setMenuOpened(true)} className="uil uil-ellipsis-h"></i>
            <ul className={`task-menu ${menuOpened ? "show" : ""}`}>
              {/* not working */}
              {/* <li onClick={handleUpdate}>
                <i className="uil uil-pen"></i>Edit
              </li>
              <li onClick={handleDelete}>
                <i className="uil uil-trash"></i>Delete
              </li> */}
            </ul>
          </div>
        </>
      )}
    </li>
  );
};

export default Task;