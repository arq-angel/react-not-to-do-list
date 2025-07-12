import React from "react";

const EntryListItem = ({ item, index, switchTask, handleOnDelete }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.task}</td>
      <td>{item.hr} hrs</td>
      <td className="text-end">
        <button
          className="btn btn-danger"
          onClick={() => handleOnDelete(item.id)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
        <button
          className="btn btn-success"
          onClick={() => {
            switchTask(item.id, "bad");
          }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </td>
    </tr>
  );
};

export default EntryListItem;
