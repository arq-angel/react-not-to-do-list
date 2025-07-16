import React from "react";

const BadListItem = ({ item, index, switchTask, onChange, toDelete }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <input
          className="form-check-input"
          type="checkbox"
          value={item?._id}
          id="checkDefault"
          onChange={onChange}
          checked={toDelete.includes(item._id)}
        />{" "}
        {item?.task}
      </td>
      <td>{item?.hr} hrs</td>
      <td className="text-end">
        <button
          className="btn btn-warning"
          onClick={() => {
            switchTask(item?._id, "entry");
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </td>
    </tr>
  );
};

export default BadListItem;
