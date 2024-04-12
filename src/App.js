/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Task from "./components/Task";

// ABIs
import TodoList from "./utils/TodoList.json";

// Config Adsress
import { address } from "./utils/config";



function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [todoList, setTodoList] = useState(null);
  const [taskCount, setTaskCount] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const connectMetamask = async () => {
    if(window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log(accounts[0]);
      setAccount(accounts[0]);
    }
  }

  const loadBlockchainData = async () => {
    // Load Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();

    // Load Contract
    const todoList = new ethers.Contract(
      address,
      TodoList,
      provider
    );
    setTodoList(todoList);
    await getAllTasks(todoList);
  };

  const getAllTasks = async (todoList) => {
    console.log(todoList);
    const taskCount = await todoList.taskCount();
    setTaskCount(taskCount);

    const tasks = [];
    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.tasks(i);
      tasks.push(task);
    }
    console.log(tasks);
    setTasks(tasks);
    setFilteredTasks(tasks);
  };

  const handleChange = (e) => {
    setNewTask(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask(newTask);
  };

  const addTask = async (t) => {
    if (todoList && provider) {
      const signer = provider.getSigner();
      await todoList.connect(signer).createTask(t);
      setNewTask("");
      await getAllTasks(todoList);
    }
  };

  const filterTasks = (e) => {
    const selectedFilter = e.currentTarget.id;
    console.log(`activeFilter: ${activeFilter}`);
    console.log(`selectedFilter: ${selectedFilter}`);
    if (selectedFilter !== activeFilter) {
      let filteredTasks = tasks;
      let completed = false;
      if (selectedFilter !== "all") {
        if (selectedFilter === "completed") {
          completed = true;
        }
        console.log(`completed: ${completed}`);
        filteredTasks = tasks.filter((task) => {
          return task.completed === completed;
        });
      }
      console.log(filteredTasks);
      setFilteredTasks(filteredTasks);
      setActiveFilter(selectedFilter);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      console.log("do validate");
      let inputTask = e.currentTarget.value;
      await addTask(inputTask);
    }
  };
  
  const clearCompleted = async () => {
    if (todoList && provider) {
      const signer = provider.getSigner();
      await todoList.connect(signer).clearCompletedTasks();
      await getAllTasks(todoList);
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <>
      <div className="wrapper"  style={{ maxHeight: "400px", overflowY: "auto" }}>
        <div className="task-input">
          <ion-icon name="create-outline"></ion-icon>
          <input
            id="newTask"
            type="text"
            className="form-control"
            placeholder="Type a task and Enter"
            value={newTask}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
          />
        </div>
        <div className="controls">
          <div className="filters">
            <span
              onClick={filterTasks}
              className={activeFilter === "all" ? "active" : ""}
              id="all"
            >
              All
            </span>
            <span
              onClick={filterTasks}
              className={activeFilter === "pending" ? "active" : ""}
              id="pending"
            >
              Pending
            </span>
            <span
              onClick={filterTasks}
              className={activeFilter === "completed" ? "active" : ""}
              id="completed"
            >
              Completed
            </span>
          </div>
          <button
            className="clear-btn active"
            hidden={activeFilter === "pending"}
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        </div>
        <ul className="task-box">
          {filteredTasks.map((task, index) => (
            <Task
              task={task}
              todoList={todoList}
              provider={provider}
              id={index + 1}
              key={index}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
