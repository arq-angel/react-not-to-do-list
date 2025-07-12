import React from "react";

const BadListItem = ({ item, index, switchTask, handleOnDelete }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.task}</td>
      <td>{item.hr} hrs</td>
      <td className="text-end">
        <button
          className="btn btn-warning"
          onClick={() => {
            switchTask(item.id, "entry");
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleOnDelete(item.id)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default BadListItem;
