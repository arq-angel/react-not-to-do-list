import React from "react";

const EntryListItem = ({ item, index, switchTask, onChange, toDelete }) => {
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
          className="btn btn-success"
          onClick={() => {
            switchTask(item?._id, "bad");
          }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </td>
    </tr>
  );
};

export default EntryListItem;
