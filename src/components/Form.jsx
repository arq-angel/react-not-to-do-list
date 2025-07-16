import React from "react";
import { useState } from "react";

const Form = ({ addTaskList }) => {
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "hr" ? +value : value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!form.task?.trim() || form.hr === undefined || form.hr <= 0) {
      alert("Please enter a task name and a positive number of hours");
      return;
    }

    addTaskList(form);
    setForm({});
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      action="javascript:void(0)"
      className="border p-5 rounded shadow mt-5"
    >
      <div className="row g-2">
        <div className="col-md-7">
          <input
            type="text"
            className="form-control"
            placeholder="task"
            aria-label="task"
            name="task"
            id="task"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="40"
            aria-label="hr"
            name="hr"
            min="1"
            id="hr"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="col-md-3 d-grid">
          <button className="btn btn-primary">Add New Task</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
