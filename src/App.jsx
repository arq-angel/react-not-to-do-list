import { useEffect, useRef, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { Table } from "./components/Table";
import {
  fetchAllTasks,
  postTask,
  updateTask,
  deleteTasks,
} from "./helpers/axiosHelper";

const hrPerWeek = 24 * 7;

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [response, setResponse] = useState({});
  const [toDelete, setToDelete] = useState([]);

  const shouldFetchRef = useRef(true);

  const entryList = taskList.filter((item) => item.type === "entry") || [];
  const badList = taskList.filter((item) => item.type === "bad") || [];

  const totalHrs = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);

  useEffect(() => {
    shouldFetchRef.current && getAllTasks();
    shouldFetchRef.current = false;
  }, []);

  const addTaskList = async (taskObj) => {
    if (totalHrs + taskObj.hr > hrPerWeek) {
      return alert(
        "Sorry Boss not enough time to fit this task from last week."
      );
    }

    // call api to send data to the database
    const response = await postTask(taskObj);
    setResponse(response);

    if (response?.status === "success") {
      // refetch all tasks
      getAllTasks();
    }
  };

  const switchTask = async (_id, type) => {
    const response = await updateTask({ _id, type });
    setResponse(response);

    if (response?.status === "success") {
      // refetch all tasks
      getAllTasks();
    }
  };

  const handleOnDelete = async (idsToDelete) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      // to do delete
      const response = await deleteTasks(idsToDelete);
      setResponse(response);

      if (response?.status === "success") {
        // refetch all tasks
        getAllTasks();

        // empty the toDelete[]
        setToDelete([]);
      }
    }
  };

  const getAllTasks = async () => {
    // call the axiosHelper to get data from the sever
    const data = await fetchAllTasks();

    // mount that data to our taskList state
    data?.status === "success" && setTaskList(data.tasks);
  };

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    let tempArg = [];
    if (value === "allEntry") {
      tempArg = entryList;
    }
    if (value === "allBad") {
      tempArg = badList;
    }

    if (checked) {
      if (value === "allEntry" || value === "allBad") {
        // get all _ids from entry list
        const _ids = tempArg.map((item) => item._id);
        const uniqueIds = [...new Set([...toDelete, ..._ids])];
        setToDelete(uniqueIds);
        return;
      }

      setToDelete([...toDelete, value]);
    } else {
      if (value === "allEntry" || value === "allBad") {
        const _ids = tempArg.map((item) => item._id);
        setToDelete(toDelete.filter((_id) => !_ids.includes(_id)));
        return;
      }

      setToDelete(toDelete.filter((_id) => _id !== value));
    }
  };

  return (
    <div className="wrapper py-5">
      {/* <!-- title --> */}
      <div className="container">
        <h1 className="text-center">Not To Do List</h1>

        {response?.message && (
          <div
            className={`alert ${
              response.status === "success" ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {response?.message}
          </div>
        )}

        {/* <!-- form --> */}
        <Form addTaskList={addTaskList} />

        {/* <!-- tables --> */}
        <Table
          entryList={entryList}
          badList={badList}
          switchTask={switchTask}
          handleOnSelect={handleOnSelect}
          handleOnDelete={handleOnDelete}
          toDelete={toDelete}
        />

        <div className="alert alert-success">
          The total hours allocated = <span id="ttlHrs">{totalHrs}</span> hrs
        </div>
      </div>
    </div>
  );
};

export default App;
