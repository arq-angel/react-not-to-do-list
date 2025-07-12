import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { Table } from "./components/Table";

const hrPerWeek = 24 * 7;

const App = () => {
  const [taskList, setTaskList] = useState([]);

  const totalHrs = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);

  const addTaskList = (taskObj) => {
    const obj = {
      ...taskObj,
      id: randomIdGenerator(),
      type: "entry",
    };

    console.log(totalHrs);

    if (totalHrs + taskObj.hr > hrPerWeek) {
      return alert(
        "Sorry Boss! not enough time to fit this task from last week"
      );
    }

    setTaskList([...taskList, obj]);
  };

  const switchTask = (id, type) => {
    setTaskList(
      taskList.map((item) => {
        if (item.id === id) {
          item.type = type;
        }

        return item;
      })
    );
  };

  const handleOnDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      setTaskList(taskList.filter((item) => item.id !== id));
    }
  };

  const randomIdGenerator = (length = 6) => {
    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

    let id = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      id += str[randomIndex];
    }

    return id;
  };

  return (
    <div className="wrapper pt-5">
      {/* <!-- title --> */}
      <div className="container">
        <h1 className="text-center">Not To Do List</h1>

        {/* <!-- form --> */}
        <Form addTaskList={addTaskList} randomIdGenerator={randomIdGenerator} />

        {/* <!-- tables --> */}
        <Table
          taskList={taskList}
          switchTask={switchTask}
          handleOnDelete={handleOnDelete}
        />

        <div className="alert alert-success">
          The total hours allocated = <span id="ttlHrs">{totalHrs}</span> hrs
        </div>
      </div>
    </div>
  );
};

export default App;
