import React from "react";
import EntryListItem from "./EntryListItem";
import BadListItem from "./BadListItem";

export const Table = ({ taskList, switchTask, handleOnDelete }) => {
  const entryList = taskList.filter((item) => item.type === "entry") || [];
  const badList = taskList.filter((item) => item.type === "bad") || [];

  return (
    <div className="row mt-5">
      <div className="col-md">
        <h3 className="text-center">Entry List</h3>
        <hr />

        {/* <!-- Entry list table --> */}
        <table className="table table-striped table-hover border">
          <tbody id="entryList">
            {entryList.map((item, index) => (
              <EntryListItem
                key={item.id}
                item={item}
                index={index}
                switchTask={switchTask}
                handleOnDelete={handleOnDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-md">
        <h3 className="text-center">Bad List</h3>
        <hr />

        {/* <!-- Bad list table --> */}
        <table className="table table-striped table-hover border">
          <tbody id="badList">
            {badList.map((item, index) => (
              <BadListItem
                key={item.id}
                item={item}
                index={index}
                switchTask={switchTask}
                handleOnDelete={handleOnDelete}
              />
            ))}
          </tbody>
        </table>

        <div className="alert alert-success">
          You could have saved ={" "}
          <span id="savedHrsElm">
            {badList.length > 0 ? badList.reduce((acc, i) => acc + i.hr, 0) : 0}
          </span>{" "}
          hrs
        </div>
      </div>
    </div>
  );
};
